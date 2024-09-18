import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
// import * as bcrypt from 'bcrypt';

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
    da_xoa: false
  };

  // Thêm Người Dùng
  async createUser(createUserDto: CreateUserDto) {
    // const hashedPassword = await bcrypt.hash(createUserDto.mat_khau, 10);
    let data = await this.prisma.nguoiDung.create({
      data: {
        ...createUserDto,
        // mat_khau: hashedPassword,
        da_xoa: false
      }
    })
    return data;
  }

  // Get Danh Sách Người Dùng
  async getAllUser() {
    let data = await this.prisma.nguoiDung.findMany({
      select: this.showUser
    })
    return data
  }

  // Get Người Dùng Theo Id
  async getUserById(id: number) {
    let data = await this.prisma.nguoiDung.findMany({
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
    }else{
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
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    let data = await this.prisma.nguoiDung.update({
      where: {
        ma_nguoi_dung: id
      },
      data: updateUserDto
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
