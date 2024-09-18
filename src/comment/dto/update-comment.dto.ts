import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiProperty({ example: 0 })
    ma_binh_luan: number;

    @ApiProperty({ example: 0 })
    ma_phong: number;

    @ApiProperty({ example: 0 })
    ma_nguoi_binh_luan: number;

    @ApiProperty({ example: 'string' })
    ngay_binh_luan: string;

    @ApiProperty({ example: 'string' })
    noi_dung: string;

    @ApiProperty({ example: 0 })
    sao_binh_luan: number;
}
