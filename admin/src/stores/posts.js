import { writable } from 'svelte/store'

export const publishedPosts = writable([])
export const unpublishedPosts = writable([])

export async function fetchPosts() {
  const published = []
  const unpublished = []
  const apiResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/`)
  const data = await apiResponse.json()
  data.forEach((post) => {
    post.isPublished ? published.push(post) : unpublished.push(post)
  })
  if (published !== publishedPosts) publishedPosts.set(published)
  if (unpublished !== unpublishedPosts) unpublishedPosts.set(unpublished)
}
