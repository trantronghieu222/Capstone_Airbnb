import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'string' })
    ten_nguoi_dung: string;

    @ApiProperty({ example: 'email' })
    email: string;

    @ApiProperty({ example: 'mat_khau' })
    mat_khau: string;

    @ApiProperty({ example: 'so_dt' })
    so_dt: string;

    @ApiProperty({ example: 'date' })
    ngay_sinh: string;

    @ApiProperty({ example: '0' })
    gioi_tinh: boolean;

    @ApiProperty({ example: 'string' })
    vai_tro: string;
}
