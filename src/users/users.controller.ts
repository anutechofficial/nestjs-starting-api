import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { OtpDto } from './dto/otp-verification.dto';
import { ChangePwdDto } from './dto/change-pwd.dto';
import { NewPwdDto } from './dto/newPwd.dto';
import { loggedInUser } from 'src/auth/auth.guard';
import { StripeService } from 'src/stripe/stripe.service';
import { BuyProductDto } from './dto/buy-product.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private stripeService:StripeService,
    ) {}
  
  @ApiOperation({summary: 'SignUp User'})
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary:'Verify Email OTP'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('verify')
  getOPT(@Body() otpDto:OtpDto){
    return this.usersService.verifyOtp(otpDto.otp);
  }

  @ApiOperation({summary: 'Forget Password!'})
  @Post('forgotPassword')
  changePassword(@Body() changePwdDto:ChangePwdDto){
    return this.usersService.changePwd(changePwdDto.username);
  }

  @ApiOperation({summary:'Enter New Password!'})
  @ApiBearerAuth()
  @Post('newPassword')
  @UseGuards(AuthGuard)
  nterNewPwd(@Body() newPwsDto:NewPwdDto){
    return this.usersService.enterNewPwd(newPwsDto.otp,newPwsDto.password);
  }
  
  @ApiOperation({summary: 'Get All User from DB'})
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Get UserById'})
  // @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({summary: 'Update UserById'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  
  @ApiOperation({summary: 'Delete UserById'})
  // @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiOperation({summary: 'createStripeAccount'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('createStripeAccount')
  createAccount() {
    return this.stripeService.createAccount(loggedInUser.email);
  }

  @ApiOperation({summary:'buyProduct'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('buyProduct')
  buyProduct(@Body() buyProductDto:BuyProductDto){
    return this.usersService.byProduct(buyProductDto.productId,buyProductDto.quantity);
  }
}
