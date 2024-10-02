import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) { }

  private showRoom = {
    ma_phong: true,
    ten_phong: true,
    khach: true,
    phong_ngu: true,
    giuong: true,
    phong_tam: true,
    mo_ta: true,
    gia_tien: true,
    may_giat: true,
    ban_la: true,
    tivi: true,
    dieu_hoa: true,
    bep: true,
    do_xe: true,
    ho_boi: true,
    ban_ui: true,
    ma_vi_tri: true,
    hinh_anh: true,
    da_xoa: false
  }

  // Lấy Danh Sách Phòng 
  async getAllRoom() {
    try {
      let data = await this.prisma.phong.findMany({
        select: this.showRoom,
        where: {
          da_xoa: false,
          // Vị trí chưa bị xoá
          ViTri: {
            da_xoa: false
          }
        }
      })
      return data;
    } catch (error) {
      throw new HttpException("Lỗi Server", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Get Danh Sách Phòng Theo Vị Trí 
  async getRoomByLocateId(maViTri: number) {
    let data = await this.prisma.phong.findMany({
      select: this.showRoom,
      where: {
        da_xoa: false,
        ma_vi_tri: maViTri,
        ViTri: {
          da_xoa: false
        }
      }
    })
    return data
  }

  // Phân Trang Tìm Kiếm 
  async pagingSearchRoom(pageIndex: number, pageSize: number, keyWord: string) {
    const intPageIndex = pageIndex ? parseInt(pageIndex.toString(), 10) : undefined;
    const intPageSize = pageSize ? parseInt(pageSize.toString(), 10) : undefined;

    if (intPageIndex && intPageSize) {
      // Đếm tổng số phòng
      const totalRooms = await this.prisma.phong.count({
        where: {
          da_xoa: false,
          ten_phong: {
            contains: keyWord,
          },
        },
      });
      // Lấy dữ liệu phòng với phân trang
      const data = await this.prisma.phong.findMany({
        where: {
          da_xoa: false,
          ten_phong: {
            contains: keyWord,
          },
        },
        skip: (intPageIndex - 1) * intPageSize,
        take: intPageSize
      });

      return {
        totalRooms,
        totalPages: Math.ceil(totalRooms / intPageSize),
        currentPage: intPageIndex,
        data
      };
    } else {
      const data = await this.prisma.phong.findMany({
        where: {
          da_xoa: false,
          ten_phong: {
            contains: keyWord
          }
        }
      })
      return data
    }
  }

  // Tìm Phòng Theo Id 
  async getRoomById(id: number) {
    try {
      let data = await this.prisma.phong.findUnique({
        select: this.showRoom,
        where: {
          ma_phong: id
        }
      })
      return data
    } catch (error) {
      throw new HttpException("Lỗi Server", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Upload hình phòng
  async uploadImgRoom(id: number, file: Express.Multer.File) {
    try {
      let uploadImgRoom = await this.prisma.phong.update({
        where: {
          ma_phong: id
        },
        data: {
          hinh_anh: file.filename
        }
      })
      return uploadImgRoom
    } catch (error) {
      throw new HttpException("Lỗi Server", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Thêm Phòng 
  async createRoom(roomDto: RoomDto) {
    // Kiểm tra trùng ID
    const checkedId = await this.prisma.phong.findUnique({
      where: {
        ma_phong: roomDto.ma_phong
      }
    })

    if (checkedId) {
      throw new HttpException("Mã phòng đã tồn tại", HttpStatus.BAD_REQUEST)
    }

    // Kiểm tra vị trí hợp lệ
    const checkLocation = await this.prisma.viTri.findUnique({
      where: { ma_vi_tri: roomDto.ma_vi_tri },
    });

    if (!checkLocation || checkLocation?.da_xoa) {
      throw new HttpException("Không tồn tại vị trí", HttpStatus.BAD_REQUEST)
    }

    // Thêm phòng
    let newRoom = await this.prisma.phong.create({
      data: {
        ...roomDto,
        da_xoa: false,
      },
    });

    return newRoom
  }

  // Cập Nhật Phòng 
  async updateRoom(id: number, roomDto: RoomDto) {
    let data = await this.prisma.phong.update({
      where: {
        ma_phong: id
      },
      data: roomDto
    })
    return data
  }

  // Xoá Phòng 
  async removeRoom(id: number) {
    try {
      let data = await this.prisma.phong.update({
        where: {
          ma_phong: id
        },
        data: {
          da_xoa: true
        }
      })
      return data
    } catch (error) {
      throw new HttpException("Lỗi khi xoá", HttpStatus.BAD_REQUEST)
    }
  }
}
