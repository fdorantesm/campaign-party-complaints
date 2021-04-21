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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
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
        const payload = {
          id: user.id,
        };
        const accessToken = await this.createToken(payload);
        Logger.log(user.id, 'User logged');
        return accessToken;
      }
    }

    throw new UnauthorizedException('INVALID_CREDENTIALS');
  }

  public async register(data: RegisterDto): Promise<LeanDocument<UserEntity>> {
    const exists = await this.userService.findOne({ email: data.email });
    if (!exists) {
      const user = await this.userService.create({
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
    console.log(request.user);
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
