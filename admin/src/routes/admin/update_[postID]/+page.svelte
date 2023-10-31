<h2>Update Post!</h2>

<form on:submit|preventDefault={submitPost}>
  <label>
    Title
    <input bind:value={title} type='text'/>
  </label>
  <label>
    Author
    <input bind:value={author} type='text'/>
  </label>
  <label>
    Content
    <input bind:value={content} type='textarea'/>
  </label>
  <label>
    Publish on submit?
    <input bind:checked={isPublished} onclick={togglePublished} type='checkbox'/>
  </label>
  <button type="submit">Update Post</button>
</form>
