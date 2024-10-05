import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService
  ) { }

  private showUser = {
    ma_nguoi_dung: true,
    ten_nguoi_dung: true,
    email: true,
    mat_khau: false,
    so_dt: true,
    ngay_sinh: true,
    gioi_tinh: true,
    vai_tro: true,
    avatar: true,
    da_xoa: false
  };

  // Thêm Người Dùng
  async createUser(userDto: UserDto) {
    // Check ngày sinh    

    // Create User
    let data = await this.prisma.nguoiDung.create({
      data: {
        ...userDto,
        mat_khau: await bcrypt.hash(userDto.mat_khau, 10),
        da_xoa: false
      }
    })
    return data;
  }

  // Get Danh Sách Người Dùng
  async getAllUser() {
    let data = await this.prisma.nguoiDung.findMany({
      select: this.showUser,
      where: {
        da_xoa: false
      }
    })
    return data
  }

  // Get Người Dùng Theo Id
  async getUserById(id: number) {
    let data = await this.prisma.nguoiDung.findUnique({
      select: this.showUser,
      where: {
        da_xoa: false,
        ma_nguoi_dung: id
      }
    })
    return data
  }

  // Tìm Kiếm Người Dùng Theo Tên
  async getUserByName(TenNguoiDung: string) {
    let data = await this.prisma.nguoiDung.findMany({
      select: this.showUser,
      where: {
        da_xoa: false,
        ten_nguoi_dung: {
          contains: TenNguoiDung,
          // mode: 'insensitive'
        }
      }
    })
    return data
  }

  // Phân Trang Tìm Kiếm
  async pagingSearchUser(pageIndex: number, pageSize: number, keyWord: string) {
    const intPageIndex = pageIndex ? parseInt(pageIndex.toString(), 10) : undefined;
    const intPageSize = pageSize ? parseInt(pageSize.toString(), 10) : undefined;

    if (pageIndex && pageSize) {
      const totalUser = await this.prisma.nguoiDung.count({
        where: {
          da_xoa: false,
          ten_nguoi_dung: {
            contains: keyWord,
          }
        }
      })

      const data = await this.prisma.nguoiDung.findMany({
        select: this.showUser,
        where: {
          da_xoa: false,
          ten_nguoi_dung: {
            contains: keyWord,
          }
        },
        skip: (intPageIndex - 1) * intPageSize,
        take: intPageSize
      })

      return {
        totalUser: totalUser,
        totalPages: Math.ceil(totalUser / intPageSize),
        currentPage: intPageIndex,
        data
      }
    } else {
      const data = await this.prisma.nguoiDung.findMany({
        select: this.showUser,
        where: {
          da_xoa: false,
          ten_nguoi_dung: {
            contains: keyWord,
          }
        }
      })
      return data
    }
  }

  // Thông Tin Tài Khoản
  // async getUserInformation(id: number) {
  //   let userInfo = await this.prisma.nguoiDung.findUnique({
  //     where: {
  //       ma_nguoi_dung: id
  //     }
  //   })

  //   let userInfoDecodePwd = {
  //     "ma_nguoi_dung": userInfo.ma_nguoi_dung,
  //     "ten_nguoi_dung": userInfo.ten_nguoi_dung,
  //     "email": userInfo.email,
  //     "mat_khau": userInfo.mat_khau,
  //     "so_dt": userInfo.so_dt,
  //     "ngay_sinh": userInfo.ngay_sinh,
  //     "gioi_tinh": userInfo.gioi_tinh,
  //     "vai_tro": userInfo.vai_tro
  //   }

  //   return userInfoDecodePwd
  // }

  // Upload Avatar
  async uploadAvatarUser(id: number, file: Express.Multer.File) {
    try {
      let uploadAvatar = await this.prisma.nguoiDung.update({
        where: {
          ma_nguoi_dung: id
        },
        data: {
          avatar: file.filename
        }
      })
      return uploadAvatar
    } catch (error) {
      throw new HttpException("Lỗi server", 500)
    }
  }

  // Cập Nhật Người Dùng
  async updateUser(id: number, userDto: UserDto) {
    let data = await this.prisma.nguoiDung.update({
      where: {
        ma_nguoi_dung: id
      },
      data: {
        ...userDto,
        mat_khau: await bcrypt.hash(userDto.mat_khau, 10)
      }
    })
    return data;
  }

  // Xoá Người Dùng
  async remove(id: number) {
    let data = await this.prisma.nguoiDung.update({
      where: {
        ma_nguoi_dung: id
      },
      data: {
        da_xoa: true
      }
    })
    return data;
  }
}
