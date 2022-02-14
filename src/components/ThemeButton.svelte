<script>
	import { onMount } from "svelte";
	let currentTheme;

	onMount(() => {
		const theme = localStorage.getItem("theme") ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
		setTheme(theme);
	});

	function setTheme(theme){
		localStorage.setItem("theme", theme);
		document.body.setAttribute("data-theme", theme);
		currentTheme = theme;
	}

	function toggleTheme(){
		const newTheme = currentTheme != "dark" ? "dark" : "light";
		setTheme(newTheme);
	}
</script>

<svelte:head>
	<meta name="theme-color" content={currentTheme == "dark" ? "hsl(270 10% 15%)" : "hsl(270 20% 93%)"} />
</svelte:head>
<button on:click={toggleTheme}>
	{#if currentTheme != "dark"}
		<svg xmlns="http://www.w3.org/2000/svg" class="moon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
		</svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" class="sun" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>
	{/if}
</button>

<style>
button {
	border: none;
	background: transparent;
	padding-inline: 1em;
	height: auto;
	cursor: pointer;
	border-radius: 1em;
	outline-color: var(--accent);
}

svg {
	width: 1.8em;
	height: 1.8em;
}

.sun {
	color: white;
}
</style>