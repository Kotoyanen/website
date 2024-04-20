<!--NOTE: Used for popup displaying asking user to sign in.-->
<script>
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		username: '',
		email: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onSignupRequest() {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

    function onAnonymousRequest() {
		$modalStore[0].response("ANON");
		modalStore.close();
	}
    
    function onSocialRequest(socialTag) {
        $modalStore[0].response(socialTag);
		modalStore.close();
    }

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

    import CloseOutlineIcon from 'virtual:icons/carbon/close-outline';
    import GithubIcon from 'virtual:icons/mdi/github';
    import DiscordIcon from 'virtual:icons/cbi/discord';
    import TwitterIcon from 'virtual:icons/line-md/twitter';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Sign Up</header>
		<article>Sign Up for a new account!</article>
        
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Username</span>
				<input class="input" type="text" bind:value={formData.username} placeholder="Enter username..." />
			</label>
			<label class="label">
				<span>Email</span>
				<input class="input" type="email" bind:value={formData.email} placeholder="Enter email address..." />
			</label>
		</form>

		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn variant-ghost-primary" on:click={onSignupRequest}>
                Sign Up
            </button>
			<button class="btn variant-ghost-secondary" on:click={onAnonymousRequest}>
                Browse Anonymously
            </button>
			<button class="btn-icon btn-sm bg-initial close-btn" on:click={parent.onClose}>
                <CloseOutlineIcon/>
            </button>
		</footer>

        <hr>
        <h4>Or continue with:</h4>
        <div class="social-buttons">
            <button class="btn-icon bg-initial" on:click={() => onSocialRequest("GITHUB")}>
                <GithubIcon/>
            </button>
            <button class="btn-icon bg-initial" on:click={() => onSocialRequest("TWITTER")}>
                <TwitterIcon/>
            </button>
            <button class="btn-icon bg-initial" on:click={() => onSocialRequest("DISCORD")}>
                <DiscordIcon/>
            </button>
        </div>

	</div>
{/if}

<style>
    .social-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-example-form {
        position: relative; /* Required for positioning the close button absolutely */
    }

    /* Used to adjust the close button to top-right of the modal. */
   .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>