import { fetchData } from '/src/lib/fetchData.js'
export async function load() {
  const posts = await fetchData(`${import.meta.env.VITE_API_DOMAIN}/api/posts/`)
  return { posts }
}
