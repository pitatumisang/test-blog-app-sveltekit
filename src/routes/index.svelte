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
	export let posts;

	let showCreatePost = false;
	let btnText = '';

	const toggleCreatePost = () => {
		showCreatePost = !showCreatePost;
	};

	$: if (!showCreatePost) {
		btnText = 'Create New Post';
	} else {
		btnText = 'Close Form';
	}

	const post = {
		title: '',
		desc: ''
	};

	const createNewPost = async () => {
		if (post.title === '' || post.desc === '') {
			console.log('Post title and description are required');
			return;
		}

		// save the post
		const res = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		});

		const response = await res.json();

		console.log(response);
	};
</script>

<svelte:head>
	<title>Blog - Home</title>
</svelte:head>

<section class="container mx-auto p-8">
	<div class="flex justify-between items-center h-fit">
		<h1 class="text-3xl font-bold mb-8">Posts</h1>
		<button
			on:click={toggleCreatePost}
			class=" bg-blue-500 text-white text-md  font-semibold p-2 rounded-md w-fit"
		>
			{btnText}
		</button>
	</div>

	{#if showCreatePost}
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
	{/if}

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
