import { Controller, Post, Body, UseGuards, Patch, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/update-pwd.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('doi-mat-khau')
  updatePassword(
    @Req() req: Request,
    @Body() updatePassword: UpdatePasswordDto) {
    let token = req.headers['authorization'].split(' ')[1]
    let decodeToken = this.jwtService.decode(token)
    let id = decodeToken.userId
    return this.authService.updatePassword(+id, updatePassword);
  }

}
