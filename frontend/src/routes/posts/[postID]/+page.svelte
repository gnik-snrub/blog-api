<script>
export let data
const { post, comments } = data
</script>

<section>
{#if Object.keys(post).length === 0}
  <span>Loading post...</span>
{:else}
  <h3>{post.title} - {post.date_yyyy_mm_dd}</h3>
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
  form {
    display: flex;
    flex-direction: column;
  }
  section {
    display: flex;
    flex-flow: column;
    width: 50%;
    margin: 0 auto;
    border-radius: 15px;
    background-color: white;
    color: black;
    padding: 10px 0;
  }
  h3 {
    margin: 0;
    margin-bottom: 0.5em;
    color: #4075a6;
    font-size: 30px;
  }
  section > * {
    width: 80%;
    margin-left: 10%;
  }
  a {
    padding: 0;
    margin: 0;
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
</style>
