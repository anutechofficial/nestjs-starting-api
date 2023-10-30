import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, Max, } from "class-validator";
import { IsUsername } from "./username.decorator";
import { IsPassword } from "./password.decorator";

export class CreateUserDto {
    @ApiProperty()
    @Length(8,50)
    @IsNotEmpty()
    name:string;

    @IsUsername({ message: 'Invalid username format'})
    @Length(5,25)
    @ApiProperty()
    username:string;

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @Length(8,50)
    @IsPassword({message:'Create Strong Password use Special characters'})
    @ApiProperty()
    password:string;
}
