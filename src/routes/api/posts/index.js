export const get = async ({ request }) => {
	const res = await fetch('http://localhost:5000/api/v1/posts', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${(userToken = null)}`
		}
	});

	if (res.ok) {
		const data = await res.json();

		return {
			body: data
		};
	}
};

export const post = async ({ request }) => {
	const { post, userToken } = await request.json();

	const res = await fetch('http://localhost:5000/api/v1/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		},
		body: JSON.stringify(post)
	});

	return {
		body: await res.json()
	};
};
