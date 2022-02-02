<script>
	const user = {
		names: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const createUserAccount = () => {
		console.log('creating the user');
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
		<form class="space-y-6 " on:submit|preventDefault={createUserAccount}>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">Create a user account</h3>
			<div>
				<label for="names" class="block mb-2 text-sm font-semibold text-gray-900 ">Your names</label
				>
				<input
					type="text"
					name="names"
					id="names"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="your name"
					required
					bind:value={user.names}
				/>
			</div>
			<div>
				<label for="email" class="block mb-2 text-sm font-semibold text-gray-900 ">Your email</label
				>
				<input
					type="email"
					name="email"
					id="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="test@test.com"
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
			<div>
				<label for="confirm-password" class="block mb-2 text-sm font-semibold text-gray-900 "
					>Confirm Password</label
				>
				<input
					type="password"
					name="confirm-password"
					id="confirm-password"
					placeholder="••••••••"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required
					bind:value={user.confirmPassword}
				/>
			</div>

			<button
				type="submit"
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
				>Create user account</button
			>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Already have an account? <a href="login" class="text-blue-700 hover:underline "
					>Log in to account</a
				>
			</div>
		</form>
	</section>
</section>
