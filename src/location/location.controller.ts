import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadImgLocationDto } from './dto/upload-img-location.dto';
import { getStorageOption } from 'src/shared/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("ViTri")
@Controller('vi-tri')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  // Thêm Vị Trí
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  // Get Danh Sách Vị Trí
  @Get()
  getAllLocation() {
    return this.locationService.getAllLocation();
  }

  // Phân Trang Tìm Kiếm
  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'keyWord', required: false })
  pagingSearchLocation(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyWord') keyWord: string
  ) {
    return this.locationService.pagingSearchLocation(pageIndex, pageSize, keyWord)
  }

  // Get Vị Trí Theo Id
  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return this.locationService.getLocationById(+id);
  }

  // Upload Hình
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadImgLocationDto
  })
  @UseInterceptors(FileInterceptor("hinhAnh", { storage: getStorageOption('location') }))
  @Post('upload-hinh-vi-tri/:id')
  uploadImgLocation(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ): any {
    return this.locationService.uploadImgLocation(+id, file)
  }

  // Cập Nhật Vị Trí
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  // Xoá Vị Trí
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
