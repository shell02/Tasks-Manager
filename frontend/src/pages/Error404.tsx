import { useWindowSize } from "../hooks/useWindowSize";
import { HomeTitle, HomeWrapper } from "../styles/Home.styles";

interface Props {
	isLoggedIn: boolean;
}

export const Error404 = (props: Props) => {

	const { width, height } = useWindowSize();
	
	return (
		<HomeWrapper $width={width} $height={height}>
			<HomeTitle>Page Not Found</HomeTitle>			
		</HomeWrapper>
	)
}