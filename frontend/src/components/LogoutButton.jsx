import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto flex items-center'>
			{!loading ? (
				<div className="flex flex-row">
					<button 
						className="flex flex-row items-center font-bold px-3 py-2 hover:scale-110 text-white text-sm text-semibold rounded-md shadow-md transition duration-300 ease-in-out" 
						onClick={logout}
					>
						<BiLogOut className='w-5 h-5 mr-2' />
						<span>Logout</span>
					</button>
				</div>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;