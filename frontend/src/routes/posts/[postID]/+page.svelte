<svelte:head>
  <title>{title}</title>
</svelte:head>

<script>
export let data
const { post, commentsData, postID } = data

export const title = post.title

let comments
commentsData.subscribe((val) => {
  comments = val
})

let usernameInput = ''
let contentInput = ''

async function handleSubmit(e) {
  e.preventDefault()
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${postID}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: usernameInput, content: contentInput})
  })
  if (response.ok) {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${postID}/comments`)
    const data = await response.json()
    commentsData.set(data)
  }

  usernameInput = ''
  contentInput = ''
}
</script>

<section>
  {#if Object.keys(post).length === 0}
    <span>Loading post...</span>
  {:else}
    <div id="post_title">
      <h2>{post.title}: </h2>
      <span>{post.date_yyyy_mm_dd}</span>
    </div>
    <span>{post.author}</span>
    <p>{post.content}</p>
  {/if}
  <h3>Comments:</h3>
  {#if Object.keys(comments).length === 0}
    <span>No comments found, but yours could be first!</span>
  {:else}
    {#if comments[0].timestamp !== undefined}
      {#each comments as comment}
        <span>{comment.timestamp_formatted} - {comment.username}: {comment.content}</span>
      {/each}
    {/if}
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <label for="username">Username: </label>
    <input type="text" name="username" placeholder="Username" bind:value={usernameInput}/>
    <div id="form-comment-row">
      <label for="username">Comment: </label>
      <input type="text" name="content" placeholder="Comment" bind:value={contentInput}/>
    </div>
    <div id="buttons">
      <button type="submit">Submit Comment</button>
      <a href="/posts">Back</a>
    </div>
  </form>
</section>

<style>
  section {
    display: flex;
    flex-flow: column;
    border-radius: 15px;
    background-color: white;
    color: black;
    padding: 10px 10%;
  }
  #post_title > * {
    display: inline;
    color: #4075a6;
  }
  h2 {
    margin: 0;
    font-weight: 700;
    font-size: 30px;
  }
  form {
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
  }
  #form-comment-row {
    width: 100%;
    display: flex;
  }
  #form-comment-row > input{
    flex: 1;
  }
  button {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }
  button:hover {
    text-decoration: underline;
  }
  a {
    color: black;
    padding: 0;
    margin: 0;
    text-align: center;
  }
  #buttons {
    width: 100%;
    margin-top: 0.7em;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
