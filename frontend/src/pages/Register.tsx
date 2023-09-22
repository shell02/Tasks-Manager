import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomeReturnText, RegisterTitle, HomeToolTip, RegisterForm, RegisterInput, RegisterSubmit } from "../styles/Home.styles";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Props {
	setIsLoggedIn: (log: boolean) => void
}

export const Register = (props: Props) => {

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();
	
	const { data, refetch } = useQuery(["SignedUp"], async () => {
		const body = {
			name: username,
			email,
			password
		};
		return fetch("http://localhost:3000/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body)
		}).then(async (res) => {
			if (res?.status === 201) {
				res.json().then((object) => {
					sessionStorage.setItem("token", object.token);
				});
				props.setIsLoggedIn(true);
				navigate("/dashboard");
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

	const schema = yup.object().shape({
		username: yup.string().matches(/^[a-zA-Z0-9_]+$/, "Invalid character in your username").required("Please provide a username"),
		email: yup.string().email().required("Please provide an email"),
		password: yup.string().min(8, "Password must be at least 8 characters long").matches(/^[a-zA-Z0-9!@#$%^&*]+$/, "Invalid character in your password").required("Please provide a password"),
		confirmPassword: yup.string().oneOf([yup.ref("password")], "Password should be the same").required("Password should be the same")
	})
	
	const { register, handleSubmit, formState: {errors} } = useForm({
		resolver: yupResolver(schema)
	});
	
	const onSubmit = (data: FieldValues) => {
		refetch();
	}

	return (
		<>
			<RegisterTitle>Register</RegisterTitle>
			{errorMessage && <HomeToolTip>{errorMessage}</HomeToolTip>}
			<HomeReturnText to="/">Back</HomeReturnText>
			
			<RegisterForm onSubmit={handleSubmit(onSubmit)}>
				<RegisterInput type="text" placeholder="Username" {...register("username")} onChange={(event) => setUsername(event.target.value)}/>
				{errors.username && <HomeToolTip>{errors.username?.message}</HomeToolTip>}
				<RegisterInput type="text" placeholder="Email" {...register("email")} onChange={(event) => setEmail(event.target.value)}/>
				{errors.email && <HomeToolTip>{errors.email?.message}</HomeToolTip>}
				<RegisterInput type="password" placeholder="Password" {...register("password")} onChange={(event) => setPassword(event.target.value)}/>
				{errors.password && <HomeToolTip>{errors.password?.message}</HomeToolTip>}
				<RegisterInput type="password" placeholder=" Confirm Password" {...register("confirmPassword")}/>
				{errors.confirmPassword && <HomeToolTip>{errors.confirmPassword?.message}</HomeToolTip>}
				<RegisterSubmit type="submit" value="Submit"/>
			</RegisterForm>
		</>
	)
}