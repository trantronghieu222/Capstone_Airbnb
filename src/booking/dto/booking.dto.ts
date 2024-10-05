import { ApiProperty } from "@nestjs/swagger";
import { Matches } from "class-validator";

export class BookingDto {
    @ApiProperty({example: 0})
    ma_dat_phong: number;

    @ApiProperty({example: 0})
    ma_phong: number;

    @ApiProperty({example: 0})
    ma_nguoi_dat: number;

    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Ngày đến phải theo định dạng DD/MM/YYYY.' })
    @ApiProperty({example: 'string'})
    ngay_den: string;

    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Ngày đi phải theo định dạng DD/MM/YYYY.' })
    @ApiProperty({example: 'string'})
    ngay_di: string;

    @ApiProperty({example: 0})
    so_luong_khach: number;
}