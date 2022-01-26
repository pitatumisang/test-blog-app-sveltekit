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
