import { fetchData } from '/src/lib/fetchData.js'
export async function load({ params }) {
  const post = await fetchData(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}`)
  const comments = await fetchData(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}/comments`)
  if (comments.length === 0) {
    comments.push({})
  }
  return { post, comments }
}
