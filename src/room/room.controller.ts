import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, UseGuards, Headers, Res, SetMetadata, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UploadImgRoomDto } from './dto/upload-img-room.dto';
import { Response } from 'express';
import { RoomDto } from './dto/room.dto';
import { getStorageOption } from 'src/shared/file-upload.service';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Phong")
@Controller('phong-thue')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private configService: ConfigService,
  ) { }

  // Lấy Danh Sách Phòng
  @Get()
  async getAllRoom(
    @Res() res: Response
  ) {
    return res.json({
      statusCode: HttpStatus.OK,
      content: await this.roomService.getAllRoom()
    })
  }

  // Lấy Danh Sách Phòng Theo Vị Trí
  @Get('lay-phong-theo-vi-tri/:maViTri')
  async getRoomByLocateId(
    @Param('maViTri') maViTri: string,
    @Res() res: Response
  ) {
    return res.json({
      statusCode: HttpStatus.OK,
      content: await this.roomService.getRoomByLocateId(+maViTri)
    })
  }

  // Phân Trang Tìm Kiếm
  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'keyWord', required: false })
  async pagingSearchRoom(
    @Res() res: Response,
    @Query('pageIndex') pageIndex?: number,
    @Query('pageSize') pageSize?: number,
    @Query('keyWord') keyWord?: string
  ) {
    return res.json({
      statusCode: HttpStatus.OK,
      content: await this.roomService.pagingSearchRoom(pageIndex, pageSize, keyWord)
    })
  }

  // Tìm Phòng Theo Id
  @Get(':id')
  async getRoomById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    return res.json({
      statusCode: HttpStatus.OK,
      content: await this.roomService.getRoomById(+id)
    })
  }

  // Upload Phòng
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin'])
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadImgRoomDto
  })
  @UseInterceptors(FileInterceptor("hinhAnh", {storage: getStorageOption('room')}))
  @Post('upload-hinh-phong/:id')
  uploadImgRoom(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): any {
    return this.roomService.uploadImgRoom(+id, file)
  }

  // Thêm Phòng
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin'])
  @Post()
  async createRoom(
    @Body() roomDto: RoomDto,
    @Res() res: Response
  ) {
    return res.json({
      statusCode: HttpStatus.CREATED,
      content: await this.roomService.createRoom(roomDto)
    })
  }

  // Cập Nhật Phòng
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin'])
  @Patch(':id')
  async updateRoom(
    @Param('id') id: string,
    @Body() roomDto: RoomDto,
    @Res() res: Response
  ) {
    return res.json({
      statusCode: HttpStatus.OK,
      content: await this.roomService.updateRoom(+id, roomDto)
    })
  }

  // Xoá Phòng
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  async removeRoom(@Param('id') id: string) {
    await this.roomService.removeRoom(+id);
    return {
      statusCode: HttpStatus.OK,
      message: "Xoá thành công"
    }
  }
}
