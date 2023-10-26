import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
    @InjectModel(User.name) private userModel:Model<User>,
    private jwtService:JwtService,
    ){}

    async signIn(username:string, pass:string){
        const user = await this.userModel.findOne({username});
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };;
  }
}
