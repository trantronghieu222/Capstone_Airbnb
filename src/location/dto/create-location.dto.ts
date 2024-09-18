import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty({example: 'string'})
    ten_vi_tri: string;

    @ApiProperty({example: 'string'})
    tinh_thanh: string;

    @ApiProperty({example: 'string'})
    quoc_gia: string;

    @ApiProperty({example: 'string'})
    hinh_anh: string;
}
