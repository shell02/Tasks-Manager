import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { HomeToolTip } from "../styles/Home.styles";
import { TaskFormInput, TaskFormLabel, TaskFormSelect, TaskFormWrapper, TaskFormSubmit } from "../styles/Dashboard.styles";

interface Props {
	refetch: () => any
}

export const TaskForm = (props: Props) => {

	const [message, setMessage] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [state, setState] = useState<string>("TODO");
	const [priority, setPriority] = useState<string>("LOW");

	const { data, refetch } = useQuery(["NewTask"], async () => {

		const token = localStorage.getItem("token");

		const body = {
			content,
			state,
			priority,
		};
		return fetch("http://localhost:3000/tasks", {
			method: "POST",
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

	const schema = yup.object().shape({
		content: yup.string().required("Please provide some content for your task"),
		priority: yup.string()
	});

	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});


	const onSubmit = (data: FieldValues) => {
		if (errors.content || !content)
			return ;
		setMessage("");
		refetch();
		setContent("");
	}

	const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPriority(event.target.value);
	}

	useEffect(() => {

	}, []);

	return (
		<>
			{message && <HomeToolTip>{message}</HomeToolTip>}
			<TaskFormWrapper>
				<form  onSubmit={handleSubmit(onSubmit)}>
					<TaskFormInput type="text" placeholder="New Task..."  {...register("content")} value={content} onChange={(event) => {setContent(event.target.value)}}/>
					{errors.content && <HomeToolTip>{errors.content.message}</HomeToolTip>}
					<TaskFormLabel>
						Task Level of Priority :
						<TaskFormSelect  {...register("priority")} name="priority"  onChange={handlePriorityChange} value={priority}>
							<option value="LOW">LOW</option>
							<option value="MEDIUM" >MEDIUM</option>
							<option value="HIGH" >HIGH</option>
						</TaskFormSelect>
					</TaskFormLabel>
					<TaskFormSubmit type="submit" value="Submit" />
				</form>
			</TaskFormWrapper>
		</>
	)
}