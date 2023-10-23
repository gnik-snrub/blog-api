<script>
  export let data
  const { filtered } = data

  let items = filtered.map((item) => {
    return {item, showDeleteConfirmation: false}
  })

  function toggleDeleteConfirm(id) {
    items = items.map((item) => {
      return item.item._id === id ? {...item, showDeleteConfirmation: !item.showDeleteConfirmation} : item
    })
  }

  async function deletePost(id) {
    await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${id}`, {
      method: 'DELETE'
    })
    location.reload()
  }
</script>

<p>All published posts!</p>

<ul>
{#each items as {item, showDeleteConfirmation} }
  <li>
    {#if !showDeleteConfirmation}
      <button on:click={() => toggleDeleteConfirm(item._id)}>Delete</button>
      <a href={`/admin/post_${item._id}`}><p>{item.title} - {showDeleteConfirmation}</p></a>
    {:else}
      <button on:click={() => deletePost(item._id)}>Delete</button>
      <p>Are you sure you want to delete '{item.title}'?</p>
      <button on:click={() => toggleDeleteConfirm(item._id)}>Cancel</button>
    {/if}
  </li>
{/each}
</ul>

<style>
  li {
    width: 100%;
    display: grid;
    grid-template-columns: auto max-content auto;
    align-items: center;
    justify-content: start;
  }
  button {
    height: fit-content;
    margin: 0 2em;
  }
</style>
