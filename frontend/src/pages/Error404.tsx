import { useWindowSize } from "../hooks/useWindowSize";
import { HomeReturnText, HomeTitle, HomeWrapper } from "../styles/Home.styles";


export const Error404 = () => {

	const { width, height } = useWindowSize();

	return (
		<HomeWrapper $width={width} $height={height}>
			<HomeTitle>Page Not Found</HomeTitle>
			<HomeReturnText to='/'>Back Home</HomeReturnText>		
		</HomeWrapper>
	)
}