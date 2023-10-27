import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { loggedInUser } from './auth.guard';

@Controller('auth')
export class AuthController {
constructor(private authService:AuthService,
    private userService:UsersService,
    ){}

@HttpCode(HttpStatus.OK)
@Post('login')
SignIn(@Body() signInDto: signInDto){
    return this.authService.signIn(signInDto.username, signInDto.password);
}


@ApiBearerAuth()
@UseGuards(AuthGuard)
  @Get('profile')
   async getProfile(@Request() req) {
    const user= await this.userService.findOne(loggedInUser.username);
    return user;
  }
}