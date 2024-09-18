import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty({ example: 'string' })
    email: string;

    @ApiProperty({ example: 'string' })
    mat_khau: string;
}