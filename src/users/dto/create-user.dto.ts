import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name:string;

    @ApiProperty()
    username:string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
}
