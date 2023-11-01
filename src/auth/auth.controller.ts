import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { loggedInUser } from './auth.guard';
import { StripeService } from 'src/stripe/stripe.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
constructor(private authService:AuthService,
    private userService:UsersService,
    private stripeService:StripeService,
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
   async getProfile() {
    const user= await this.userService.findLoggedInProfile(loggedInUser.username);
    return user;
  }

  @ApiOperation({summary:'Verify email'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('verifyEmail')
  verifyEmail(){
    const isVerified = this.userService.verifyUnverifiedEmail();
    return isVerified;
  }
  
}