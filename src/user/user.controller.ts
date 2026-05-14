import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {Get ,Param, Post ,Query,Body,Delete,Put}from '@nestjs/common';
import {createUserDto} from './createUserdto';
import { JwtAuthGuard } from 'src/auth/jwt.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('/user')
export class UserController {
    constructor(private readonly userService:UserService
      ,private readonly AuthService:AuthService
    ){}
   
    @Post('login')
    
    async login(@Body() body: { name: string; password: string }) {
  //return await this.AuthService.validateUser(body.name, body.password);
  return await this.AuthService.validateUser(body.name,body.password);

}

    @UseGuards(JwtAuthGuard) //使用JwtAuthGuard保护路由，只有通过验证的用户才能访问这些路由
    @Get('/list')
  async  getUserList()
    {
        return await this.userService.getUserList();
    }
    @Get('/list/query')
  async  getListQuery(@Query('page') page:number,@Query('size') size:number)
    {
        return await this.userService.getListQuery(page,size);
    }
    @Post('/create')
  async  createUser(@Body() body)
    {
        return await this.userService.createUser(body);
    }
     @Get(':id')//通配符应该写在后
  async  getUserById(@Param('id') id:string)
    {
        return await this.userService.getUserById(id);
    }
    
    @Delete(':id')
  async  deleteUser(@Param('id') id:string)
    {
        return await this.userService.deleteUser(id);
    }   
    @Put(':id')
  async  updateUser(@Param('id') id:string,@Body() body:{name:string,password:string})
    {
        return await this.userService.updateUser(id,body);
    }
    

}
