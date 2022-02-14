<script>
	import { fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { createEventDispatcher } from "svelte";
	import Checkbox from "./Checkbox.svelte";

	const dispatch = createEventDispatcher();
	export let todo;
</script>

<li transition:fly={{y: -20, duration: 300, easing: cubicOut}}>
	<Checkbox on:change={dispatch("toggle", {todo})} bind:checked={todo.done}>
		<div>
			<span>{todo.title}</span>
			{#if todo.tag}
			<small>{todo.tag}</small>
			{/if}
		</div>
	</Checkbox>
</li>

<style>
li {
	list-style: none;
	line-height: 1.5em;
	margin-bottom: .5em;
	display: flex;
	align-items: flex-start;
}

span {
	display: block;
}

small {
	color: var(--accent);
	display: inline-block;
	padding: 0 .5em;
	border-radius: .5em;
	margin-top: .3em;
	background: hsla(var(--hue) 100% 50% / .1);
}
</style>