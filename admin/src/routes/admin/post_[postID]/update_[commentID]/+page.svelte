
<h2>Update Comment!</h2>

<form on:submit|preventDefault={submitPost}>
  <button type="submit" id="submit">Submit updates</button>
  <label id="usernameInput">
    Username
    <input bind:value={username} type='text'/>
  </label>
  <label id="contentInput">
    Content
    <input bind:value={content} type='text'/>
  </label>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-template-areas:
              'username content'
              'submit .';
    grid-gap: 1em;
    width: 80%;
  }
  label {
    display: grid;
  }
  #submit {
    grid-area: submit;
  }
  #usernameInput {
    grid-area: username;
  }
  #contentInput {
    grid-area: content;
  }
  textarea {
    height: 200px;
    resize: none;
    background-color: #444A4B;
    padding: 1em;
  }
  input {
    height: min-content;
    background-color: #444A4B;
    padding: 1em;
  }
  button {
    width: max-content;
    height: min-content;
    background-color: transparent;
    font-size: 1em;
    transition: 0.3s;
  }
  button:hover {
    color: #24889e;
  }
  * {
    border: none;
    outline: none;
    color: #ebeef0;
  }
</style>
