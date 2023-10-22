<p>New Post!</p>
<script>
  let title, author, content = ''
  let isPublished = false
  async function submitPost() {
  function togglePublished() {
  }
</script>

<h2>New Post!</h2>

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
    <input on:change={togglePublished} type='checkbox'/>
  </label>
  <button type="submit">Submit Post</button>
</form>
