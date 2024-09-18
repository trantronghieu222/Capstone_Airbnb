import { ApiProperty } from "@nestjs/swagger";

export class UploadImgRoomDto {
    @ApiProperty({type: 'string', format: 'binary'})
    hinhAnh: any;
}