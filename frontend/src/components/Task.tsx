import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { SingleTaskWrapper, SingleTaskForm, SingleTaskInput, TaskFormSelect, SingleTaskSelect, SingleTaskButton } from "../styles/Dashboard.styles";
import { BsCheck2All } from "react-icons/bs";
import { MdDeleteOutline, MdSettingsBackupRestore } from "react-icons/md";
import * as yup from "yup";
import { HomeToolTip } from "../styles/Home.styles";

interface Props {
	state: string,
	priority: string,
	id: number
	content: string;
	refetch: () => any
}

export const Task = (props: Props) => {

	const [message, setMessage] = useState<string>("");
	const [content, setContent] = useState<string>(props.content);
	const [state, setState] = useState<string>(props.state);
	const [priority, setPriority] = useState<string>(props.priority);

	const { refetch: refetchUpdate } = useQuery(["TaskUpdate"], async () => {

		const token = sessionStorage.getItem("token");

		const body = {
			content,
			state,
			priority,
		};
		return fetch("http://localhost:3000/tasks/" + props.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			},
			body: JSON.stringify(body)
		}).then(async (res) => {
			const infos = await res.json();
			if (res.ok) {
				props.refetch();
				setMessage("");
			}
			else {
				let errorMessage: string = "";
				if (infos.error) {
					errorMessage = infos.message[0];
				} else {
					errorMessage = infos.message;
				}
				setMessage(errorMessage);
			}
			return res;
		})
	}, {
		refetchOnWindowFocus: false,
  		enabled: false
	});

	const { refetch: refetchDelete } = useQuery(["TaskDelete"], async () => {

		const token = sessionStorage.getItem("token");

		return fetch("http://localhost:3000/tasks/" + props.id, {
			method: "DELETE",
			headers: {
				"Authorization": "Bearer " + token
			}
		}).then(async (res) => {
			const infos = await res.json();
			if (res.ok) {
				setMessage("");
			}
			else {
				let errorMessage: string = "";
				if (infos.error) {
					errorMessage = infos.message[0];
				} else {
					errorMessage = infos.message;
				}
				setMessage(errorMessage);
				props.refetch();
			}
			return res;
		})
	}, {
		refetchOnWindowFocus: false,
  		enabled: false
	});


	const schema = yup.object().shape({
		content: yup.string().required("Please provide some content for your task"),
		priority: yup.string(),
		state: yup.string()
	});

	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});


	const onSubmit = (data: FieldValues) => {
		if (errors.content || !content)
			return ;
		setMessage("");
		console.log(props.id, content, priority);
		refetchUpdate();
	}

	const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPriority(event.target.value);
	}

	const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setState(event.target.value);
	}

	const handleTaskDelete = () => {
		refetchDelete();
	}

	const handleGoBack = () => {
		setContent(props.content);
		setState(props.state);
		setPriority(props.priority);
	}

	useEffect(() => {

	}, []);

	return (
		<SingleTaskWrapper $bg_color={props.priority}>
			<SingleTaskForm onSubmit={handleSubmit(onSubmit)}>

				{message && <HomeToolTip>{message}</HomeToolTip>}

				<SingleTaskInput type="text" value={content} {...register("content")} onChange={(event) => setContent(event.target.value)}></SingleTaskInput>
				<SingleTaskSelect  {...register("priority")} name="priority"  onChange={handlePriorityChange} value={priority}>
					<option value="LOW">LOW</option>
					<option value="MEDIUM" >MEDIUM</option>
					<option value="HIGH" >HIGH</option>
				</SingleTaskSelect>
				<SingleTaskSelect  {...register("state")} name="state"  onChange={handleStateChange} value={state}>
					<option value="TODO">TODO</option>
					<option value="ONGOING" >ONGOING</option>
					<option value="DONE" >DONE</option>
				</SingleTaskSelect>
				<SingleTaskButton type="submit" ><BsCheck2All size={(25)}/></SingleTaskButton>
			</SingleTaskForm>
				<SingleTaskButton  onClick={handleTaskDelete} ><MdDeleteOutline size={(25)}/></SingleTaskButton>
				<SingleTaskButton><MdSettingsBackupRestore onClick={handleGoBack} size={(25)}/></SingleTaskButton>

		</SingleTaskWrapper>
	)
}