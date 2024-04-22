<script>
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	import Cookies from 'js-cookie'
	import { Avatar } from '@skeletonlabs/skeleton';

	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { supabase } from '$lib/supabaseClient'

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import IconGithub from 'virtual:icons/mdi/github';

	let currentDisplayName = undefined;

//#region Sign Up Controller
	import emailSignupService from '$lib/services/signup/emailSignupService'
	import SignupFormModal from '$lib/components/modals/SignupFormModal.svelte';
	const signupModalComponent = { ref: SignupFormModal };

	function handleSignupRequest(requestHeader) {
		if ($modalStore[0]) $modalStore[0].signupResult = '';
		if (requestHeader === undefined || !requestHeader) {
			return;
		}

		if (requestHeader === "ANON") {
			// TODO: Signup anonymously...
			return;
		}

		let email = requestHeader.email;
		let password = requestHeader.password;
		emailSignupService(email, password, supabase).then((result) => {
			if (!result) {
				if ($modalStore[0]) $modalStore[0].signupResult = "Failed to sign up! Try again or contact admin!";
				return;
			}

			modalStore.close()
			const t = {
				message: 'Almost there! Check your inbox to validate your account!',
				timeout: 7500
			};			
			toastStore.trigger(t);
		})
	}
//#endregion

	supabase.auth.getSession().then(async (response) => {
		if (response.error) {
			console.error("Failed to get current session :: " + response.error.message)
			return;
		}

		const session = response.session;
		if (session == undefined || session == null){
			return;
		}

		// User is logged in with session, fetch display name...
		console.log("Fetched Session Successfully")
		console.log(session)

		currentDisplayName = Cookies.get("username")
		if (currentDisplayName != undefined) {
			return;
		}

		// Display name not set in cookie, attempt to get it from database, then set it in cookie...
		const { rpcData, rpcError } = await supabase.rpc('getaccountinformation', { account_id: data.id })
		if (rpcError) {
			console.error("Failed to get current user information :: " + error.message)
			return;
		}

		console.log("User information fetched Successfully")
		console.log(rpcData)
	})
</script>

<Toast />
<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Kotoyanen</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn-icon btn-sm bg-initial"
					href="https://github.com/Kotoyanen/website"
					target="_blank"
					rel="noreferrer"
				>
					<IconGithub />
				</a>
				{#if currentDisplayName == undefined}
					<!--User is currently not logged in; Display signup/login button...-->
					<!--Signup Button-->
					<button
						class="btn btn-sm variant-ghost-surface"
						on:click={() => {
							const modal = {
								type: 'component',
								component: signupModalComponent,
								// TODO: Handle proper signup
								response: (response) => handleSignupRequest(response),
							};
							modalStore.trigger(modal)
						}}
					>
						Sign Up
					</button>
					<button
						class="btn btn-sm variant-ghost-secondary"
						on:click={() => {
							const modal = {
								type: 'component',
								component: signupModalComponent,
								// TODO: Handle proper signup
								response: (response) => console.log('response:', response)
							};
							modalStore.trigger(modal)
						}}
					>
						Login
					</button>
				{:else}
					<!--TODO: Replace with profile URL...-->
					<Avatar src={undefined} initials={currentDisplayName.substring(0, 2)} />
					<h4 class="h4">{currentDisplayName}</h4>
				{/if}
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
