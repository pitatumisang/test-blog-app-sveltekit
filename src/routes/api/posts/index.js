export const get = async () => {
	const res = await fetch('http://localhost:5000/api/v1/posts');

	if (res.ok) {
		const { posts } = await res.json();

		return {
			body: posts
		};
	}
};

export const post = async ({ request }) => {
	const post = await request.json();

	const res = await fetch('http://localhost:5000/api/v1/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post)
	});

	return {
		body: await res.json()
	};
};
