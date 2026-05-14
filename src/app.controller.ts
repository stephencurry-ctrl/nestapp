import {Post, Controller, Get ,Param ,Query,Body } from '@nestjs/common';
import { AppService } from './app.service';
@Controller('/api')
//所有接口开头都要加上/api
export class AppController {
  constructor(private readonly appService: AppService) {}//构造函数
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /*@Get('/user')
  getUsers(){
    return {
      code:200,
      data:{name:'张三'},
    }
  }
  @Get('/list')
  getList(){
    return {
      code:200,
      data:{
        name:'kevin',
        age:18
      }
    }
  }
  @Get('/user/:id')
  getUserById(@Param('id') id:string)
  {
    return this.appService.getUserById(id);
  }
  @Get('/list/query')
  getListQuery(@Query('page') page:number,@Query('pageSize') pageSize:number)
  {
    return this.appService.getListQuery(page,pageSize);
  }
  @Post('/createUser')
  createUser(@Body() body:any)
  {
    return this.appService.createUser(body);
  }*/
  
}
