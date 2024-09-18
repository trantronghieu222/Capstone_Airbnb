import { ApiProperty } from "@nestjs/swagger";

export class UploadImgUserDto {
    @ApiProperty({type: 'string', format: 'binary'})
    hinhAnh: any;
}