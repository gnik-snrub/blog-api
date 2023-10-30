<script>
  import { goto } from '$app/navigation'
  import { authToken } from '/src/stores/authStore';
  import { fetchPosts } from '/src/stores/posts'

  let title, author, content = ''
  let isPublished = false

  async function submitPost() {
    const data = new URLSearchParams()
    data.append('title', title)
    data.append('author', author)
    data.append('content', content)
    data.append('isPublished', isPublished)

    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${$authToken}`
      }
    })
    const { id } = await response.json()
    await fetchPosts()
    goto(`/admin/post_${id}`)
  }
  function togglePublished() {
    isPublished = !isPublished
  }
</script>

<h2>New Post!</h2>

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
    <input on:change={togglePublished} type='checkbox'/>
  </label>
  <button type="submit">Submit Post</button>
</form>
