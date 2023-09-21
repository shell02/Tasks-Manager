import { HomeButton, HomeButtonIcon, HomeButtonText, HomeTitle } from "../styles/Home.styles";
import { FiLogIn } from "react-icons/fi";

export const Home = () => {

	return (
		<>
			<HomeTitle>Tasks Manager</HomeTitle>
			<HomeButton to='/login'>
				<HomeButtonText>Login</HomeButtonText>
				<HomeButtonIcon><FiLogIn size={25} /></HomeButtonIcon>
			</HomeButton>
			<HomeButton to='/register'>
				<HomeButtonText>Register</HomeButtonText>
				<HomeButtonIcon $top={300} $anim={298}><FiLogIn size={25} /></HomeButtonIcon>
			</HomeButton>			
		</>
	)
}