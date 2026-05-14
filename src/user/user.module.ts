import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import {JwtModule} from '@nestjs/jwt'
import {AuthService} from 'src/auth/auth.service'
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: 'your-secret-key' })],
  controllers: [UserController],
  providers: [UserService
    ,AuthService
  ],
  
  exports: [UserService],
})
export class UserModule {}