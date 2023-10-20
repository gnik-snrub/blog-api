export async function load() {
  const apiResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/`)
  const data = await apiResponse.json()
  const filtered = data.filter(post => post.isPublished)
  return {filtered}
}
