import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BookingDto } from './dto/booking.dto';

@ApiTags("DatPhong")
@Controller('dat-phong')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Đặt Phòng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() bookingDto: BookingDto) {
    return this.bookingService.create(bookingDto);
  }

  // Get Danh Sách Đặt Phòng
  @Get()
  getAllBooking() {
    return this.bookingService.getAllBooking();
  }

  // Get Đặt Phòng Theo Id
  @Get(':id')
  getBookingById(@Param('id') id: string) {
    return this.bookingService.getBookingById(+id);
  }

  // Get Đặt Phòng Theo Người Dùng
  @Get('lay-theo-nguoi-dung/:MaNguoiDung')
  getBookingByUserId(@Param('MaNguoiDung') MaNguoiDung: string){
    return this.bookingService.getBookingByUserId(+MaNguoiDung)
  }

  // Cập Nhật 
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateBooking(@Param('id') id: string, @Body() bookingDto: BookingDto) {
    return this.bookingService.updateBooking(+id, bookingDto);
  }

  // Xoá
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
