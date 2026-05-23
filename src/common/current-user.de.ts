import { createParamDecorator,ExecutionContext } from "@nestjs/common";
//createParamDecorator 创建自定义参数装饰器的工具 
//ExecutionContext 提供当前请求的上下文信息，可以获取对象
/*export const CurrentUser=createParamDecorator(
    (data:any,ctx:ExecutionContext)=>{
        const request=ctx.switchToHttp().getRequest();
        const user=request.user;
        return user;
    }
)*/
export const CurrentUser=createParamDecorator(
    (data:any,ctx:ExecutionContext)=>{
        const req=ctx.switchToHttp().getRequest();
        const user=req.user;
        return user;
    }
)