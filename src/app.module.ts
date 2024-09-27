import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { CommentModule } from './comment/comment.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [RoomModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), LocationModule, CommentModule, BookingModule, UserModule, JwtModule.register({global: true})],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
