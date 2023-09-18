import { Exclude } from "class-transformer";
import { Contains, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class SignUpDTO {

	@IsString()
	@IsNotEmpty()
	name: string;


	@IsEmail()
	@IsNotEmpty()
	email: string;


	@IsString()
	@IsNotEmpty()
	@Length(8)
	password: string;
}

export class SignInDTO {

	@IsEmail()
	@IsNotEmpty()
	email: string;


	@IsString()
	@IsNotEmpty()
	password: string;
}

export class EditProfileDTO {
	
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	@IsOptional()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	constructor(partial: Partial<EditProfileDTO>) {
		Object.assign(this, partial);
	}
}

export class EditPasswordDTO {

	@IsString()
	@IsNotEmpty()
	oldPassword: string;

	@IsString()
	@IsNotEmpty()
	@Length(8)
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