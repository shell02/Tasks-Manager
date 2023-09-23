import styled from "styled-components";
import { AppLink } from "./App.styles";

export const HeaderWrapper = styled.div`
	width: 100%;
	height: 80px;
	grid-area: header;
	backdrop-filter: contrast(120%);
	position: relative;
	z-index: 1;
`

export const HeaderLink = styled(AppLink)`
	
`

export const HeaderButton = styled.button<{ $rigth?: number; $top?: number }>`
	width: 40px;
	height: 40px;
	right: ${props => props.$rigth || "30"}px;
	color: azure;
	position: absolute;
	top: ${props => props.$top || "20"}px;
	background-color: rgba(0, 0, 0, 0.06);
	border: none;
	&:hover {
		cursor: pointer;
	}
`

export const ProfilePage = styled.div`
	backdrop-filter: blur(3px);
	position: absolute;
	z-index: 1;
	width: 100%;
	min-height: 100vh;
	top: 0%;
`

export const ProfileWindow = styled.div<{ $width: number; $height: number }>`
	width: ${props => props.$width <= 600 ? "90%" :
			props.$width <= 900 ? "70%" : "50%"};
	min-height: 500px;
	margin: 80px auto;
	border: solid azure 2px;
	border-radius: 20px;
	background: rgba(0, 0, 100, 0.8);
	box-shadow: 1px 1px 2px azure;
`

export const EditTitle = styled.p`
	font-size: 1.5rem;
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
	width: 90%;
	height: 30px;
	margin: 6px 4%;
	color: azure;
	background-color: rgba(0, 0, 0, 0.1);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover, &:focus {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.5);
	}
`
export const HeaderSubmit = styled.input`
	display: block;
	width: 100px;
	margin: 10px auto;
	padding: 2px;
	color: azure;
	background-color: rgba(0, 0, 0, 0.01);
	border-style: solid;
	border-width: 1px;
	transition: background-color 0.2s ease;
	&:hover, &:focus {
		background-color: azure;
		color: rgb(0, 0, 0);
	}
`
