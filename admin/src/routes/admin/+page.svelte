<script>
  export let data
  const { posts, comments } = data
  let postCount = posts.length
  let averageComments = comments.length / postCount
</script>

<p>There are {postCount} posts with an average of {averageComments} comments per post!</p>
