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
    await fetchComments(postID)
  }
</script>

<div id="titleWrapper">
  <h2>{post.title}</h2>
</div>
<p>{post.date_yyyy_mm_dd} - {post.author}</p>
<p>{post.isPublished ? 'Post has been published' : 'Post is currently unpublished'}</p>
<div id="content">
  <h3>Content: </h3>
  <p>{post.content}</p>
</div>
<a href={`/admin/update_${postID}`}><p>Update Post</p></a>
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
        <span class="deleteCommentWrapper">
          {#if !showDeleteConfirmation}
            <button on:click={() => toggleDeleteConfirm(comment._id)}>Delete</button>
          {:else}
              <button on:click={() => deletePost(comment._id)}>Delete</button>
              <p>Are you sure you want to delete this comment?</p>
              <button on:click={() => toggleDeleteConfirm(comment._id)}>Cancel</button>
          {/if}
        </span>
      </li>
    {/each}
  {:else}
    <p>No comments found</p>
  {/if}
</ul>

<style>
  #titleWrapper {
    width: 100%;
    display: flex;
  }
  h2 {
    border-bottom: 3px solid #24889e;
    width: fit-content;
    padding: 0 1em;
    padding-bottom: 0.2em;
  }
  #content {
    margin-top: 1em;
    width: 70%;
    margin-bottom: 2em;
  }
  #content > h3 {
    border-bottom: 1px solid #24889e;
    width: 5em;
    text-align: center;
  }
  #content > p {
    margin-left: 1em;
  }
  p {
    margin: 0;
  }
  a > p {
    margin-top: 1em;
  }
  li {
    margin-bottom: 1em;
  }
  .deleteCommentWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.3em;
  }
  .deleteCommentWrapper > p {
    margin: 0 1em;
  }
  button {
    height: fit-content;
    background-color: transparent;
    font-size: 1em;
    padding: 0;
    transition: 0.3s;
    color: #ebeef0;
    border: none;
    outline: none;
  }
  button:hover {
    color: #24889e;
  }
</style>
