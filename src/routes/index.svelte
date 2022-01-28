<script context="module">
	export async function load({ fetch }) {
		const resourceUrl = `/api/posts`;
		const res = await fetch(resourceUrl);

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load url`)
		};
	}
</script>

<script>
	import { userToken } from '../stores/stores';

	export let posts;

	let isUserLogin;
	$: isUserLogin = false;

	if ($userToken !== null) {
		isUserLogin = true;
	}

	const logOutuser = () => {
		localStorage.setItem('token', null);
		window.location.href = '/';
	};
</script>

<svelte:head>
	<title>Blog - Home</title>
</svelte:head>

<section class="container mx-auto p-8">
	<div class="flex justify-between items-center h-fit">
		<h1 class="text-3xl font-bold mb-8">Posts</h1>
		{#if isUserLogin}
			<div>
				<button
					on:click={logOutuser}
					class="bg-red-500 text-white text-md  font-semibold p-2 mr-4 rounded-md w-fit"
				>
					Log Out
				</button>
				<a
					href="/createPost"
					class="bg-blue-500 text-white text-md  font-semibold p-2 rounded-md w-fit"
				>
					Create New Post
				</a>
			</div>
		{:else}
			<div>
				<a
					href="/login"
					class="bg-gray-500 text-white text-md mr-4 font-semibold py-2 px-4 rounded-md w-fit"
				>
					Login
				</a>
				<a
					href="/register"
					class="bg-blue-500 text-white text-md  font-semibold py-2 px-4 rounded-md w-fit"
				>
					Register
				</a>
			</div>
		{/if}
	</div>

	{#each posts as post}
		<div class="relative bg-white p-4 mb-4 rounded-md shadow-md">
			<h3 class="font-bold mb-2">{post.title}</h3>
			<p class="mb-4">{post.desc}</p>
			<a
				class="flex items-center bg-gray-500 text-white text-sm  font-semibold p-2 rounded-md w-fit"
				href={`/posts/${post._id}`}
			>
				<span>Read More </span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
			<div class="absolute right-4 top-4">
				<button class="mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class=" text-blue-500 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
				</button>

				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-red-500 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/each}
</section>
