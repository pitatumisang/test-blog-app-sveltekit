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

	console.log($userToken);

	if ($userToken !== null) {
		isUserLogin = true;
	}
</script>

<svelte:head>
	<title>Blog - Home</title>
</svelte:head>

<section class="container mx-auto p-8">
	<div class="flex justify-between items-center h-fit">
		<h1 class="text-3xl font-bold mb-8">Posts</h1>
		{#if isUserLogin}
			<a
				href="/createPost"
				class="bg-blue-500 text-white text-md  font-semibold p-2 rounded-md w-fit"
			>
				Create New Post
			</a>
		{:else}
			<a
				href="/register"
				class="bg-blue-500 text-white text-md  font-semibold p-2 rounded-md w-fit"
			>
				Register / Login
			</a>{/if}
	</div>

	{#each posts as post}
		<div class="bg-white p-4 mb-4 rounded-md shadow-md">
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
		</div>
	{/each}
</section>
