import { join } from 'path';
import { CasbinModule } from '@app/casbin';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { s3ConfigLoader } from '../config/loaders';
import { MongodbConfigType } from '../config/types/mongodb-config.type';
import { CasbinController } from './controllers/casbin.controller';
import { MongoAdapter } from 'casbin-mongodb-adapter';

@Module({
  imports: [
    CasbinModule.registerAsync({
      imports: [ConfigModule.forFeature(s3ConfigLoader)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<MongodbConfigType>('mongodb.main');
        let uri: string;

        if (config.port) {
          uri = `mongodb://${config.server}:${config.port}`;
        } else {
          uri = `mongodb+srv://${config.server}`;
        }

        const adapter = await MongoAdapter.newAdapter({
          uri,
          collection: 'rules',
          database: config.database,
          option: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auth: {
              user: config.user,
              password: config.password,
            },
          },
        });

        return {
          adapter,
          model: join(process.env.PWD, 'casbin.conf'),
        };
      },
    }),
  ],
  controllers: [CasbinController],
})
export class AclModule {}
