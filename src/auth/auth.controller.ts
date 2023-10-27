import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { loggedInUser } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
constructor(private authService:AuthService,
    private userService:UsersService,
    ){}

@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'User Login' })
@Post('login')
SignIn(@Body() signInDto: signInDto){
    return this.authService.signIn(signInDto.username, signInDto.password);
}

@ApiOperation({ summary: 'Logged in User' })
@ApiBearerAuth()
@UseGuards(AuthGuard)
  @Get('profile')
   async getProfile(@Request() req) {
    const user= await this.userService.findOne(loggedInUser.username);
    return user;
  }
}