<script context="module">
	export async function load({ params, fetch }) {
		const res = await fetch(`/api/posts/${params.id}`);

		if (res.ok) {
			return {
				props: {
					post: await res.json()
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
	export let post;

	const deletePost = (id) => {};
</script>

<section class="container mx-auto p-8">
	<a
		href="/"
		class="inline-flex items-center py-2 px-3 text-sm font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 "
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
				clip-rule="evenodd"
			/>
		</svg>
		Back
	</a>

	<h2 class="font-bold text-2xl my-4">{post.title}</h2>
	<h1 class="text-sm my-4 font-bold">ID: {post._id}</h1>
	<p>{post.desc}</p>

	<!-- <div class="flex items-center mt-4">
		<a href={`#`} class="mr-2">
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
		</a>

		<button
			on:click={() => {
				deletePost(post._id);
			}}
		>
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
	</div> -->
</section>
