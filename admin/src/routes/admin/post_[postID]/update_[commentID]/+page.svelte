<script>
  import { goto } from '$app/navigation'
  import { authToken } from '/src/stores/authStore';
  import { fetchComments } from '/src/stores/comments'

  export let data
  const { comment, postID, commentID } = data
  
  let username = comment.username
  let content = comment.content

  async function submitPost() {
    const data = new URLSearchParams()
    data.append('username', username)
    data.append('content', content)

    await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${postID}/comments/${commentID}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${$authToken}`
      }
    })

    await fetchComments(postID)
    goto(`/admin/post_${postID}`)
  }

</script>

<h2>Update Comment!</h2>

<form on:submit|preventDefault={submitPost}>
  <button type="submit" id="submit">Submit updates</button>
  <label id="usernameInput">
    Username
    <input bind:value={username} type='text'/>
  </label>
  <label id="contentInput">
    Content
    <input bind:value={content} type='text'/>
  </label>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-template-areas:
              'username content'
              'submit .';
    grid-gap: 1em;
    width: 80%;
  }
  label {
    display: grid;
  }
  #submit {
    grid-area: submit;
  }
  #usernameInput {
    grid-area: username;
  }
  #contentInput {
    grid-area: content;
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
