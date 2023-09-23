import { Link } from "react-router-dom";
import styled from "styled-components";

export const AppLink = styled(Link)<{ $color?: string; }>`
	&:hover {
		color: ${props => props.$color || "azure"};
		text-decoration: none;
	}
	&:link {
		color: ${props => props.$color || "azure"};
		text-decoration: none;
	}
	&:visited {
		color: ${props => props.$color || "azure"};
		text-decoration: none;
	}
	&:active {
		color: ${props => props.$color || "azure"};
		text-decoration: none;
	}
`

export const AppWrapper = styled.div`

	background-image: url(../assets/night_sky_1.jpg);
	background-size: cover;
	background-position: center;
	min-width: 100vw;
	min-height: 100vh;

	display: grid;
	grid-template-areas: "header header" "main main";
	grid-template-rows: 80px auto;

	font-family: "Helvetica Neue", "Arial", sans-serif;
	color: azure;


`