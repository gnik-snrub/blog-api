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
  {#if Object.keys(comments).length === 0}
    <span>Loading comments...</span>
  {:else}
    {#if comments[0].timestamp !== undefined}
      <h5>Comments:</h5>
      {#each comments as comment}
        <span>{comment.timestamp} - {comment.username}: {comment.content}</span>
      {/each}
    {:else}
      <h5>No Comments</h5>
    {/if}
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" name="username" placeholder="Username" bind:value={usernameInput}/>
      <input type="text" name="content" placeholder="Comment" bind:value={contentInput}/>
      <button type="submit">Submit</button>
    </form>
  {/if}
    <a href="/posts">Back</a>
</section>

<style>
  section {
    display: flex;
    flex-flow: column;
    border-radius: 15px;
    border: 1px solid #4075a6;
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
    display: flex;
    flex-direction: column;
  }
  a {
    padding: 0;
    margin: 0;
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
</style>
