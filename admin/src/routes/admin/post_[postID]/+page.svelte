<script>
  import {onDestroy, onMount} from 'svelte';
  import {authToken} from '/src/stores/authStore';
  import { loading, postsComments, fetchComments } from '/src/stores/comments'

  export let data
  const { post, postID } = data

  let comments = []

  onMount(async () => {
    await fetchComments(postID)
  })

  onDestroy(() => postsComments.set([]))

  $: {
    comments = $postsComments.map((comment) => {
      return {comment, showDeleteConfirmation: false}
    })
  }

  function toggleDeleteConfirm(id) {
    comments = comments.map((item) => {
      return item.comment._id === id ? {...item, showDeleteConfirmation: !item.showDeleteConfirmation} : item
    })
  }

  async function deletePost(id) {
    await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/posts/${post.id}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${$authToken}`
      }
    })
    location.reload()
  }
</script>

<h2>{post.title}</h2>
<p>{post.date_yyyy_mm_dd} - {post.author}</p>
<p>{post.isPublished ? 'Post has been published' : 'Post is currently unpublished'}</p>
<p>{post.content}</p>
<h3>Comments: </h3>
<ul>
  {#if $loading}
    <p>Loading comments...</p>
  {:else if comments.length}
    {#each comments as {comment, showDeleteConfirmation}}
      <li>
        <p>User: {comment.username}</p>
        <p>Timestamp: {comment.timestamp_formatted}</p>
        <p>Content: {comment.content}</p>
        {#if !showDeleteConfirmation}
          <button on:click={() => toggleDeleteConfirm(comment._id)}>Delete</button>
        {:else}
          <span>
            <button on:click={() => deletePost(comment._id)}>Delete</button>
            <p>Are you sure you want to delete this comment?</p>
            <button on:click={() => toggleDeleteConfirm(comment._id)}>Cancel</button>
          </span>
        {/if}
      </li>
    {/each}
  {:else}
    <p>No comments found</p>
  {/if}
</ul>
  <a href={`/admin/update_${postID}`}><p>Update Post</p></a>

<style>
  p {
    margin: 0;
  }
  li {
    margin-bottom: 1em;
  }
</style>
