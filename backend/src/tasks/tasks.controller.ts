import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UnauthorizedException } from '@nestjs/common';
import { User, UserInfo } from "../users/decorators/user.decorator"
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dtos/tasks.dtos';
import { PriorityType } from '@prisma/client';

@Controller('tasks')
export class TasksController {

	constructor(private readonly tasksService: TasksService) {}

	@Get()
	getTasks( @Query('priority') priority: PriorityType, @User() user: UserInfo ) {
		return this.tasksService.getTasks(user.id, priority);
	}

	@Post()
	createTask( @Body() body: CreateTaskDTO, @User() user: UserInfo ) {
		return this.tasksService.createTask(body, user.id);
	}

	@Put(":id")
	async updateTask( @Body() body: UpdateTaskDTO, @User() user: UserInfo, @Param('id', ParseIntPipe) id: number) {

		const user_id = await this.tasksService.getUserIDFromTask(id);
		if (user_id !== user.id) {
			throw new UnauthorizedException();
		}

		return this.tasksService.updateTask(body, id);
	}

	@HttpCode(204)
	@Delete(":id")
	async deleteTask( @User() user: UserInfo, @Param('id', ParseIntPipe) id: number ) {
		const user_id = await this.tasksService.getUserIDFromTask(id);
		if (user_id !== user.id) {
			throw new UnauthorizedException();
		}

		return this.tasksService.deleteTask(id);
	}
}
