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
  <button type="submit" id="submit">Submit Post</button>
  <label id="publishCheckbox">
    Publish on submit?
    <input on:change={togglePublished} type='checkbox'/>
  </label>
  <label id="titleInput">
    Title
    <input bind:value={title} type='text'/>
  </label>
  <label id="authorInput">
    Author
    <input bind:value={author} type='text'/>
  </label>
  <label id="contentInput">
    Content
    <textarea bind:value={content} />
  </label>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-template-areas:
              'submit publish'
              'title author'
              'content content';
    grid-gap: 1em;
    width: 80%;
  }
  label {
    display: grid;
  }
  #publishCheckbox {
    grid-area: publish;
    display: flex;
    align-items: center;
  }
  #submit {
    grid-area: submit;
  }
  #titleInput {
    grid-area: title;
  }
  #authorInput {
    grid-area: author;
  }
  #contentInput {
    grid-area: content;
  }
  textarea {
    height: 200px;
    resize: none;
    background-color: #444A4B;
    padding: 1em;
  }
  input {
    height: min-content;
    background-color: #444A4B;
    padding: 1em;
  }
  button {
    width: max-content;
    height: min-content;
    background-color: transparent;
    font-size: 1em;
    transition: 0.3s;
  }
  button:hover {
    color: #24889e;
  }
  * {
    border: none;
    outline: none;
    color: #ebeef0;
  }
</style>
