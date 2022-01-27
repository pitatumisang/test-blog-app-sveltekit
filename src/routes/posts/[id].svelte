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
</script>

<section class="container mx-auto p-8">
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

	<h2 class="font-bold text-2xl my-4">{post.title}</h2>
	<p>{post.desc}</p>
</section>
