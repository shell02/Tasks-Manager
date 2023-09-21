import { Outlet } from "react-router-dom";
import { HomeWrapper } from "../styles/Home.styles";
import { useWindowSize } from "../hooks/useWindowSize";

export const HomeLayout = () => {


	const { width, height } = useWindowSize();

	return (
		<HomeWrapper $width={width} $height={height}>
			<Outlet />
		</HomeWrapper>
	)
}