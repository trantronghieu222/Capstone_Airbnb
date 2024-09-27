import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Nếu không yêu cầu vai trò, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Không có tiêu đề xác thực');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Không có token cung cấp');
    }

    try {
      const decodedToken = this.jwtService.decode(token) as any;
      if (!decodedToken || !decodedToken.role) {
        throw new UnauthorizedException('Token không hợp lệ');
      }

      const userRole = decodedToken.role;
      if (!requiredRoles.includes(userRole)) {
        throw new UnauthorizedException('Vai trò không đủ quyền');
      }

      return true; // Vai trò hợp lệ
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}