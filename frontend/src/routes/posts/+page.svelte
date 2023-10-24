<svelte:head>
  <title>{title}</title>
</svelte:head>

<script>
export let data
const { posts } = data
export const title = 'The #1 Blog!'
</script>

{#if posts.length > 0}
  {#each posts as post}
    <div>
      <a href={`/posts/${post._id}`}>
        <h2>{post.title}: </h2>
        <span> {post.date_yyyy_mm_dd}</span>
      </a>
    </div>
  {/each}
{:else}
  <p>Loading...</p>
{/if}

<style>
  div {
    border-radius: 15px;
    background-color: white;
    color: black;
    margin-top: 20px;
    padding: 10px 10%;
  }
  a > * {
    display: inline;
  }
  h2 {
    margin: 0;
    font-weight: 700;
    color: #4075a6;
    font-size: 30px;
  }
</style>
