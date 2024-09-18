import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadImgLocationDto } from 'src/location/dto/upload-img-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorageOption } from 'src/shared/file-upload.service';

@ApiTags("NguoiDung")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Thêm Người Dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Get Danh Sách Người Dùng
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  // Phân Trang Tìm Kiếm
  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'keyWord', required: false })
  pagingSearchUser(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyWord') keyWord?: string,
  ) {
    return this.userService.pagingSearchUser(pageIndex, pageSize, keyWord);
  }

  // Get Người Dùng Theo Id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  // Tìm Kiếm Người Dùng Theo Tên
  @Get('search/:TenNguoiDung')
  getUserByName(@Param('TenNguoiDung') TenNguoiDung: string) {
    return this.userService.getUserByName(TenNguoiDung);
  }

  // Upload Avatar
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadImgLocationDto
  })
  @UseInterceptors(FileInterceptor("hinhAnh", { storage: getStorageOption('avatar') }))
  @Post('upload-avatar/:id')
  async uploadAvatarUser(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.uploadAvatarUser(+id, file)
  }

  // Cập Nhật Người Dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  // Xoá Người Dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
