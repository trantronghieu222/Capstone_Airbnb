import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadImgLocationDto } from 'src/location/dto/upload-img-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorageOption } from 'src/shared/file-upload.service';
import { UserDto } from './dto/user.dto';
// import { JwtService } from '@nestjs/jwt';

@ApiTags("NguoiDung")
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private jwtService: JwtService
  ) { }

  // Thêm Người Dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
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

  // Thông tin tài khoản
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @Get('thong-tin-tai-khoan')
  // getUserInformation(
  //   @Req() req: Request
  // ) {
  //   let token = req.headers['authorization'].split(' ')[1]
  //   let decodeToken = this.jwtService.decode(token)
  //   return this.userService.getUserInformation(+decodeToken.userId)
  // }

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
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateUser(+id, userDto);
  }

  // Xoá Người Dùng
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
