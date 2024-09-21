import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
                <div className="flex flex-row"  >
					<button className="flex flex-row" onClick={logout}>
						<BiLogOut className='ml-2 w-6 h-6 text-white cursor-pointer'  />
						<span className='text-white '>Logout</span>
					</button>
                </div>
				
			) : (
				<span className='loading loading-spinner'></span>
			)}
           
		</div>
	);
};
export default LogoutButton;