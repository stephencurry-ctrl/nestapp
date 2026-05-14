import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
  /*getUserById(id:string)
  {
    return this.users.find(item=>item.id===Number(id));
  }
  getListQuery(page:number,pageSize:number)
  {
   const start=(page-1)*pageSize; 
   const end=start+pageSize;
   return this.users.slice(start,end);
  }
  createUser(body:any)
  {
    const newUser={
      id:this.users.length+1,
      ...body
    }
    this.users.push(newUser);
    return newUser;
  }*/
}
