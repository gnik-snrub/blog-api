export async function load({ fetch, params }) {
  const postResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}`)
  const postData = await postResponse.json()
  return { post: postData, postID: params.postID }
}
