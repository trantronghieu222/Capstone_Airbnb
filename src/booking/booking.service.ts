import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService
  ){}

  // Đặt phòng
  async create(bookingDto: BookingDto) {
    let data = await this.prisma.datPhong.create({
      data: bookingDto
    })
    return data
  }

  // Get Danh Sách Đặt Phòng
  async getAllBooking() {
    let data = await this.prisma.datPhong.findMany();
    return data
  }

  // Get Đặt Phòng Theo Id
  async getBookingById(id: number) {
    let data = await this.prisma.datPhong.findUnique({
      where: {
        ma_dat_phong: id
      }
    });
    return data
  }

  // Get Đặt Phòng Theo Người Dùng
  async getBookingByUserId(MaNguoiDung: number){
    let data = await this.prisma.datPhong.findMany({
      where: {
        ma_nguoi_dat: MaNguoiDung
      }
    })
    return data
  }

  // Cập nhật
  async updateBooking(id: number, bookingDto: BookingDto) {
    let data = await this.prisma.datPhong.update({
      where: {
        ma_dat_phong: id
      },
      data: bookingDto
    })
    return data
  }

  // Xoá
  async remove(id: number) {
    let data = await this.prisma.datPhong.delete({
      where: {
        ma_dat_phong: id
      }
    })
    return data
  }
}
