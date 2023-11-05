<script>
  import {onMount} from 'svelte';
  import {authToken} from '/src/stores/authStore';

  import { publishedPosts, fetchPosts } from '/src/stores/posts'

  let items = []

  onMount(async () => {
    await fetchPosts()
  })

  $: {
    items = $publishedPosts.map((item) => {
      return {item, showDeleteConfirmation: false}
    })
  }

  function toggleDeleteConfirm(id) {
    items = items.map((item) => {
      return item.item._id === id ? {...item, showDeleteConfirmation: !item.showDeleteConfirmation} : item
    })
  }

  async function deletePost(id) {
    await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${$authToken}`
      }
    })
    await fetchPosts()
  }
</script>

<div id="titleWrapper">
  <h2>All published posts!</h2>
</div>

<ul>
{#each items as {item, showDeleteConfirmation} }
  <li>
    {#if !showDeleteConfirmation}
      <button on:click={() => toggleDeleteConfirm(item._id)}>Delete</button>
      <a href={`/admin/post_${item._id}`}><p>{item.title}</p></a>
    {:else}
      <button on:click={() => deletePost(item._id)}>Delete</button>
      <p>Are you sure you want to delete '{item.title}'?</p>
      <button on:click={() => toggleDeleteConfirm(item._id)}>Cancel</button>
    {/if}
  </li>
{/each}
</ul>

<style>
  #titleWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  h2 {
    border-bottom: 3px solid #24889e;
    width: fit-content;
    padding: 0 1em;
    padding-bottom: 0.2em;
  }
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
    background-color: transparent;
    font-size: 1em;
    transition: 0.3s;
    color: #ebeef0;
    border: none;
    outline: none;
  }
  button:hover {
    color: #24889e;
  }
</style>
