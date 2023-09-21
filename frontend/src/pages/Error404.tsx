import { useWindowSize } from "../hooks/useWindowSize";
import { HomeTitle, HomeWrapper } from "../styles/Home.styles";
import { AppLink } from "../styles/App.styles";


export const Error404 = () => {

	const { width, height } = useWindowSize();

	return (
		<HomeWrapper $width={width} $height={height}>
			<HomeTitle>Page Not Found</HomeTitle>
			<AppLink to='/'>Back Home</AppLink>		
		</HomeWrapper>
	)
}