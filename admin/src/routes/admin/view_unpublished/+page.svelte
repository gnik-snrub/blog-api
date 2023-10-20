<script>
  export let data
  const { filtered } = data
</script>
<p>All unpublished posts!</p>

{#each filtered as post }
  <a href={`/admin/${post._id}`}><p>{post.title}</p></a>
{/each}
