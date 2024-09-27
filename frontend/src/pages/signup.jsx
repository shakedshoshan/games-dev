import GenderCheckbox from "../components/GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

/**
 * Component for user signup functionality
 * @returns {JSX.Element} A form for user registration with input fields for full name, username, password, confirm password, and gender selection
 */
const signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	/**
	 * Handles the change event of a checkbox input for gender selection.
	 * @param {string} gender - The selected gender value.
	 * @returns {void} This function doesn't return a value, it updates the state.
	 */
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	/**
	 * Handles the form submission for user signup
	 * @param {Event} e - The form submission event
	 * @returns {Promise<void>} A promise that resolves when the signup process is complete
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center rounded-lg bg-[#2e2c47] min-w-80 mx-auto  text-white'>
			<div className='w-80 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-100 pb-3'>
					Sign Up <span className='text-blue-600'> SocialGames</span>
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						/**
						 * Updates the fullName property in the inputs state object when the input value changes
						 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object from the input element
						 * @returns {void} This function doesn't return a value
						 */
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10 rounded-md text-black'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						/**
						 * Updates the username in the inputs state object
						 * @param {Object} e - The event object from the input change
						 * @returns {void} This function does not return a value
						 */
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10 rounded-md text-black'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							/**
							 * Updates the confirmPassword field in the inputs state object
							 * @param {Object} e - The event object from the input change
							 * @returns {void} This function does not return a value
							 */
							className='w-full input input-bordered h-10 rounded-md text-black'
							value={inputs.password}
							/**
							 * Updates the password field in the inputs state object
							 * @param {Object} e - The event object from the input change
							 * @returns {void} This function does not return a value
							 */
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 rounded-md text-black'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2  hover:bg-cyan-950 w-full rounded-md' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default signup;