import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context:ExecutionContext):boolean
    {
        //const request=context.switchToHttp().getRequest();//获取当前的http请求
        const request=context.switchToHttp().getRequest();
        
        const token = request.headers.authorization?.split(' ')[1];
        if(!token)throw new UnauthorizedException('没有提供token');
        try{
            const payload=this.jwtService.verify(token);//验证token的有效性，如果无效会抛出异常
            request.user=payload;//将解析后的用户信息存储在请求对象的user属性中，以便后续的处理程序使用
            return true;
        }catch(e)
        {
            throw new UnauthorizedException('无效的token或者token过期');
        }
    }
}