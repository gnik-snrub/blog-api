export async function load({ fetch, params }) {
  const commentResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}/comments/${params.commentID}`)
  const commentData = await commentResponse.json()
  return { comment: commentData, postID: params.postID, commentID: params.commentID }
}
