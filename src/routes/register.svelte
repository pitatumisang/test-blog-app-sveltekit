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

<section class="container mx-auto p-8">
	<h1 class="text-3xl font-bold mb-8">Create an account</h1>
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
	<form class="mb-10" on:submit|preventDefault={createUserAccount}>
		<div class="mb-4">
			<label for="title" class="font-semibold block mb-2 ">Names</label>
			<input
				type="text"
				name="title"
				id="title"
				class="block rounded-md w-full"
				bind:value={user.names}
			/>
		</div>
		<div class="mb-4">
			<label for="email" class="font-semibold block mb-2 ">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				class="block rounded-md w-full"
				bind:value={user.email}
			/>
		</div>
		<div class="mb-4">
			<label for="password" class="font-semibold block mb-2 ">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				class="block rounded-md w-full"
				bind:value={user.password}
			/>
		</div>
		<div class="mb-4">
			<label for="confirm-password" class="font-semibold block mb-2 ">Confirm Password</label>
			<input
				type="password"
				name="confirm-password"
				id="confirm-password"
				class="block rounded-md w-full"
				bind:value={user.confirmPassword}
			/>
		</div>

		<button class=" bg-blue-500 text-white text-md  font-semibold p-2 rounded-md w-full">
			Create An Account
		</button>
	</form>
	<p class="text-center text-xl">
		<span class="mr-2">Already have an account?</span><a
			class="underline text-blue-500 font-semibold"
			href="/login">Log In</a
		>
	</p>
</section>
