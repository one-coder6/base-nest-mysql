import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonMiddleware } from './middlewares/common.middleware';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.service';

const options = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useClass: TypeOrmConfigService,
};
@Module({
  imports: [TypeOrmModule.forRootAsync(options), UserModule],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CommonMiddleware).forRoutes('/');
  }
}
