import { useState } from "react";
import { getCsrfToken, signIn, getSession } from "next-auth/react";

import { useRouter } from "next/router";
export async function getServerSideProps(context) {
	const { req } = context;

	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: "/admin" },
		};
	}
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}

export default function AuthPage({ csrfToken }) {
	const [showPasswordState, setShowPassword] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const router = useRouter();
	function handleEmailChange(e) {
		setUsername(e.target.value);
	}
	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	async function handleLogin() {
		signIn("credentials", {
			username: username,
			password: password,
			redirect: false,
		}).then(({ ok, error }) => {
			if (ok) {
				setError(false);
				router.push("/admin");
			} else {
				setError(true);
			}
		});
	}
	console.log(showPasswordState);
	function showPassword() {
		setShowPassword(!showPasswordState);
	}

	return (
		<div className="flex items-center justify-center mt-16">
			<div className="w-full max-w-xs">
				<form className="bg-neutral-50 shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4">
					<input
						name="csrfToken"
						type="hidden"
						defaultValue={csrfToken}
					/>
					<div className="mb-4">
						<label
							className="block text-neutral-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Логин
						</label>
						<input
							onChange={handleEmailChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div className="mb-2">
						<label
							className="block text-neutral-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Пароль
						</label>
						<div className="relative">
							<input
								onChange={handlePasswordChange}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type={showPasswordState ? "password" : "text"}
								placeholder="******************"
							/>
							<div
								onClick={showPassword}
								className="cursor-pointer absolute  pointer-events-auto text-sm right-0 top-0 py-2 px-3"
							>
								{showPasswordState ? (
									<svg
										className="w-6 h-6"
										viewBox="0 0 256 256"
									>
										<path
											fill="currentColor"
											d="M251 123.1a149.8 149.8 0 0 0-28.5-39.6C196.6 57.7 164 44 128 44S59.4 57.7 33.5 83.5A149.8 149.8 0 0 0 5 123.1a12.8 12.8 0 0 0 0 9.8a149.8 149.8 0 0 0 28.5 39.6C59.4 198.3 92 212 128 212s68.6-13.7 94.5-39.5a149.8 149.8 0 0 0 28.5-39.6a12.8 12.8 0 0 0 0-9.8Zm-46.1 33C183.5 177.3 157.6 188 128 188s-55.5-10.7-76.9-31.9A131.4 131.4 0 0 1 29.5 128a128.9 128.9 0 0 1 21.6-28.1C72.5 78.7 98.4 68 128 68s55.5 10.7 76.9 31.9a131.4 131.4 0 0 1 21.6 28.1a131.4 131.4 0 0 1-21.6 28.1ZM128 84a44 44 0 1 0 44 44a44 44 0 0 0-44-44Zm0 64a20 20 0 1 1 20-20a20.1 20.1 0 0 1-20 20Z"
										/>
									</svg>
								) : (
									<svg
										className="w-6 h-6"
										viewBox="0 0 256 256"
									>
										<path
											fill="currentColor"
											d="M234.4 160.8a12 12 0 0 1-10.4 18a11.8 11.8 0 0 1-10.4-6l-16.3-28.2a126 126 0 0 1-29.4 13.5l5.2 29.4a11.9 11.9 0 0 1-9.7 13.9l-2.1.2a12 12 0 0 1-11.8-9.9l-5.1-28.7a123.5 123.5 0 0 1-16.4 1a146.3 146.3 0 0 1-16.5-1l-5.1 28.7a12 12 0 0 1-11.8 9.9l-2.1-.2a11.9 11.9 0 0 1-9.7-13.9l5.2-29.4a125.3 125.3 0 0 1-29.3-13.5L42.3 173a12.1 12.1 0 0 1-10.4 6a11.7 11.7 0 0 1-6-1.6a12 12 0 0 1-4.4-16.4l17.9-31a142.4 142.4 0 0 1-16.7-17.6a12 12 0 1 1 18.6-15.1C57.1 116.8 84.9 140 128 140s70.9-23.2 86.7-42.7a12 12 0 1 1 18.6 15.1a150.3 150.3 0 0 1-16.7 17.7Z"
										/>
									</svg>
								)}
							</div>
						</div>
					</div>
					<div className="mb-4 ">
						{error && (
							<p className="text-pink-400">
								Ошибка 😣, проверьте коррекность введнных данных
							</p>
						)}
					</div>
					<div className="flex items-center justify-between">
						<button
							onClick={handleLogin}
							className="font-semibold w-full text-xl bg-black text-white px-4 py-2 rounded-xl active:scale-95 block transition"
							type="button"
						>
							Авторизоваться
						</button>
					</div>
				</form>
				<p className="text-center text-gray-500 text-xs">
					&copy;2022 CODDY INC. All rights reserved.
				</p>
			</div>
		</div>
	);
}
