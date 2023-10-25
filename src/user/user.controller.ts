import { Controller, Post,Get, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user-dto/create-user.dto";

@Controller('user')
export class UserController{
    constructor(private userService:UserService){}

    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
      }
}