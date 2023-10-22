<script>
  export let data
  const { post, comments } = data
</script>

<h2>{post.title}</h2>
<p>{post.date_yyyy_mm_dd} - {post.author}</p>
<p>{post.isPublished ? 'Post has been published' : 'Post is currently unpublished'}</p>
<p>{post.content}</p>
<h3>Comments: </h3>
<ul>
{#each comments as comment}
  <li>
    <p>User: {comment.username}</p>
    <p>Timestamp: {comment.timestamp_formatted}</p>
    <p>Content: {comment.content}</p>
  </li>
{/each}
</ul>

<style>
  p {
    margin: 0;
  }
  li {
    margin-bottom: 1em;
  }
</style>
