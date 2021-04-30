import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfigLoader } from '../config/loaders';
import { JwtConfigType } from '../config/types/jwt.config.type';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { ApikeyStrategy } from './strategies/apikey.strategy';
import { AuthController } from './controllers/auth.controller';
import { AccountModule } from '../account/account.module';
import { TokenService } from './services/token.service';
import { TokenRepository } from './repositories/token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenEntity, TokenSchema } from './entities/token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: TokenSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<JwtConfigType>('jwt');
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expires,
          },
        };
      },
    }),
    UserModule,
    CommonModule,
    AccountModule,
  ],
  providers: [
    PassportModule,
    JwtStrategy,
    ApikeyStrategy,
    AuthService,
    TokenService,
    TokenRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
