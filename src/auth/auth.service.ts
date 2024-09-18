import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  // Đăng nhập
  async signIn(signInDto: SignInDto) {
    let checkedEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: signInDto.email
      }
    })
    if (checkedEmail) {
      if (checkedEmail.mat_khau == signInDto.mat_khau) {
        let token = this.jwtService.sign({userId: checkedEmail.ma_nguoi_dung}, {algorithm: 'HS256', expiresIn: '1h', secret:'AIRBNB_BACKEND_SECRET_KEY'})
        return {
          status: HttpStatus.OK,
          message: 'Đăng nhập thành công',
          token,
          data: {
            email: checkedEmail.email,
            hoTen: checkedEmail.ten_nguoi_dung,
          }
        };
      }
      else {
        return new HttpException('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED)
      }
    }
    return new HttpException('Email không đúng', HttpStatus.UNAUTHORIZED)
  }

  // Đăng ký
  async signUp(signUpDto: SignUpDto) {
    // Check Email
    let checkedEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        da_xoa: false,
        email: signUpDto.email
      }
    })

    if (checkedEmail) {
      return new HttpException('Email đã tồn tại', HttpStatus.CONFLICT)
    }

    // Create User
    let createUser = await this.prisma.nguoiDung.create({
      data: {
        ...signUpDto,
        vai_tro: 'user',
        da_xoa: false
      }
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Đăng ký thành công',
      data: createUser,
    };
  }
}
