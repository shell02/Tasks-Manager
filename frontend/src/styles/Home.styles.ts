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

	border: solid wheat 2px;
	border-radius: 20px;
	backdrop-filter: contrast(110%);
	box-shadow: 1px 1px 2px azure;
`
	
export const HomeTitle = styled.h1`
	color: azure;
	margin-top: 50px;
	margin-bottom: 130px;
	text-align: center;
`

export const HomeButton = styled(AppLink)`
	display: block;
	margin: 10px auto;
	width: 90%;
	height: 60px;
	background-color: rgba(0, 0, 0, 0.01);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover {
		border-width: 3px;
		background-color: rgba(0, 0, 0, 0.06);
	}
`

export const HomeButtonText = styled.p`
	color: azure;
	font-size: 20px;
	text-align: left;
	margin-left: 25px;
	margin-top: 13px;
	position: fixed;
`

export const HomeButtonIcon = styled.div<{ $top?: number; $anim?: number; }>`
	width: 50px;
	height: 50px;
	color: azure;
	position: absolute;
	right: 50px;
	top: ${props => props.$top || "228"}px;
	transition: top 0.2s ease;
	&:hover {
		top: ${props => props.$anim || "226"}px;
	}
`

export const HomeReturnText = styled(AppLink)`
	font-size: 13px;
	position: absolute;
	bottom: 20px;
	right: 30px;
`

export const HomeToolTip = styled.p`
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

export const RegisterTitle = styled.h1`
	color: azure;
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

export const RegisterSubmit = styled.input`
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