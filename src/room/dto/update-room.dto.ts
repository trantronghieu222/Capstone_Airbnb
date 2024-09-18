import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @ApiProperty({ example: 'string' })
    ten_phong: string;

    @ApiProperty({ example: 0 })
    khach: number;

    @ApiProperty({ example: 0 })
    phong_ngu: number;

    @ApiProperty({ example: 0 })
    giuong: number;

    @ApiProperty({ example: 0 })
    phong_tam: number;

    @ApiProperty({ example: 'string' })
    mo_ta: string;

    @ApiProperty({ example: 0 })
    gia_tien: number;

    @ApiProperty({ example: true })
    may_giat: boolean;

    @ApiProperty({ example: true })
    ban_la: boolean;

    @ApiProperty({ example: true })
    tivi: boolean;

    @ApiProperty({ example: true })
    dieu_hoa: boolean;

    @ApiProperty({ example: true })
    bep: boolean;

    @ApiProperty({ example: true })
    do_xe: boolean;

    @ApiProperty({ example: true })
    ho_boi: boolean;

    @ApiProperty({ example: true })
    ban_ui: boolean;

    @ApiProperty({ example: 0 })
    ma_vi_tri: number;

    @ApiProperty({ example: 'string' })
    hinh_anh: string;
}
