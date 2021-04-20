import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfigLoader } from '../config/loaders';
import { JwtConfigType } from '../config/types/jwt.config.type';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
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
  ],
  providers: [PassportModule, JwtStrategy],
  controllers: [],
  exports: [],
})
export class AuthModule {}
