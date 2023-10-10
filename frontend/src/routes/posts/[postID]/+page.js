import { writable } from 'svelte/store'
import { fetchData } from '/src/lib/fetchData.js'
export async function load({ fetch, params }) {
  const commentsData = writable([])
  const post = await fetchData(fetch, `${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}`)
  const fetchedComments = await fetchData(fetch, `${import.meta.env.VITE_API_DOMAIN}/api/posts/${params.postID}/comments`)
  commentsData.set(fetchedComments)
  if (commentsData.length === 0) {
    commentsData.set([{}])
  }
  return { post, commentsData, postID: params.postID }
}
