import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

/**
 * Login component for SocialGames application
 * Renders a login form with username and password inputs
 * Handles form submission and user authentication
 * @returns {JSX.Element} A styled login form with input fields and a submit button
 */
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	/**
	 * Handles the form submission for user login.
	 * @param {Event} e - The form submission event.
	 * @returns {Promise<void>} A promise that resolves when the login process is complete.
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex flex-col justify-center min-w-80 mx-auto rounded-lg text-white bg-[#2e2c47] '>
			<div className='w-80 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 space-y-10'>
				<h1 className='text-3xl font-semibold text-center text-gray-100'>
					Login
					<span className='text-blue-600'> SocialGames</span>
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4 rounded-lg">
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						/**
						 * Event handler for username input changes
						 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object
						 * @returns {void} This function does not return a value
						 */
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10 rounded-md text-black'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 rounded-md text-black'
							value={password}
							/**
							 * Handles the change event for the password input field
							 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object
							 * @returns {void} This function doesn't return a value
							 */
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 hover:bg-cyan-950 w-full rounded-md' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;