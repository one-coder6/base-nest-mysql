import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  // 就是回传TypeOrmOptions对象
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const target = [
      'mongo.host',
      'mongo.db',
      'mongo.username',
      'mongo.password',
    ];
    const [host, dbName, username, password] = this.configService.gets(target);
    const db: TypeOrmModuleOptions = {
      type: 'mysql',
      host: global.isDev ? 'localhost' : host,
      username: global.isDev ? 'root' : username,
      password: global.isDev ? '123456' : password,
      database: global.isDev ? 'nest' : dbName,
      logging: ['error'],
      // synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
    console.log('db config...', db);
    return db;
  }
}
