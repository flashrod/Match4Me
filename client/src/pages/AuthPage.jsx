import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div
			className='min-h-screen flex items-center justify-center bg-black p-4'
		>
			<div className='w-full max-w-md'>
				<h2 className='text-center text-3xl font-extrabold text-purple-400 mb-8'>
					{isLogin ? "Sign in to M4M" : "Create a M4M account"}
				</h2>

				<div className='bg-gray-900 shadow-xl rounded-lg p-8 border border-gray-800'>
					{isLogin ? <LoginForm /> : <SignUpForm />}

					<div className='mt-8 text-center'>
						<p className='text-sm text-gray-400'>
							{isLogin ? "New to M4M?" : "Already have an account?"}
						</p>

						<button
							onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
							className='mt-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300'
						>
							{isLogin ? "Create a new account" : "Sign in to your account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;
