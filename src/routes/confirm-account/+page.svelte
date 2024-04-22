<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let confirmationUrl = '';

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        confirmationUrl = params.get('confirmation_url');
    });

    function handleConfirm() {
        window.open(confirmationUrl, '_blank');
        goto('/?from_confirmation=true');
    }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
        {#if !confirmationUrl}
            <h2 class="h2">Looks like you aren't supposed to be here!</h2>
            <p>Are you lost? Lets go back <a class="anchor" href="/">home</a>.</p>
        {:else}
            <h2 class="h2">Almost there!</h2>
            <div class="glowing-element"></div>
            <button type="button" class="btn btn-xl variant-ghost-primary" on:click={handleConfirm} disabled={!confirmationUrl}>
                Confirm Your Account
            </button>
        {/if}
	</div>
</div>

<style lang="postcss">
	.glowing-element {
		@apply w-64 h-64 md:w-32 md:h-32;
	}
	.glowing-element {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
