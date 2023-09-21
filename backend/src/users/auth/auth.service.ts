import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ProfileDTO } from '../dtos/auth.dtos';

interface SignUpParams {
	name: string;
	email: string;
	password: string;
}

interface SignInParams {
	email: string;
	password: string;
}

interface EditProfileParams {
	name?: string;
	email?: string;
	password: string;
}

interface EditPasswordParams {
	oldPassword: string;
	newPassword: string;
}

@Injectable()
export class AuthService {

	constructor(private readonly prismaService: PrismaService) {}

	async signUp( { name, email, password } : SignUpParams ) {

		const userExists = await this.prismaService.user.findUnique({ where: {email} });
		if (userExists) {
			throw new ConflictException();
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await this.prismaService.user.create({
			data: {
				name,
				email,
				password: hashedPassword
			}
		})

		return {token: this.generateJWT(user.name, user.id)};
	}

	async signIn( { email, password }: SignInParams ) {
		const user = await this.prismaService.user.findUnique({ where: {email} });

		if (!user) {
			throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
		}

		const hashedPassword = user.password;
		const isValidPassword = await bcrypt.compare(password, hashedPassword);

		if (!isValidPassword)
			throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);

		return {token: this.generateJWT(user.name, user.id)};
	}

	async editProfile( { name, email, password }: EditProfileParams, id: number) : Promise<ProfileDTO> {

		const user = await this.prismaService.user.findUnique({ where: {id} });
		if (!user) {
			throw new NotFoundException();
		}

		const hashedPassword = user.password;
		const isValidPassword = await bcrypt.compare(password, hashedPassword);

		if (!isValidPassword) {
			throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
		}

		const updatedUser = await this.prismaService.user.update({
			where: {id},
			data: {
				...(name && {name}),
				...(email && {email}),
				updated_at: new Date()
			}
		})

		return new ProfileDTO(updatedUser);
	}

	async editPassword({ oldPassword, newPassword }: EditPasswordParams, id: number) : Promise<ProfileDTO> {
		const user = await this.prismaService.user.findUnique({ where: {id} });
		if (!user) {
			throw new NotFoundException();
		}

		const hashedPassword = user.password;
		const isValidPassword = await bcrypt.compare(oldPassword, hashedPassword);

		if (!isValidPassword) {
			throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
		}

		const newHashedPassword = await bcrypt.hash(newPassword, 10);
		
		const updatedUser = await this.prismaService.user.update({
			where: {id},
			data: {
				password: newHashedPassword,
				updated_at: new Date()
			}
		})

		return new ProfileDTO(updatedUser);
	}

	private generateJWT(name: string, id: number) {
		return jwt.sign(
			{
				name,
				id
			},
			process.env.JSON_WEB_TOKEN,
			{
				expiresIn: "2h"
			}
		) 
	}
}
