<!--NOTE: Used for popup displaying asking user to sign in.-->
<script>
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	const modalStore = getModalStore();

	// Props
	/** Exposes parent props to this component. */
	export let parent;

	// Form Data
	const formData = {
		email: '',
		password: ''
	};

	let signupResult = '';

	let emailError = "";
    let passwordError = "";
	let isSendingRequest = false;
	let isFormValid = false;

	function onSignupRequest() {
        if (!validateEmail()) {
			const t = {
				message: 'Please enter a valid email address',
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(t);
            return;
        }

        if (!validatePassword()) {
			const t = {
				message: 'Please enter a valid password',
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(t);
            return;
        }

		isSendingRequest = true;
		if ($modalStore[0].response) $modalStore[0].response(formData);
	}

    function onAnonymousRequest() {
		isSendingRequest = true;
		$modalStore[0].response("ANON");
	}
    
    function onSocialRequest(socialTag) {
		isSendingRequest = true;
        $modalStore[0].response(socialTag);
    }

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';

    import CloseOutlineIcon from 'virtual:icons/carbon/close-outline';
    import GithubIcon from 'virtual:icons/mdi/github';
    import DiscordIcon from 'virtual:icons/cbi/discord';
    import TwitterIcon from 'virtual:icons/line-md/twitter';
	import ErrorIcon from 'virtual:icons/material-symbols/error-outline'

	import { ProgressBar } from '@skeletonlabs/skeleton';

	//#region Validation Helpers

    function validateEmail() {
        if (!formData.email) {
            emailError = "Email is required.";
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            emailError = "Please enter a valid email address.";
            return false;
        }

		// TODO: Check supabase if email is taken...
        emailError = "";
		isFormValid = !passwordError && !emailError;
        return true;
    }

    function validatePassword() {
        if (!formData.password) {
            passwordError = "Password is required.";
            return false;
        }
        if (formData.password.length < 8) {
            passwordError = "Password must be at least 8 characters long.";
            return false;
        }
        if (!/\d/.test(formData.password)) {
            passwordError = "Password must include at least one digit.";
            return false;
        }
        if (!/[a-zA-Z]/.test(formData.password)) {
            passwordError = "Password must include at least one letter.";
            return false;
        }
        passwordError = "";
		isFormValid = !passwordError && !emailError;
        return true;
    }
	//#endregion

	validateEmail()
	validatePassword()
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Sign Up</header>
		<article>Sign Up for a new account!</article>
        
		<label class="label">
			<span>Email</span>
			<input class="input" type="email" bind:value={formData.email} placeholder="Enter email address..." on:blur={validateEmail} />
			{#if emailError}<span class="chip variant-filled-error">{emailError}</span>{/if}
		</label>
		<blockquote class="blockquote">We recommend using an <a class="anchor" href="https://simplelogin.io/" target="_blank" rel="noopener">email aliasing service</a>!</blockquote>
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" bind:value={formData.password} placeholder="Enter password..." on:blur={validatePassword} />
			{#if passwordError}<span class="chip variant-filled-error">{passwordError}</span>{/if}
		</label>
		<blockquote class="blockquote">Don't worry! You will enter your username after you validate your email!</blockquote>


		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn variant-ghost-primary" disabled={!isFormValid} on:click={onSignupRequest}>
                Sign Up
            </button>
			<button class="btn variant-ghost-secondary" on:click={onAnonymousRequest}>
                Browse Anonymously
            </button>
			<button class="btn-icon btn-sm bg-initial close-btn" on:click={parent.onClose}>
                <CloseOutlineIcon/>
            </button>
		</footer>

	<!-- 
		NOTE: UI Elements that is originally used for signing up with other providers...
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
	-->

		{#if isSendingRequest }
			{#if signupResult}
				<aside class="alert variant-ghost">
					<div><ErrorIcon/></div>
					<div class="alert-message">
						<h3 class="h3">Error</h3>
						<p>{signupResult}</p>
					</div>
				</aside>
			{:else if !signupResult}
				<ProgressBar value={undefined} />
			{/if}
		{/if}

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