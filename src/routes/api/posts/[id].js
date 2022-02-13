export const get = async ({ params }) => {
	const resourceUrl = `http://localhost:5000/api/v1/posts/${params.id}`;
	const res = await fetch(resourceUrl);

	if (res.ok) {
		const { post } = await res.json();

		return {
			body: post
		};
	}
};

export const del = async ({ params, request }) => {
	const resourceUrl = `http://localhost:5000/api/v1/posts/${params.id}`;

	const { userToken } = await request.json();

	const res = await fetch(resourceUrl, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		}
	});

	const resData = await res.json();

	return {
		status: res.status,
		body: resData
	};
};

export const patch = async ({ params, request }) => {
	const resourceUrl = `http://localhost:5000/api/v1/posts/${params.id}`;

	const { post, userToken } = await request.json();

	console.log(`Post: ${post}`);

	const res = await fetch(resourceUrl, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${userToken}`
		},
		body: JSON.stringify(post)
	});

	return {
		status: res.status,
		body: await res.json()
	};
};
