import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService
  ) { }

  // Thêm Vị Trí
  async create(locationDto: LocationDto) {
    let data = await this.prisma.viTri.create({
      data: locationDto
    })
    return data;
  }

  // Get Danh Sách Vị Trí
  async getAllLocation() {
    let data = await this.prisma.viTri.findMany()
    return data
  }

  // Phân Trang Tìm Kiếm
  async pagingSearchLocation(pageIndex: number, pageSize: number, keyWord: string) {
    const intPageIndex = pageIndex ? parseInt(pageIndex.toString(), 10) : undefined;
    const intPageSize = pageSize ? parseInt(pageSize.toString(), 10) : undefined;

    if (pageIndex && pageSize) {
      const totalLocation = await this.prisma.viTri.count({
        where: {
          ten_vi_tri: {
            contains: keyWord
          }
        }
      })

      const data = await this.prisma.viTri.findMany({
        where: {
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
        content: data
      }
    } else {
      const data = await this.prisma.viTri.findMany({
        where: {
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
    let data = await this.prisma.viTri.findUnique({
      where: {
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
          hinh_anh: `location/${file.filename}`
        }
      })
      return uploadImgLocation
    } catch (error) {
      throw new HttpException("Lỗi server", 500)
    }
  }

  // Cập Nhật Vị Trí
  async updateLocation(id: number, locationDto: LocationDto) {
    let data = await this.prisma.viTri.update({
      where: {
        ma_vi_tri: id
      },
      data: locationDto
    })
    return data
  }

  // Xoá Vị Trí
  async removeLocation(id: number) {
    let checkRoom = await this.prisma.phong.findMany({
      where: {
        ViTri: {
          ma_vi_tri: id
        }
      }
    })
    if (checkRoom) {
      throw new HttpException('Còn phòng trong vị trí không thể xoá', HttpStatus.BAD_REQUEST)
    }

    let data = await this.prisma.viTri.delete({
      where: {
        ma_vi_tri: id
      }
    })
    return data
  }
}
