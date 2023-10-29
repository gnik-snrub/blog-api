export async function load ({ fetch }) {
  const postsResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/`)
  const posts = await postsResponse.json()
  let comments = []
  for (let i = 0; i < posts.length; i++) {
    const postCommentsResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${posts[i]._id}/comments`)
    const postComments = await postCommentsResponse.json()
    comments = [...comments, ...postComments]
  }
  return { posts, comments }
}
