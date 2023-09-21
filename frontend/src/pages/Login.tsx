import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomeReturnText, HomeToolTip, RegisterForm, RegisterInput, RegisterSubmit, RegisterTitle } from "../styles/Home.styles";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
	setIsLoggedIn: (log: boolean) => void
}

export const Login = (props: Props) => {

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();
	
	const { data, refetch } = useQuery(["LoggedIn"], async () => {
		const body = {
			email,
			password
		};
		return fetch("http://localhost:3000/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body)
		}).then(async (res) => {
			if (res?.status === 201) {
				res.json().then((object) => {
					localStorage.setItem("token", object.token);
				});
				props.setIsLoggedIn(true);
				setTimeout(() => {
					navigate('/dashboard')
				}, 200);
				setTimeout(() => {
					navigate(0)
				}, 300);
			}
			else {
				const errorInfos = await res.json();
				if (errorInfos.error)
					setErrorMessage(errorInfos.message[0]);
				else
					setErrorMessage(errorInfos.message);
				console.log(errorInfos);
			}
			return res;
		})
	}, {
		refetchOnWindowFocus: false,
  		enabled: false
	});

	const onSubmit = (data: FieldValues) => {
		refetch();
	}

	const schema = yup.object().shape({
		email: yup.string().email().required("Please provide an email"),
		password: yup.string().min(8, "Password must be at least 8 characters long").matches(/^[a-zA-Z0-9!@#$%^&*]+$/, "Invalid character in your password").required("Please provide a password")
	})
	
	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});
	

	return (
		<>
			<RegisterTitle>Login</RegisterTitle>
			{errorMessage && <HomeToolTip>{errorMessage}</HomeToolTip>}
			<HomeReturnText to="/">Back</HomeReturnText>

			<RegisterForm onSubmit={handleSubmit(onSubmit)}>
				<RegisterInput type="text" placeholder="Email" {...register("email")} onChange={(event) => setEmail(event?.target.value)}/>
				{errors.email && <HomeToolTip>{errors.email.message}</HomeToolTip>}
				<RegisterInput type="password" placeholder="Password" {...register("password")} onChange={(event) => setPassword(event?.target.value)}/>
				{errors.password && <HomeToolTip>{errors.password.message}</HomeToolTip>}
				<RegisterSubmit type="submit" />
			</RegisterForm>
			
			
		</>
	)
}