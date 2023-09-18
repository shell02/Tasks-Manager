import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDTO } from './dtos/tasks.dtos';
import { PriorityType, StateType } from '@prisma/client';

interface CreateTaskParams {
	content: string;
	priority: PriorityType;
	state: StateType
}

interface UpdateTaskParams {
	content?: string;
	priority?: PriorityType;
	state?: StateType
}

@Injectable()
export class TasksService {

	constructor(private readonly prismaService: PrismaService) {}

	async getTasks(id: number, priority: PriorityType) : Promise<TaskDTO[]> {
		const tasks = await this.prismaService.task.findMany({
			select: {
				id: true,
				content: true,
				priority: true,
				state: true,
				updated_at: true
			},
			where: {
				user_id: id,
				...(priority && {priority})
			}
		});

		if (!tasks.length) {
			throw new NotFoundException();
		}
		return tasks.map((task) => {return new TaskDTO(task)});
	}

	async createTask({content, priority, state} : CreateTaskParams, id: number) : Promise<TaskDTO> {

		const task = await this.prismaService.task.create({
			data: {
				content,
				priority,
				state,
				user_id: id
			}
		});

		return new TaskDTO(task);
	}

	async updateTask(data: UpdateTaskParams, id: number) : Promise<TaskDTO> {

		const task = await this.prismaService.task.findUnique({ where: {id} });

		if (!task) {
			throw new NotFoundException();
		}

		const updatedTask = await this.prismaService.task.update({
			where: {
				id,
			},
			data: {
				...data,
				updated_at: new Date()
			}
		})
		return new TaskDTO(updatedTask);
	}

	async deleteTask(id: number) {
		await this.prismaService.task.delete({ where: {id} });
	}

	async getUserIDFromTask(id: number) : Promise<number> {
		const task = await this.prismaService.task.findUnique({ where: {id} });

		if (!task) {
			throw new NotFoundException();
		}

		return task.user_id;
	}
}
