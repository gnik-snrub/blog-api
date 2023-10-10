import { fetchData } from '/src/lib/fetchData.js'
export async function load({ fetch }) {
  const posts = await fetchData(fetch, `${import.meta.env.VITE_API_DOMAIN}/api/posts/`)
  return { posts }
}
