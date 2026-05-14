import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService{
    constructor(
    
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private jwtService:JwtService,
    ){}
    //在登录函数中起作用
    async validateUser(name:string,password:string)
    {
        const user=await this.userRepository.findOne({where:{name}});
        if(!user)throw new  UnauthorizedException('用户不存在');
        const isPasswordValid=await bcrypt.compare(password,user.password);//使用bcrypt库的compare方法比较输入的密码和数据库中存储的哈希密码
        if(!isPasswordValid)throw new UnauthorizedException('密码错误');
        const token=this.jwtService.sign({id:user.id,name:user.name});//生成JWT令牌，包含用户的id和name作为载荷
        return {token};
    }
}
