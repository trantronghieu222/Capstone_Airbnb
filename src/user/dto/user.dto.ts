import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty({ message: "Không được để trống mã người dùng" })
    @ApiProperty({ example: 0 })
    ma_nguoi_dung: number;

    @ApiProperty({ example: 'string' })
    ten_nguoi_dung: string;

    @IsNotEmpty({ message: "Không được để trống email" })
    @IsEmail({}, { message: "Email không hợp lệ" })
    @ApiProperty({ example: 'string' })
    email: string;

    @ApiProperty({ example: 'string' })
    mat_khau: string;

    @ApiProperty({ example: 'string' })
    so_dt: string;

    @ApiProperty({ example: 'string' })
    ngay_sinh: string;

    @ApiProperty({ example: 'true' })
    gioi_tinh: boolean;

    @ApiProperty({ example: 'string' })
    vai_tro: string;
}