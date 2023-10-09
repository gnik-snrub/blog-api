<script>
export let data
const { posts } = data
</script>

<main>
  {#if posts.length > 0}
    {#each posts as post}
      {#if !post.isPublished}
        <div>
          <a href={`/posts/${post._id}`}><h3>{post.title} - {post.date_yyyy_mm_dd}</h3></a>
          <span>{post.content}</span>
        </div>
      {/if}
    {/each}
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  main {
    width: 50%;
    margin: 0 auto;
  }
  div {
    border-radius: 15px;
    background-color: white;
    color: black;
    margin-top: 20px;
    padding: 10px 10%;
  }
  h3 {
    margin: 0;
    margin-bottom: 0.5em;
    color: #4075a6;
    font-size: 30px;
  }
</style>
