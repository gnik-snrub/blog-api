<script>
  import { authToken } from '../../stores/authStore'
  import { goto } from '$app/navigation'
  let username, password = ''

  async function handleSubmit() {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (response.ok) {
      const data = await response.json()
      authToken.set(data)
      goto('/admin')
    } else {
      console.error('There was a problem logging in')
    }
  }
</script>

<p>Login page!</p>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Username:
    <input bind:value={username} type="text" />
  </label>
  <label>
    Password:
    <input bind:value={password} type="password" />
  </label>
  <button type="submit">Login</button>
</form>
