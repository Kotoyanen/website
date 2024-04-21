<script>
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import SignupFormModal from '$lib/components/modals/SignupFormModal.svelte';
	const signupModalComponent = { ref: SignupFormModal };

	initializeStores();
	const modalStore = getModalStore();

	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

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
				<!--Signup Button-->
				<button
					class="btn btn-sm variant-ghost-surface"
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
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
