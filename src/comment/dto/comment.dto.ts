import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class CommentDto {
    @ApiProperty({ example: 0 })
    ma_binh_luan: number;

    @ApiProperty({ example: 0 })
    ma_phong: number;

    @ApiProperty({ example: 0 })
    ma_nguoi_binh_luan: number;

    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Ngày bình luận phải theo định dạng DD/MM/YYYY.' })
    @ApiProperty({ example: 'string' })
    ngay_binh_luan: string;

    @ApiProperty({ example: 'string' })
    noi_dung: string;

    @ApiProperty({ example: 0 })
    sao_binh_luan: number;
}