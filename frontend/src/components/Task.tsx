import { SingleTaskWrapper } from "../styles/Dashboard.styles";
import { AiOutlineEdit, AiFillClockCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { MdNotificationImportant } from 'react-icons/md';

interface Props {
	state: string,
	priority: string,
	id: number
	content: string;
}

export const Task = (props: Props) => {

	return (
		<SingleTaskWrapper $bg_color={props.priority}>
			{props.content}
			<AiFillClockCircle />
			<MdNotificationImportant />
			<AiOutlineEdit />
			<FaTrashAlt />
		</SingleTaskWrapper>
	)
}