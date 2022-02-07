export const post = async ({ request }) => {
	const user = await request.json();

	const res = await fetch('http://localhost:5000/api/v1/user/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});

	return {
		body: await res.json()
	};
};
