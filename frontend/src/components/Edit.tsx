import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { EditTitle, HeaderForm, HeaderInput, HeaderSubmit } from "../styles/Header.styles";
import * as yup from 'yup';
import { useState } from "react";
import { HomeToolTip } from "../styles/Home.styles";


export const Edit = () => {
	
	const [message, setMessage] = useState<string>("")
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [oldPassword, setOldPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	
	const { data: profileData, refetch: refetchProfile } = useQuery(["EditProfile"], async () => {
		const token = await sessionStorage.getItem("token");
		
		const body = {
			...(username && {name: username}),
			...(email && {email}),
			password
		};
		return fetch("http://localhost:3000/auth/edit_profile", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			},
			body: JSON.stringify(body)
		}).then(async (res) => {
			const infos = await res.json();
			if (res.ok) {
				const name = infos.name;
				const email = infos.email;
				setMessage(`Your name: ${name}, Your email: ${email}`);
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

	const { data: passwordData, refetch: refetchPassword } = useQuery(["EditPassword"], async () => {

		const token = await sessionStorage.getItem("token");

		const body = {
			oldPassword,
			newPassword
		};
		return fetch("http://localhost:3000/auth/edit_password", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			},
			body: JSON.stringify(body)
		}).then(async (res) => {
			const infos = await res.json();
			if (res.ok) {
				setMessage(`Your new password is set !`);
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

	const onSubmitProfile = (data: FieldValues) => {
		if (data.email || data.username)
			refetchProfile();
		else
			setMessage("Nothing to submit");
	}

	const onSubmitPassword = (data: FieldValues) => {
		refetchPassword();
	}

	const profileSchema = yup.object().shape({
		username: yup.string(),
		email: yup.string().email(),
		password: yup.string().min(8, "Password must be at least 8 characters long").matches(/^[a-zA-Z0-9!@#$%^&*]+$/, "Invalid character in your password").required("Please provide a password"),
	});

	const passwordSchema = yup.object().shape({
		oldPassword: yup.string().min(8, "Password must be at least 8 characters long").matches(/^[a-zA-Z0-9!@#$%^&*]+$/, "Invalid character in your password").required("Please provide a password"),
		newPassword: yup.string().min(8, "Password must be at least 8 characters long").matches(/^[a-zA-Z0-9!@#$%^&*]+$/, "Invalid character in your password").required("Please provide a password"),
		confirmPassword: yup.string().oneOf([yup.ref("newPassword")], "Password should be the same").required("Password should be the same"),
	});
	
	const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: {errors: profileErrors} } = useForm({
		resolver: yupResolver(profileSchema)
	});

	const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: {errors: passwordErrors} } = useForm({
		resolver: yupResolver(passwordSchema)
	});

	return (
		<>
			{message && <HomeToolTip>{message}</HomeToolTip>}
			<EditTitle>Edit Profile</EditTitle>
			<HeaderForm onSubmit={handleSubmitProfile(onSubmitProfile)}>
				<HeaderInput type="text" placeholder="Change username..." {...registerProfile("username")} onChange={(event) => setUsername(event?.target.value)} />
				{profileErrors.username && <HomeToolTip>{profileErrors.username?.message}</HomeToolTip>}
				<HeaderInput type="text" placeholder="Change email..." {...registerProfile("email")} onChange={(event) => setEmail(event?.target.value)} />
				{profileErrors.email && <HomeToolTip>{profileErrors.email?.message}</HomeToolTip>}
				<HeaderInput type="password" placeholder="Password..." {...registerProfile("password")} onChange={(event) => setPassword(event?.target.value)} />
				{profileErrors.password && <HomeToolTip>{profileErrors.password?.message}</HomeToolTip>}
				<HeaderSubmit value={"Submit"} type="submit" />
			</HeaderForm>
			<EditTitle>Edit Password</EditTitle>
			<HeaderForm onSubmit={handleSubmitPassword(onSubmitPassword)}>
				<HeaderInput type="password" placeholder="Current password..." {...registerPassword("oldPassword")} onChange={(event) => setOldPassword(event?.target.value)} />
				{passwordErrors.oldPassword && <HomeToolTip>{passwordErrors.oldPassword?.message}</HomeToolTip>}
				<HeaderInput type="password" placeholder="New password..." {...registerPassword("newPassword")} onChange={(event) => setNewPassword(event?.target.value)} />
				{passwordErrors.newPassword && <HomeToolTip>{passwordErrors.newPassword?.message}</HomeToolTip>}
				<HeaderInput type="password" placeholder="Confirm password..." {...registerPassword("confirmPassword")}/>
				{passwordErrors.confirmPassword && <HomeToolTip>{passwordErrors.confirmPassword?.message}</HomeToolTip>}
				<HeaderSubmit value={"Submit"} type="submit" />
			</HeaderForm>
		</>
	)
}