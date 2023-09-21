import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EditPasswordDTO, EditProfileDTO, SignInDTO, SignUpDTO } from '../dtos/auth.dtos';
import { AuthService } from './auth.service';
import { NoAuthRequired } from '../decorators/auth.decorator';
import { User, UserInfo } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@NoAuthRequired()
	signUp( @Body() body : SignUpDTO) {
		return this.authService.signUp(body);
	}

	@Post('signin')
	@NoAuthRequired()
	signIn( @Body() body: SignInDTO ) {
		return this.authService.signIn(body);
	}

	@Put('edit_profile')
	editProfile( @Body() body: EditProfileDTO, @User() user: UserInfo ) {
		return this.authService.editProfile(body, user.id);
	}

	@Put('edit_password')
	editPassword( @Body() body: EditPasswordDTO, @User() user: UserInfo ) {
		return this.authService.editPassword(body, user.id);
	}

	@Get('/me')
	me( @User() user: UserInfo ) {
		return user;
	}
}
