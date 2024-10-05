import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService
  ) { }
  // Bình luận phòng
  async create(commentDto: CommentDto) {
    let comment = await this.prisma.binhLuan.create({
      data: commentDto
    })
    return comment
  }

  // Get Danh Sách Bình Luận
  async getAllComment() {
    let data = await this.prisma.binhLuan.findMany({
      where: {
        Phong: {
          da_xoa: false,
        }
      }
    })
    return data
  }

  // Get Bình Luận Theo Phòng
  async getCommentByRoomId(MaPhong: number) {
    let data = await this.prisma.binhLuan.findMany({
      where: {
        ma_phong: MaPhong,
        Phong: {
          da_xoa: false
        }
      }
    })
    return data
  }

  // Cập Nhật Bình Luận
  async update(id: number, commentDto: CommentDto) {
    let data = await this.prisma.binhLuan.update({
      where: {
        ma_binh_luan: id
      },
      data: commentDto
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
