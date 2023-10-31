<script>
  import { onMount } from 'svelte';

  import './styles.css';
  import { fetchPosts } from '/src/stores/posts'

  onMount(async () => {
    await fetchPosts()
  })

</script>

<svelte:head>
  <title>Admin Dashboard: The #1 Blog!</title>
</svelte:head>

<div class="app">
  <nav>
    <div id="nav_heading_wrapper">
      <h1>Admin</h1>
      <h1>Dashboard</h1>
    </div>
    <ul id="nav_list">
      <li class="nav_item"><a href="/admin">Home</a></li>
      <li class="nav_item"><a href="/admin/new_post">Create a new post</a></li>
      <li class="nav_item"><a href="/admin/view_published">View all published posts</a></li>
      <li class="nav_item"><a href="/admin/view_unpublished">View all unpublished posts</a></li>
    </ul>
  </nav>
	<main>
    <slot />
	</main>
</div>

<style>
  nav {
    color: #24889e;
  }
  #nav_heading_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2em 0;
  }
  h1 {
    text-align: center;
    padding: 0;
    margin: 0 0.3em;
  }
  li {
    margin-top: 1em;
  }
</style>
