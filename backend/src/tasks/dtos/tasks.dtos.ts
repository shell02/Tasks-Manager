import { PriorityType, StateType } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDTO {
	@IsString()
	@IsNotEmpty()
	content: string;

	@IsEnum(PriorityType)
	priority: PriorityType;

	@IsEnum(StateType)
	state: StateType;
}

export class UpdateTaskDTO {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	content: string;

	@IsEnum(PriorityType)
	@IsOptional()
	priority: PriorityType;

	@IsEnum(StateType)
	@IsOptional()
	state: StateType;

	constructor(partial: Partial<UpdateTaskDTO>) {
		Object.assign(this, partial);
	}
}


class User {}

export class TaskDTO {
	id: number;
	content: string;
	priority: PriorityType;
	state: StateType;

	@Exclude()
	user_id: number;
	@Exclude()
	user: User;

	@Expose({name: "updatedAt"})
	updatedAt() {
		return this.updated_at;
	}

	@Exclude()
	created_at: Date;
	@Exclude()
	updated_at: Date;

	constructor(partial : Partial<TaskDTO>) {
		Object.assign(this, partial);
	}
}