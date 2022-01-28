<script>
	import { userToken } from '../stores/stores';

	const post = {
		title: '',
		desc: ''
	};

	let isAlertActive = false;
	let isSuccessAlert = false;
	let alertMsg = '';

	const createNewPost = async () => {
		if (post.title === '' || post.desc === '') {
			isAlertActive = true;
			isSuccessAlert = false;
			alertMsg = 'Post title and description are required!';

			setTimeout(() => {
				isAlertActive = false;
				alertMsg = '';
			}, 3000);

			return;
		}

		// save the post
		const res = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ post, userToken: $userToken })
		});

		const { success, msg } = await res.json();

		if (success) {
			post.title = '';
			post.desc = '';
		}

		isAlertActive = true;
		isSuccessAlert = success;
		alertMsg = msg;

		setTimeout(() => {
			isAlertActive = false;
			alertMsg = '';
		}, 3000);
	};
</script>

<section class="container mx-auto p-8">
	<h1 class="text-3xl font-bold">Create a new post</h1>
	<div class="pt-8">
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
					fill-rule="evenodd"
					d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			<span>Back</span>
		</a>
	</div>

	<div class="my-4">
		{#if isAlertActive && !isSuccessAlert}
			<div class="bg-red-300 text-red-600 font-semibold text-lg py-2 px-8 rounded-md">
				{alertMsg}
			</div>
		{:else if isAlertActive && isSuccessAlert}
			<div class="bg-green-300 text-green-700 font-semibold text-lg py-2 px-8 rounded-md">
				{alertMsg}
			</div>
		{/if}
	</div>

	<form class="mb-10" on:submit|preventDefault={createNewPost}>
		<div class="mb-4">
			<label for="title" class="font-semibold block mb-2 ">Post Title</label>
			<input
				type="text"
				name="title"
				id="title"
				class="block rounded-md w-full"
				bind:value={post.title}
			/>
		</div>
		<div class="mb-4">
			<label for="title" class="font-semibold block mb-2 ">Post Description</label>
			<textarea
				name="desc"
				id="desc"
				cols="30"
				rows="5"
				class="block rounded-md w-full"
				bind:value={post.desc}
			/>
		</div>
		<button class=" bg-blue-500 text-white text-md  font-semibold p-2 rounded-md w-full">
			Create New Post
		</button>
	</form>
</section>
