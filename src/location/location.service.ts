import { HttpException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Multer } from 'multer';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService
  ) { }

  // Thêm Vị Trí
  async create(createLocationDto: CreateLocationDto) {
    let newLocation = {
      ...createLocationDto,
      da_xoa: false
    }
    let data = await this.prisma.viTri.create({
      data: newLocation
    })
    return newLocation;
  }

  // Get Danh Sách Vị Trí
  async getAllLocation() {
    let data = await this.prisma.viTri.findMany({
      where: {
        da_xoa: false
      }
    })
    return data
  }

  // Phân Trang Tìm Kiếm
  async pagingSearchLocation(pageIndex: number, pageSize: number, keyWord: string) {
    const intPageIndex = pageIndex ? parseInt(pageIndex.toString(), 10) : undefined;
    const intPageSize = pageSize ? parseInt(pageSize.toString(), 10) : undefined;

    if (pageIndex && pageSize) {
      const totalLocation = await this.prisma.viTri.count({
        where: {
          da_xoa: false,
          ten_vi_tri: {
            contains: keyWord
          }
        }
      })

      const data = await this.prisma.viTri.findMany({
        where: {
          da_xoa: false,
          ten_vi_tri: {
            contains: keyWord
          }
        },
        skip: (intPageIndex - 1) * intPageSize,
        take: intPageSize
      })

      return {
        totalLocation: totalLocation,
        currentPage: intPageIndex,
        totalPage: Math.ceil(totalLocation / intPageSize),
        data
      }
    } else {
      const data = await this.prisma.viTri.findMany({
        where: {
          da_xoa: false,
          ten_vi_tri: {
            contains: keyWord
          }
        }
      })
      return data
    }

  }

  // Get Vị Trí Theo Id
  async getLocationById(id: number) {
    let data = await this.prisma.viTri.findMany({
      where: {
        da_xoa: false,
        ma_vi_tri: id
      }
    })
    return data
  }

  // Upload Hình
  async uploadImgLocation(id: number, file: Express.Multer.File) {
    try {
      let uploadImgLocation = await this.prisma.viTri.update({
        where: {
          ma_vi_tri: id
        },
        data: {
          hinh_anh: file.filename
        }
      })
      return uploadImgLocation
    } catch (error) {
      throw new HttpException("Lỗi server", 500)
    }
  }

  // Cập Nhật Vị Trí
  async update(id: number, updateLocationDto: UpdateLocationDto) {
    let data = await this.prisma.viTri.update({
      where: {
        ma_vi_tri: id
      },
      data: updateLocationDto
    })
    return data
  }

  // Xoá Vị Trí
  async remove(id: number) {
    // return `This action removes a #${id} location`;
    let data = await this.prisma.viTri.update({
      where: {
        ma_vi_tri: id
      },
      data: {
        da_xoa: true
      }
    })
    return data
  }
}
