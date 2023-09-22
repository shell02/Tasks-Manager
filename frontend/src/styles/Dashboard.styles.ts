import styled from "styled-components";

export const DashboardWrapper = styled.div`
	grid-area: main;
`

export const TaskTitle = styled.h1`
	color: azure;
	font-size: 25px;
	margin: 20px auto;
	text-align: center;
`

export const TaskWrapper = styled.div<{ $type: string }>`
	display: inline-block;
	background: ${props => props.$type === "TODO" ? "firebrick" :
				props.$type === "ONGOING" ? "peru" : "forestgreen"};
	width: 450px;
	height: 400px;
	margin: 20px 0px 0px 50px;
	border-radius: 15px;
	overflow: scroll;
`

export const SingleTaskWrapper = styled.div<{ $bg_color: string }>`
	color: azure;
	background: rgba(255, 255, 255, ${props => props.$bg_color === "LOW" ? "0.1" :
									props.$bg_color === "MEDIUM" ? "0.3" : "0.5"});
	width: 90%;
	height: ${props => props.$bg_color === "LOW" ? "30px" :
			props.$bg_color === "MEDIUM" ? "33px" : "35px"};
	font-size: ${props => props.$bg_color === "LOW" ? "25px" :
				props.$bg_color === "MEDIUM" ? "27px" : "30px"};
	margin: 20px auto;
`

export const TaskFormWrapper = styled.div`
	margin: 10px auto;
	background: goldenrod;
	color: azure;
	display: block;
	width: 90%;
	min-height: 60px;
	height: fit-content;
	border: none;
	border-radius: 10px;
	box-shadow: 1px 1px 3px azure;
	margin: 0px auto;
`

export const TaskFormInput = styled.input`
	display: inline-block;
	width: 70%;
	height: 25px;
	margin: 10px 2%;
	padding: 2px;
	color: azure;
	background-color: rgba(0, 0, 0, 0.06);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.1);
	}
	&:focus {
		border-style: none none solid none;
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.06);
	}
`

export const TaskFormLabel = styled.label`
	margin-right: 10px;
`

export const TaskFormSelect = styled.select`
	background: goldenrod;
	border: solid azure 1px;
	color: azure;
	border-radius: 5px;
	padding: 5px;
	margin: 0px 10px;
`

export const TaskFormSubmit = styled.input`
	display: inline-block;
	width: fit-content;
	margin: 10px auto;
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

export const SingleTaskForm = styled.form`
	width: fit-content;
	height: 100%;
	display: inline-block;
`

export const SingleTaskSelect = styled.select`
	background: transparent;
	border: solid azure 1px;
	color: black;
	border: none;
	margin: 0px 10px;
	width: 22px;
`

export const SingleTaskInput = styled.input`
	width: 50%;
	padding: 2px;
	color: azure;
	background-color: rgba(0, 0, 0, 0.06);
	border-style: none none solid none;
	border-width: 0px;
	transition: border-width 0.2s ease, background-color 0.2s ease;
	&:hover {
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.1);
	}
	&:focus {
		border-style: none none solid none;
		border-width: 2px;
		background-color: rgba(0, 0, 0, 0.06);
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
