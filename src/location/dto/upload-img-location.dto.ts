import { ApiProperty } from "@nestjs/swagger";

export class UploadImgLocationDto {
    @ApiProperty({type: 'string', format: 'binary'})
    hinhAnh: any;
}