import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdatePasswordDto {
    @IsNotEmpty({ message: "Không được để trống mật khẩu" })
    @ApiProperty({ example: 'string' })
    mat_khau_hien_tai: string;

    @IsNotEmpty({ message: "Không được để trống mật khẩu" })
    @ApiProperty({ example: 'string' })
    mat_khau: string;
}