export async function load({ params }) {
  const post = params.postID
  return {
    data: {
      post
    }
  }
}
