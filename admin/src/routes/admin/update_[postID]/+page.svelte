<script>
  import { goto } from '$app/navigation'
  import { authToken } from '/src/stores/authStore';
  import { fetchPosts } from '/src/stores/posts'

  export let data
  const { post, postID, fetch } = data

  let title = post.title
  let author = post.author
  let content = post.content
  let isPublished = post.isPublished

  async function submitPost() {
    const data = new URLSearchParams()
    data.append('title', title)
    data.append('author', author)
    data.append('content', content)
    data.append('isPublished', isPublished)

    await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${postID}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${$authToken}`
      }
    })

    await fetchPosts()
    goto(`/admin/post_${postID}`)
  }

  function togglePublished() {
    isPublished = !isPublished
  }
</script>

<h2>Update Post!</h2>

<form on:submit|preventDefault={submitPost}>
  <label>
    Title
    <input bind:value={title} type='text'/>
  </label>
  <label>
    Author
    <input bind:value={author} type='text'/>
  </label>
  <label>
    Content
    <input bind:value={content} type='textarea'/>
  </label>
  <label>
    Publish on submit?
    <input bind:checked={isPublished} onclick={togglePublished} type='checkbox'/>
  </label>
  <button type="submit">Update Post</button>
</form>
