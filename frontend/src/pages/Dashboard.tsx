import { useEffect, useState } from "react"
import { TaskForm } from "../components/TaskForm"
import { DashboardWrapper, TaskTitle, TaskWrapper } from "../styles/Dashboard.styles"
import { useQuery } from "@tanstack/react-query";
import { HomeToolTip } from "../styles/Home.styles";
import { Task } from "../components/Task";
import { useNavigate } from "react-router-dom";

interface TaskParam {
	id: number;
	state: string;
	priority: string;
	content: string;
	updatedAt: Date;
}

export const Dashboard = () => {

	const [message, setMessage] = useState<string>("");
	const [todo, setTodos] = useState<TaskParam[]>([]);
	const [ongoing, setOngoing] = useState<TaskParam[]>([]);
	const [done, setDone] = useState<TaskParam[]>([]);

	const navigate = useNavigate();

	const sortTasks = (tasks: TaskParam[])=> {
		if (!tasks) {
			return [];
		}

		const todoTasks: TaskParam[] = [];
   		const ongoingTasks: TaskParam[] = [];
    	const doneTasks: TaskParam[] = [];
		
		tasks.forEach((task) => {
		
			if (task.state === "TODO") {
				todoTasks.push(task);
			} else if (task.state === "ONGOING") {
				ongoingTasks.push(task);
			} else if (task.state === "DONE") {
				doneTasks.push(task);
			}
		});

		setTodos(todoTasks);
	    setOngoing(ongoingTasks);
    	setDone(doneTasks);

	}

	const { data, refetch, isLoading } = useQuery(["GetTasks"], async () => {

		setMessage("");
		const token = sessionStorage.getItem("token");

		return fetch("http://localhost:3000/tasks", {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + token
			},
		}).then(async (res) => {
			const tasks = await res.json();
			const empty: TaskParam[] = [];
			setTodos(empty);
				setOngoing(empty);
				setDone(empty);
			if (res.ok) {
				sortTasks(tasks);
			} else if (res.status === 404) {
				
			} else {
				let errorMessage: string = "";
				if (tasks.error) {
					errorMessage = tasks.message[0];
				} else {
					errorMessage = tasks.message;
				}
				setMessage(errorMessage);
			}
			return tasks;
		})
	}, {
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		setTimeout(() => {
			setMessage("");
			refetch();
		}, 500);
	}, []);

	useEffect(() => {
		
	}, [data]);

	return (
			<DashboardWrapper>
			{
				isLoading && <HomeToolTip>Loading...</HomeToolTip>
			}
			{
				!isLoading && <>
				{message && <HomeToolTip>{message}</HomeToolTip>}
				<TaskForm refetch={refetch} />
				<div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", marginTop: "30px" }}>
					<TaskWrapper $type="TODO">
						<TaskTitle>TODO</TaskTitle>
						{todo && todo.map((task) => <Task key={task.id} refetch={refetch} id={task.id} state="TODO" priority={task.priority} content={task.content}/>)}
					</TaskWrapper>
					<TaskWrapper $type="ONGOING">
					<TaskTitle>ONGOING</TaskTitle>
						{ongoing && ongoing.map((task) => <Task key={task.id} refetch={refetch} id={task.id} state="ONGOING" priority={task.priority} content={task.content}/>)}
					</TaskWrapper>
					<TaskWrapper $type="DONE">
						<TaskTitle>DONE</TaskTitle>
						{done && done.map((task) => <Task key={task.id} refetch={refetch} id={task.id} state="DONE" priority={task.priority} content={task.content}/>)}
					</TaskWrapper>
				</div>
				</>
			}
		</DashboardWrapper>
	)
}