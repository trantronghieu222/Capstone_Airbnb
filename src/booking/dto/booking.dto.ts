import { ApiProperty } from "@nestjs/swagger";

export class BookingDto {
    @ApiProperty({example: 0})
    ma_dat_phong: number;

    @ApiProperty({example: 0})
    ma_phong: number;

    @ApiProperty({example: 0})
    ma_nguoi_dat: number;

    @ApiProperty({example: 'string'})
    ngay_den: string;

    @ApiProperty({example: 'string'})
    ngay_di: string;

    @ApiProperty({example: 0})
    so_luong_khach: number;
}