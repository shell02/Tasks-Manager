import styled from "styled-components";

export const DashboardWrapper = styled.div`
	grid-area: main;
	margin-top: 20px;
`

export const TaskTitle = styled.h1`
	color: azure;
	font-size: 25px;
	margin: 20px auto;
	text-align: center;
`

export const TaskWrapper = styled.div<{ $type: string }>`
	border: solid 5px;
	border-color: rgba(${props => props.$type === "TODO" ? "178, 34, 34, 0.5" :
				props.$type === "ONGOING" ? "205, 133, 63, 0.5" : "34, 139, 34, 0.5"});
	backdrop-filter: blur(3px);
	min-width: 320px;
	width: 30%;
	height: 400px;
	border-radius: 15px;
	overflow: scroll;
	margin-top: 20px;
`

export const SingleTaskWrapper = styled.div<{ $type: string; $bg_color: string }>`
	background: rgba(${props => props.$type === "TODO" ? "178, 34, 34" :
				props.$type === "ONGOING" ? "205, 133, 63" : "34, 139, 34"}, ${props => props.$bg_color === "LOW" ? "0.2" :
									props.$bg_color === "MEDIUM" ? "0.5" : "0.8"});
	width: 90%;
	height: fit-content;
	font-size: ${props => props.$bg_color === "LOW" ? "25px" :
				props.$bg_color === "MEDIUM" ? "27px" : "30px"};
	margin: 20px auto;
	border-radius: 5px;
	padding: 2px;
`

export const TaskFormWrapper = styled.div`
	margin: 0px auto;
	background: linear-gradient(rgba(184, 134, 11, 1), rgba(184, 134, 11, 0.1));
	width: 90%;
	min-height: 60px;
	border: none;
	border-radius: 10px;
	box-shadow: 1px 1px 3px azure;
`

export const TaskFormInput = styled.input`
	width: 70%;
	height: 25px;
	margin: 15px;
	padding: 2px;
	color: azure;
	background-color: rgba(0, 0, 0, 0.1);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover, &:focus {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.3);
	}
`

export const TaskFormLabel = styled.label`
	margin-right: 10px;
`

export const TaskFormSelect = styled.select`
	background: linear-gradient(rgba(184, 134, 11, 0.7), rgba(184, 134, 11, 0.3));
	border: solid azure 1px;
	color: azure;
	border-radius: 5px;
	padding: 5px;
	margin: 0px 10px;
`

export const TaskFormOption = styled.option<{ $type?: string }>`
	background: rgba(${props => props.$type === "TODO" ? "178, 34, 34" :
					props.$type === "ONGOING" ? "205, 133, 63" : props.$type ? "34, 139, 34" : "184, 134, 11"}, 1);
`

export const TaskFormSubmit = styled.input`
	width: 70px;
	margin: 25px;
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

export const SingleTaskForm = styled.form`
	display: inline-block;
`

export const SingleTaskSelect = styled.select`
	background: transparent;
	border: none;
	color: azure;
	margin: 10px 10px;
	width: 22px;
`

export const SingleTaskInput = styled.textarea`
	width: 50%;
	height: fit-content;
	padding: 2px;
	color: azure;
	background-color: rgba(0, 0, 0, 0.06);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover, &:focus {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.1);
	}

`

export const SingleTaskButton = styled.button`
	background: transparent;
	border: none;
	width: 25px;
	height: 25px;
	margin-right: 10px;
	color: azure;
	cursor: pointer;

`
