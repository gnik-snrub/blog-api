<script>
  import { goto } from '$app/navigation'
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
      body: data
    })
    const { id } = await response.json()
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
