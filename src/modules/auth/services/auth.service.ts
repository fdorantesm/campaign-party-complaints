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
import { LeanDocument } from 'mongoose';
import { AccountService } from '../../account/services/account.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}
  public async login(data: LoginDto): Promise<JwtPayload> {
    const user = await this.userService.findOne(
      { email: data.email },
      {
        password: 1,
      },
    );
    if (user) {
      const match = await this.hashService.match(data.password, user.password);
      if (match) {
        const payload: TokenPayloadType = {
          id: user.id,
          account: user.account,
        };
        const accessToken = await this.createToken(payload);
        Logger.log(`${user.id} logged in`, 'AuthService');
        return accessToken;
      }
    }

    throw new UnauthorizedException('INVALID_CREDENTIALS');
  }

  public async register(data: RegisterDto): Promise<LeanDocument<UserEntity>> {
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
      const user = await this.userService.create({
        account: publicAccount._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        password: data.password,
        enabled: true,
      });
      return user.toJSON();
    }
    throw new ConflictException('EMAIL_ALREADY_REGISTERED');
  }

  public async me(request: any): Promise<LeanDocument<UserEntity>> {
    const user = await this.userService.findOne({ _id: request.user.id });
    return user.toJSON();
  }

  private async createToken(payload: TokenPayloadType): Promise<JwtPayload> {
    const accessToken = await this.jwtService.sign(payload);
    const signed = await this.jwtService.verify(accessToken);
    return {
      accessToken,
      expiresAt: signed.exp,
    };
  }
}
