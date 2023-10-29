<script>
  import { goto } from '$app/navigation'
  import { browser } from '$app/environment'

  import { authToken } from '../../stores/authStore'
  import LoginPage from '../login/+page.svelte'

  let showContent = false

  $: {
    if ($authToken) {
      showContent = true
    } else if (browser){
      goto('/login')
    }
  }
</script>

{#if showContent}
  <slot/>
{:else}
  <LoginPage />
{/if}
