<script>
	import { userToken } from '../stores/stores';

	const user = {
		email: 'test@gmail.com',
		password: 'test'
	};

	let isAlertActive = false;
	let isSuccessAlert = false;
	let alertMsg = '';

	const loginUser = async () => {
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		const resData = await res.json();

		const { success, msg } = resData;
		let token = '';

		if (!success) {
			//display error msg
			isAlertActive = true;
			isSuccessAlert = false;
			alertMsg = msg;

			setTimeout(() => {
				isAlertActive = false;
				alertMsg = '';
			}, 3000);

			return;
		}

		//login successful
		isAlertActive = true;
		isSuccessAlert = true;
		alertMsg = msg;

		token = resData.token;
		$userToken = token;

		setTimeout(() => {
			isAlertActive = false;
			alertMsg = '';
		}, 3000);

		setTimeout(() => {
			// redirect
			window.location.href = '/';
		}, 2000);
	};
</script>

<section class=" pt-6">
	<div class="pb-4">
		<a
			class="flex items-center bg-blue-500 text-white text-sm  font-semibold p-2 rounded-md w-fit"
			href="/"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
				/>
			</svg>
			<span class="ml-2">Home</span>
		</a>
	</div>

	<section
		class="container mx-auto p-8 max-w-md bg-white rounded-lg border border-gray-200 shadow-md"
	>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
		<div class="my-4">
			{#if isAlertActive && !isSuccessAlert}
				<div
					class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
					role="alert"
				>
					<svg
						class="inline flex-shrink-0 mr-3 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/></svg
					>
					<div>
						<span class="font-semibold">{alertMsg}</span>
					</div>
				</div>
			{:else if isAlertActive && isSuccessAlert}
				<div
					class="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
					role="alert"
				>
					<svg
						class="inline flex-shrink-0 mr-3 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/></svg
					>
					<div>
						<span class="font-semibold">{alertMsg}</span>
					</div>
				</div>
			{/if}
		</div>
		<form class="space-y-6 " on:submit|preventDefault={loginUser}>
			<div>
				<label for="email" class="block mb-2 text-sm font-semibold text-gray-900 ">Your email</label
				>
				<input
					type="email"
					name="email"
					id="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="name@company.com"
					required
					bind:value={user.email}
				/>
			</div>
			<div>
				<label for="password" class="block mb-2 text-sm font-semibold text-gray-900 "
					>Your password</label
				>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
					bind:value={user.password}
				/>
			</div>
			<!-- <div class="flex items-start">
				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="remember"
							aria-describedby="remember"
							type="checkbox"
							class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 "
							required
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="remember" class="font-medium text-gray-900 ">Remember me</label>
					</div>
				</div>
				<a href="#" class="ml-auto text-sm text-blue-700 hover:underline ">Lost Password?</a>
			</div> -->
			<button
				type="submit"
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
				>Login to your account</button
			>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="register" class="text-blue-700 hover:underline ">Create account</a>
			</div>
		</form>
	</section>
</section>
