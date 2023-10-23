export async function load({ fetch, params }) {
  const postResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}`)
  const postData = await postResponse.json()
  const commentsResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}/comments`)
  const commentsData = await commentsResponse.json()
  return { post: postData, comments: commentsData, postID: params.postID }
}
