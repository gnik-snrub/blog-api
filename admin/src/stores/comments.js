import { writable } from 'svelte/store'

export const postsComments = writable([])
export const loading = writable(true)

export async function fetchComments(postID) {
  loading.set(true)
  const commentsResponse = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${postID}/comments`)
  const commentsData = await commentsResponse.json()
  postsComments.set(commentsData)
  loading.set(false)
}
