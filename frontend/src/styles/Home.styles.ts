import styled from "styled-components";
import { AppLink } from "./App.styles";

export const HomeWrapper = styled.div<{ $width: number; $height: number }>`

	width: ${props => 
		props.$width <= 500 ? "90%" :
		props.$width <= 1000 ? "50%" :
		props.$width <= 1500 ? "40%" : "30%"
	};
	min-width: 300px;
	height: 500px;
	grid-area: main;
	margin: 20px auto;

	border: solid azure 2px;
	border-radius: 20px;
	backdrop-filter: contrast(100%) blur(2px);
	box-shadow: 1px 1px 2px azure;
`
	
export const HomeTitle = styled.h1`
	margin-top: 50px;
	margin-bottom: 150px;
	text-align: center;
`

export const HomeDiv = styled.div`
	display: flex;
	margin: 20px auto;
	width: 90%;
	background-color: rgba(0, 0, 0, 0.06);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.1s ease, background-color 0.1s ease;
	&:hover, &:focus {
		border-width: 3px;
		background-color: rgba(0, 0, 0, 0.1);
	}

`

export const HomeButtonText = styled.p`
	margin-left: 25px;
`

export const HomeButtonIcon = styled.div<{ $size?: number; }>`
	margin-top: 0.8em;
	
`

export const HomeReturnText = styled(AppLink)`
	font-size: 0.8em;
	position: absolute;
	bottom: 5%;
	right: 30px;
	font-weight: bolder;
`

export const HomeToolTip = styled.p`
	background: rgba(20, 20, 20, 0.6);
	border-radius: 8px;
	width: fit-content;
	height: fit-content;
	position: relative;
	display: inline;
	font-size: 12px;
	margin-left: 25px;
	vertical-align: middle;
	text-align: center;
	padding: 4px 10px;
`

export const RegisterTitle = styled.h1`
	margin-top: 50px;
	margin-bottom: 60px;
	text-align: center;
`

export const RegisterForm = styled.form`
	width: 100%;
	height: fit-content;
`

export const RegisterInput = styled.input`
	display: inline-block;
	width: 90%;
	height: 30px;
	margin: 10px 4%;
	color: inherit;
	background-color: rgba(0, 0, 0, 0.06);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover, &:focus {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.1);
	}
`

export const RegisterSubmit = styled.input`
	display: block;
	width: 100px;
	margin: 10px auto 0px;
	height: fit-content;
	padding: 2px;
	color: inherit;
	background-color: rgba(0, 0, 0, 0.01);
	border-style: solid;
	border-width: 1px;
	transition: background-color 0.2s ease;
	&:hover, &:focus {
		background-color: azure;
		color: rgb(0, 0, 0);
	}
`