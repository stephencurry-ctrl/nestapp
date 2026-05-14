import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wjj20050918',
      database: 'my_express_db',
      autoLoadEntities: true, // 自动加载所有实体类，不用手动写路径
      synchronize: true,
    }),
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key', // 换成你自己的密钥
      signOptions: { expiresIn: '1h' }, // Token有效期
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}