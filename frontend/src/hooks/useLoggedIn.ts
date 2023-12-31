import { useEffect, useState } from "react";


export const useLoggedIn = () : [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		if (sessionStorage.getItem("token") !== null)
			setIsLoggedIn(true);
	}, []);
  
	return [isLoggedIn, setIsLoggedIn];
}