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
		username: '',
		email: '',
		password: ''
	};

	let usernameError = "";
	let emailError = "";
    let passwordError = "";

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

		if ($modalStore[0].response) $modalStore[0].response(formData);
	}

    function onAnonymousRequest() {
		$modalStore[0].response("ANON");
	}
    
    function onSocialRequest(socialTag) {
        $modalStore[0].response(socialTag);
    }

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

    import CloseOutlineIcon from 'virtual:icons/carbon/close-outline';
    import GithubIcon from 'virtual:icons/mdi/github';
    import DiscordIcon from 'virtual:icons/cbi/discord';
    import TwitterIcon from 'virtual:icons/line-md/twitter';

	//#region Validation Helpers
	function validateUsername() {
		if (!formData.username) {
            usernameError = "Username is required.";
            return false;
        }

		if (formData.username.length < 4) {
			usernameError = "Username must be at least 4 characters long!";
            return false;
		}

		// TODO: Check supabase if username is taken...
		usernameError = "";
		return true;
	}

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
        return true;
    }
	//#endregion

	let validEmail = validateEmail()
	let validPassword = validatePassword()
	let validUsername = validateUsername()
	$: isFormValid = validEmail && validPassword && validUsername;
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
				<input class="input" type="text" bind:value={formData.username} placeholder="Enter username..." on:blur={validateUsername} />
				{#if usernameError}<span class="chip variant-filled-error">{usernameError}</span>{/if}
			</label>
			<label class="label">
				<span>Email</span>
				<input class="input" type="email" bind:value={formData.email} placeholder="Enter email address..." on:blur={validateEmail} />
				{#if emailError}<span class="chip variant-filled-error">{emailError}</span>{/if}
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" bind:value={formData.password} placeholder="Enter password..." on:blur={validatePassword} />
				{#if passwordError}<span class="chip variant-filled-error">{passwordError}</span>{/if}
			</label>
		</form>

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