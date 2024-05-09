import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users/users.service';
import { comparePassword } from 'src/utils/hash-password.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getUser(username);
    if (!user?.password || !(await comparePassword(pass, user?.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
