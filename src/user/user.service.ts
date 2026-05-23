import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {CreateAdminDto} from './createAdmin';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)//注入User实体的Repository对象
        private userRepository:Repository<User>,//注入User实体的Repository对象 userRepository是一个Repository<User>类型的对象，可以用来操作User实体对应的数据库表
    ) {}
    async getUserById(id: string) {
        //const user = await this.userRepository.findOne({ where: { id: Number(id) } });
        const user=await this.userRepository.findOne({where : {id:Number(id)}});
        if (!user) throw new NotFoundException('用户不存在');
        return user;
    }

    async getUserList() {
        return await this.userRepository.find();
    }


    async getListQuery(page: number, size: number) {
       /* const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * size,
            take: size,
        });*/
        const [users,total]=await this.userRepository.findAndCount({
            skip:(page-1)*size,
            take:size,
        })
        return { users, total };
    }

    async createUser(body: { name: string ,password:string,email:string}) {
        const hashPassword=await bcrypt.hash(body.password,10);
        const newUser={
            name:body.name,
            password:hashPassword,
            role:'user',
            email:body.email,
        }
        return await this.userRepository.save(newUser);

    }
    async updateUser(id:string,body:{name:string})
    {
        const user=await this.getUserById(id);
        if(!user)throw new NotFoundException('用户不存在');
        user.name=body.name;
        return await this.userRepository.save(user);
    }
    async deleteUser(id:string)
    {
        const user=await this.getUserById(id);
        if(!user)throw new NotFoundException('用户不存在');
        return await this.userRepository.remove(user);
    }
async createAdmin(dto:CreateAdminDto)
{
    const user=new User();
    user.name=dto.name;
    user.password=await bcrypt.hash(dto.password,10);
    user.email=dto.email;
    user.role='admin';
    return await this.userRepository.save(user);
}
