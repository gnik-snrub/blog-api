<script>
  export let data
  let post = {}
  async function fetchPosts() {
    fetch(`http://localhost:3000/api/posts/${data.data.post}`)
    .then(res => res.json())
    .then(data => {
      post = data
    })
  }
  fetchPosts()
</script>

{#if Object.keys(post).length === 0}
  <span>Loading...</span>
{:else}
  <h1>{post.title}</h1>
  <span>{post.author} - {post.date_yyyy_mm_dd}</span>
  <div>{post.content}</div>
{/if}
  <a href="/posts">Back</a>
