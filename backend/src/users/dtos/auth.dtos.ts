import { Exclude } from "class-transformer";
import { Contains, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateIf } from "class-validator";


export class SignUpDTO {

	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9_]+$/)
	name: string;


	@IsEmail()
	@IsNotEmpty()
	email: string;


	@IsString()
	@IsNotEmpty()
	@Length(8)
	@Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
	password: string;
}

export class SignInDTO {

	@IsEmail()
	@IsNotEmpty()
	email: string;


	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
	password: string;
}

export class EditProfileDTO {
	
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@Matches(/^[a-zA-Z0-9_]+$/)
	name: string;

	@IsEmail()
	@IsNotEmpty()
	@IsOptional()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
	password: string;

	constructor(partial: Partial<EditProfileDTO>) {
		Object.assign(this, partial);
	}
}

export class EditPasswordDTO {

	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
	oldPassword: string;

	@IsString()
	@IsNotEmpty()
	@Length(8)
	@Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
	newPassword: string;
}

export class ProfileDTO {
	id: number;
	name: string;
	email: string;

	@Exclude()
	password: string;

	@Exclude()
	created_at: Date;
	@Exclude()
	updated_at: Date;	

	@Exclude()
	tasks: [];

	constructor(partial: Partial<ProfileDTO>) {
		Object.assign(this, partial);
	}
}