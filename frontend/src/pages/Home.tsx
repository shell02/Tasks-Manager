import { useNavigate } from "react-router-dom";
import { HomeButtonIcon, HomeButtonText, HomeDiv, HomeTitle } from "../styles/Home.styles";
import { FiLogIn } from "react-icons/fi";

export const Home = () => {

	const navigate = useNavigate();

	const onClickLogin = () => {
		navigate("/login");
	}


	const onClickRegister = () => {
		navigate("/register");
	}

	return (
		<>
			<HomeTitle>Tasks Manager</HomeTitle>
			<HomeDiv onClick={onClickLogin}>
				<div style={{ width: "85%" }}>
					<HomeButtonText>Login</HomeButtonText>
				</div>
				<HomeButtonIcon><FiLogIn size={25}/></HomeButtonIcon>
			</HomeDiv>
			<HomeDiv onClick={onClickRegister}>
				<div style={{ width: "85%" }}>
				<HomeButtonText>Register</HomeButtonText>
				</div>
				<HomeButtonIcon><FiLogIn size={25}/></HomeButtonIcon>
			</HomeDiv>
		</>
	)
}