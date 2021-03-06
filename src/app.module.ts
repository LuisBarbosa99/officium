import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CategoryModule } from './category/category.module';
import { ServiceModule } from './service/service.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    AuthModule, 
    CategoryModule, 
    ServiceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
