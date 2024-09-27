import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for handling user signup functionality
 * @returns {Object} An object containing the loading state and signup function
 * @returns {boolean} loading - Indicates whether the signup process is in progress
 * @returns {Function} signup - Asynchronous function to handle user signup
 * @returns {Function} signup.fullName - The full name of the user
 * @returns {Function} signup.username - The username for the account
 * @returns {Function} signup.password - The password for the account
 * @returns {Function} signup.confirmPassword - The password confirmation
 * @returns {Function} signup.gender - The gender of the user
 */
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	/**
	 * Handles user signup process asynchronously
	 * @param {Object} signupData - The signup data object
	 * @param {string} signupData.fullName - The full name of the user
	 * @param {string} signupData.username - The username for the account
	 * @param {string} signupData.password - The password for the account
	 * @param {string} signupData.confirmPassword - The password confirmation
	 * @param {string} signupData.gender - The gender of the user
	 * @returns {Promise<void>} No return value, but updates local storage and auth state on success
	 */
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

/**
 * Validates input fields for user registration
 * @param {Object} options - The input fields to validate
 * @param {string} options.fullName - The full name of the user
 * @param {string} options.username - The username for the account
 * @param {string} options.password - The password for the account
 * @param {string} options.confirmPassword - The password confirmation
 * @param {string} options.gender - The gender of the user
 * @returns {boolean} Returns true if all validations pass, false otherwise
 */
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}