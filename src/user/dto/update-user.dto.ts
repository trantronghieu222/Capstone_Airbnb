import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'string' })
    ten_nguoi_dung: string;

    @IsNotEmpty({ message: "Không được để trống email" })
    @IsEmail({}, { message: "Email không hợp lệ" })
    @ApiProperty({ example: 'string' })
    email: string;

    @ApiProperty({ example: 'string' })
    so_dt: string;

    @ApiProperty({ example: 'string' })
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Ngày sinh phải theo định dạng DD/MM/YYYY.' })
    ngay_sinh: string;

    @ApiProperty({ example: 'true' })
    gioi_tinh: boolean;

    @ApiProperty({ example: 'string' })
    vai_tro: string;
}