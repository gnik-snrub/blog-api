export async function load({ fetch }) {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts`)
  const posts = await response.json()
  return { posts }
}
