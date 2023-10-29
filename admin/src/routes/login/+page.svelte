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
