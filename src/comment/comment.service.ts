import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService
  ) { }
  // Bình luận phòng
  async create(createCommentDto: CreateCommentDto) {
    let comment = await this.prisma.binhLuan.create({
      data: createCommentDto
    })
    return comment
  }

  // Get Danh Sách Bình Luận
  async getAllComment() {
    let data = await this.prisma.binhLuan.findMany()
    return data
  }

  // Get Bình Luận Theo Phòng
  async getCommentByRoomId(MaPhong: number) {
    let data = await this.prisma.binhLuan.findMany({
      where: {
        ma_phong: MaPhong
      }
    })
    return data
  }

  // Cập Nhật Bình Luận
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    let data = await this.prisma.binhLuan.update({
      where: {
        ma_binh_luan: id
      },
      data: updateCommentDto
    })
    return data
  }

  // Xoá bình Luận
  async remove(id: number) {
    let data = await this.prisma.binhLuan.delete({
      where: {
        ma_binh_luan: id
      }
    })
    return data
  }
}
