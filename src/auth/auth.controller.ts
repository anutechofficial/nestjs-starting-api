import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
constructor(private authService:AuthService){}

@HttpCode(HttpStatus.OK)
@Post('login')
SignIn(@Body() signInDto: signInDto){
    return this.authService.signIn(signInDto.username, signInDto.password);
}


@UseGuards(AuthGuard)
@Get('profile')
 getProfile(@Request() req){

    return req.user;
 }
}
// function Get(arg0: string): (target: AuthController, propertyKey: "getProfile", descriptor: TypedPropertyDescriptor<() => void>) => void | TypedPropertyDescriptor<() => void> {
//     throw new Error('Function not implemented.');
// }

