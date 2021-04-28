import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from '../../user/services/user.service';
import { HashService } from 'src/modules/common/services/hash.service';
import { TokenPayloadType } from '../types/token-payload.type';
import { JwtPayload } from '../types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { LeanDocument, Types } from 'mongoose';
import { AccountService } from '../../account/services/account.service';
import { AccountBootstrapDto } from 'src/modules/account/dtos/account-start.dto';
import { AdminType } from 'src/modules/account/types/admin.type';
import { RoleService } from 'src/modules/user/services/role.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly roleService: RoleService,
    private readonly tokenService: TokenService,
  ) {}
  public async login(data: LoginDto): Promise<JwtPayload> {
    const user = await this.userService.findOne(
      { email: data.email },
      {
        password: 1,
        role: 1,
        account: 1,
      },
    );

    if (user) {
      const match = await this.hashService.match(data.password, user.password);
      if (match) {
        const token = await this.tokenService.find({
          type: 'login',
          user: user._id,
        });
        if (token) {
          Logger.log(`${user.id} loggin attemp`, 'AuthService');
          throw new UnauthorizedException('Ya existe una sesión activa');
        }
        const payload: TokenPayloadType = {
          id: user.id,
          account: user.account,
          role: user.role,
        };
        const session = await this.createToken(payload);
        Logger.log(`${user.id} logged in`, 'AuthService');
        await this.tokenService.create({
          type: 'login',
          user: user._id,
          token: session.accessToken,
        });
        return session;
      }
    }

    throw new UnauthorizedException('Datos no válidos');
  }

  public async register(data: RegisterDto): Promise<LeanDocument<UserEntity>> {
    const usersCount = await this.userService.count();
    if (usersCount === 0) {
      const admin = await this.init({
        account: 'Root',
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      return admin.user;
    }
    const exists = await this.userService.findOne({ email: data.email });
    if (!exists) {
      const publicAccount = await this.accountService.findOne(
        {
          public: true,
          name: 'Public',
        },
        {
          _id: 1,
        },
      );
      const userRole = await this.roleService.findOne({ code: 'USER' });
      const user = await this.userService.create({
        account: publicAccount._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        password: data.password,
        enabled: true,
        role: userRole._id,
      });
      return user.toJSON();
    }
    throw new ConflictException('El correo ya está registrado');
  }

  public async me(user: Types.ObjectId): Promise<UserEntity> {
    return this.userService.getUserData(user);
  }

  public async logout(user: TokenPayloadType, token: string): Promise<void> {
    try {
      await this.tokenService.create({
        token,
        user: user.id,
        type: 'logout',
      });
    } catch {}
  }

  private async createToken(payload: TokenPayloadType): Promise<JwtPayload> {
    const accessToken = await this.jwtService.sign(payload);
    const signed = await this.jwtService.verify(accessToken);
    return {
      accessToken,
      expiresAt: signed.exp,
    };
  }

  private async init(root: AccountBootstrapDto): Promise<AdminType> {
    await this.accountService.seed({
      name: 'Public',
      public: true,
    });
    return this.accountService.init(root);
  }
}
