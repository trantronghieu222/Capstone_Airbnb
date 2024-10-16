import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { UpdatePasswordDto } from './dto/update-pwd.dto';


@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  // Decode token
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  // Create token
  createToken(userId: number, role: string): string {
    const payload = { userId, role };
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      expiresIn: '1h',
      secret: 'AIRBNB_BACKEND_SECRET_KEY',
    });
  }

  // Refesh token
  createTokenRef(userId: number, role: string): string {
    const payload = { userId, role };
    return this.jwtService.sign(payload, {
      algorithm: 'HS256',
      expiresIn: '7d',
      secret: 'AIRBNB_BACKEND_REFRESH',
    });
  }

  // Đăng nhập
  async signIn(signInDto: SignInDto) {
    let checkedEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: signInDto.email
      }
    })
    if (checkedEmail) {
      // Giải mã pwd
      if (bcrypt.compareSync(signInDto.mat_khau, checkedEmail.mat_khau)) {
        let token = this.createToken(checkedEmail.ma_nguoi_dung, checkedEmail.vai_tro)

        return {
          status: HttpStatus.OK,
          message: 'Đăng nhập thành công',
          token,
          content: {
            id: checkedEmail.ma_nguoi_dung,
            email: checkedEmail.email,
            hoTen: checkedEmail.ten_nguoi_dung,
            gioiTinh: checkedEmail.gioi_tinh,
            ngaySinh: checkedEmail.ngay_sinh,
            vaiTro: checkedEmail.vai_tro,
            anhDaiDien: checkedEmail.avatar
          }
        };
      }
      else {
        throw new HttpException('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED)
      }
    }
    throw new HttpException('Email không đúng', HttpStatus.UNAUTHORIZED)
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
        // Mã hoá pwd
        mat_khau: await bcrypt.hash(signUpDto.mat_khau, 10),
        vai_tro: 'user',
        da_xoa: false
      }
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Đăng ký thành công',
      content: createUser,
    };
  }

  // Đổi mật khẩu
  async updatePassword(id: number, updatePassword: UpdatePasswordDto) {
    let currentPwd = await this.prisma.nguoiDung.findUnique({
      where: {
        ma_nguoi_dung: id
      }
    })

    if(!bcrypt.compareSync(updatePassword.mat_khau_hien_tai, currentPwd.mat_khau)) {
      throw new HttpException('Mật khẩu hiện tại không chính xác', HttpStatus.BAD_REQUEST)
    }

    let data= await this.prisma.nguoiDung.update({
      where: {
        ma_nguoi_dung: id
      },
      data: {
        mat_khau: await bcrypt.hash(updatePassword.mat_khau, 10)
      }
    })
    return data
  }
}
