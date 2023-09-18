import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "src/prisma/prisma.service";

interface JWTPayload {
	name: string;
	id: number;
	iat: number,
	exp: number
}

@Injectable()
export class AuthGard implements CanActivate {
	
	constructor (private readonly prismaService: PrismaService, private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext) {

		const noAuth = this.reflector.getAllAndOverride('noAuth', [
			context.getHandler(),
			context.getClass(),
		]);

		if (noAuth === true) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = request.headers?.authorization?.split("Bearer ")[1];

		
		if (!token) {
			return false;
		}
		
		try {
			const payload = await jwt.verify(token, process.env.JSON_WEB_TOKEN) as JWTPayload;
			const user = await this.prismaService.user.findUnique({ where: {id: payload.id} });
			
			if (!user) {
				return false;
			}
		} catch {
			return false;
		}

		return true;
	}
}