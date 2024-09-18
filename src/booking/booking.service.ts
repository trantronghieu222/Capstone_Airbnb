import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService
  ){}

  // Đặt phòng
  async create(createBookingDto: CreateBookingDto) {
    let data = await this.prisma.datPhong.create({
      data: createBookingDto
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
    let data = await this.prisma.datPhong.findMany({
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
  async updateBooking(id: number, updateBookingDto: UpdateBookingDto) {
    let data = await this.prisma.datPhong.update({
      where: {
        ma_dat_phong: id
      },
      data: updateBookingDto
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
