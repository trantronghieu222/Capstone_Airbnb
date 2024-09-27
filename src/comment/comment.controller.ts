import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './dto/comment.dto';

@ApiTags("BinhLuan")
@Controller('binh-luan')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }

  // Bình Luận
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() commentDto: CommentDto) {
    return this.commentService.create(commentDto);
  }

  // Get Danh Sách Bình Luận
  @Get()
  getAllComment() {
    return this.commentService.getAllComment();
  }

  // Get Bình Luận Theo Phòng
  @Get('lay-binh-luan-theo-phong/:MaPhong')
  getCommentByRoomId(@Param('MaPhong') MaPhong: string) {
    return this.commentService.getCommentByRoomId(+MaPhong)
  }

  // Cập Nhật Bình Luận
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() commentDto: CommentDto) {
    return this.commentService.update(+id, commentDto);
  }

  // Xoá Bình Luận
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
