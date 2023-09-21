import styled from "styled-components";
import { AppLink } from "./App.styles";

export const HeaderWrapper = styled.div`
	width: 100%;
	height: 80px;
	grid-area: header;
	backdrop-filter: contrast(110%);
	position: sticky;
`

export const HeaderLink = styled(AppLink)`
	font-size: 15px;
	left: 30px;
	display: inline-block;
	position: relative;
`

export const HeaderButton = styled.button<{ $rigth?: number; $top?: number }>`
	width: 40px;
	height: 40px;
	right: ${props => props.$rigth || "30"}px;
	color: azure;
	position: absolute;
	display: inline-block;
	top: ${props => props.$top || "20"}px;
	transition: top 0.2s ease;
	background-color: rgba(0, 0, 0, 0.06);
	border: none;
	border-radius: 5px;

	&:hover {
		cursor: pointer;
	}
`

export const ProfilePage = styled.div`
	backdrop-filter: blur(3px);
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100vh;
	top: 0%;
`

export const ProfileWindow = styled.div<{ $width: number; $height: number }>`
	z-index: 2;
	width: ${props => props.$width <= 600 ? "90%" :
			props.$width <= 900 ? "70%" : "50%"};
	height: 500px;
	margin: 80px auto;
	border: solid wheat 2px;
	border-radius: 20px;
	background: rgba(65, 105, 225, 0.8);
	box-shadow: 1px 1px 2px azure;
`

export const EditTitle = styled.p`
	font-size: 25px;
	color: azure;
	text-align: center;
	margin-top: 20px;
`

export const HeaderForm = styled.form`
	width: 100%;
	height: fit-content;
`

export const HeaderToolTip = styled.p`
	background: rgba(20, 20, 20, 0.6);
	border-radius: 8px;
	width: fit-content;
	height: fit-content;
	position: relative;
	display: inline;
	color: azure;
	font-size: 12px;
	margin-left: 25px;
	vertical-align: middle;
	text-align: center;
	padding: 4px 10px;

`

export const HeaderInput = styled.input`
	display: inline-block;
	width: 90%;
	height: 30px;
	margin: 6px 4%;
	color: azure;
	background-color: rgba(0, 0, 0, 0.01);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.06);
	}
	&:focus {
		border-style: none none solid none;
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.06);
	}
`
export const HeaderSubmit = styled.input`
	display: block;
	width: 100px;
	margin: 10px auto 0px;
	height: fit-content;
	padding: 2px;
	color: azure;
	background-color: rgba(0, 0, 0, 0.01);
	border-style: solid;
	border-width: 1px;
	transition: background-color 0.2s ease;
	&:hover {
		background-color: azure;
		color: rgb(0, 0, 0);
	}
`
