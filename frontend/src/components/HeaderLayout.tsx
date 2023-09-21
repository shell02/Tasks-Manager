import { Outlet, useNavigate } from "react-router-dom";
import { HeaderButton, HeaderLink, HeaderWrapper, ProfilePage, ProfileWindow } from "../styles/Header.styles";
import { LuMenuSquare } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai"
import { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Edit } from "./Edit";
import { useLoggedIn } from "../hooks/useLoggedIn";

export const HeaderLayout = () => {

	const [showProfile, setShowProfile] = useState<boolean>(false);
	const {width, height} = useWindowSize();
	const [login, setLogin] = useLoggedIn();

	const navigate = useNavigate();

	const onDisconnect = () => {
		localStorage.removeItem("token");
		setLogin(false);
		setTimeout(() => {
			navigate('/')
		}, 200);
		setTimeout(() => {
			navigate(0)
		}, 300);
	}

	return (
		<>
			<HeaderWrapper>
				<HeaderLink to='/dashboard'><h1>Task Manager</h1></HeaderLink>
				<HeaderButton $rigth={80} onClick={() => {setShowProfile(!showProfile)}}><LuMenuSquare size={35} /></HeaderButton>
				<HeaderButton onClick={onDisconnect}><FiLogOut size={35} /></HeaderButton>

				{showProfile &&
					<ProfilePage>
						
						<ProfileWindow $height={height} $width={width}>
						<HeaderButton $top={20} $rigth={120} onClick={() => {setShowProfile(!showProfile)}}><AiOutlineClose size={35} /></HeaderButton>

							<Edit />
						</ProfileWindow>
					</ProfilePage>
				}

			</HeaderWrapper>
			<Outlet />
		</>
		
	)
}