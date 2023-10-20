<script>
  export let data
  const { post, comments, postID } = data
</script>

<h1>{postID}</h1>
<div>{JSON.stringify(post)}</div>
  <div>{JSON.stringify(comments)}</div>
