<script context="module">
	export async function load({ fetch }) {
		const resourceUrl = `/api/posts`;
		const res = await fetch(resourceUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const { user, posts } = await res.json();

			return {
				props: {
					user,
					posts
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
	import { browser } from '$app/env';

	export let user;
	export let posts;

	let isUserLoggedIn = false;

	// alert vars
	let isAlertActive = false;
	let isSuccessAlert = false;
	let alertMsg = '';

	$: if (
		(browser && localStorage.getItem('token') === 'null') ||
		(browser && localStorage.getItem('token') === null)
	) {
		isUserLoggedIn = false;
	} else {
		isUserLoggedIn = true;
	}

	const logOutuser = () => {
		$userToken = null;
		browser && localStorage.setItem('token', null);
		isUserLoggedIn = false;
	};

	let isModalActive = false;

	// Modal
	const closeModal = () => {
		isModalActive = false;
	};

	let postId = '';

	// delete post
	const deletePost = (id) => {
		isModalActive = true;
		postId = id;
	};

	// confirm post deletion
	const confirmPostDelete = async () => {
		const res = await fetch(`/api/posts/${postId}`, {
			method: 'DELETE',
			body: JSON.stringify({ userToken: browser && localStorage.getItem('token') })
		});
		const { success, msg } = await res.json();

		isModalActive = false;

		isAlertActive = true;
		isSuccessAlert = success;
		alertMsg = msg;

		setTimeout(() => {
			isAlertActive = false;
			alertMsg = '';
		}, 3000);

		if (success) {
			setTimeout(() => {
				// refresh
				window.location.href = '/';
			}, 1000);
		}
	};
</script>

<svelte:head>
	<title>Blog - Home</title>
</svelte:head>

{#if isModalActive}
	<!-- MODAL START -->
	<div
		class="  bg-black/60 h-screen  fixed right-0 left-0 top-0 z-40 flex justify-center pt-20"
		id="popup-modal"
	>
		<div class="relative px-4 w-full z-50 max-w-md h-full md:h-auto">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow">
				<!-- Modal header -->
				<div class="flex justify-end p-2">
					<button
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
						on:click={closeModal}
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/></svg
						>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-6 pt-0 text-center">
					<svg
						class="mx-auto mb-4 w-14 h-14 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<h3 class="mb-5 text-lg font-normal text-gray-500">
						Are you sure you want to delete this post?
					</h3>
					<button
						on:click={confirmPostDelete}
						class="text-white bg-red-600 hover:bg-red-800 f font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
					>
						Yes, I'm sure
					</button>
					<button
						on:click={closeModal}
						class="text-gray-500 bg-white hover:bg-gray-100  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
						>No, cancel</button
					>
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL END -->
{/if}

<section class="container mx-auto p-8">
	<div class="flex justify-between items-center h-fit">
		<h1 class="text-3xl font-bold mb-8">Posts</h1>

		{#if isUserLoggedIn}
			<div>
				<button
					on:click={logOutuser}
					class="inline-flex items-center py-2 px-3 text-sm font-semibold text-center text-white bg-red-500 rounded-lg hover:bg-red-700"
				>
					Log Out
				</button>
				<a
					href="/createPost"
					class="inline-flex items-center py-2 px-3 text-sm font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700"
				>
					Create New Post
				</a>
			</div>
		{:else}
			<div>
				<a
					href="/login"
					class="inline-flex items-center py-2 px-3 text-sm font-semibold text-center text-white bg-gray-500 rounded-lg hover:bg-gray-700"
				>
					Login
				</a>

				<a
					href="/register"
					class="inline-flex items-center py-2 px-3 text-sm font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700"
				>
					Register
				</a>
			</div>
		{/if}
	</div>

	<!-- Alert DIALOG START -->
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
	<!-- ALERT DIALOG END -->

	{#if posts.length < 1}
		<h1 class="text-2xl font-extrabold text-center">There are no posts yet!</h1>
	{:else}
		{#each posts as post}
			<div class="relative bg-white p-4 mb-4 rounded-md shadow-md">
				<h3 class="font-bold mb-2">{post.title}</h3>
				<p class="mb-4">{post.desc}</p>

				<a
					href={`/posts/${post._id}`}
					class="inline-flex items-center py-2 px-3 text-sm font-semibold text-center text-white bg-gray-500 rounded-lg hover:bg-gray-800 "
				>
					Read more
					<svg
						class="ml-2 -mr-1 w-4 h-4"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</a>

				<div class="absolute flex items-center right-4 top-4">
					<a href={`posts/${post._id}/edit`} class="mr-2">
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
				</div>
			</div>
		{/each}
	{/if}
</section>
