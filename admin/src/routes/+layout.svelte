<script>
  import './styles.css';
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
  .app {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 20% auto;
    font-family: Arial, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
;
  }
  main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
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
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #ebeef0;
  }
  li {
    margin-top: 1em;
  }
</style>
