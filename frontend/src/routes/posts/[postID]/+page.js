export async function load({ params, fetch }) {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}`)
  const post = await response.json()
  return { post }
}
