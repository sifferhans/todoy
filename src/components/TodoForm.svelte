<script>
	import { toast } from "@zerodevx/svelte-toast";
import { onMount } from "svelte";

	export let todos;
	let todoValue = "";

	function addTodo(){
		if(todoValue.startsWith("/")){
			executeCommand(todoValue)
			todoValue = ""
			return
		}
		
		let tag = null;
		if(todoValue.startsWith("[")) {
			const regex = /(?<tag>\[[\s\S]+\])/;
			const tagMatch = todoValue.match(regex).groups["tag"];
			tag = tagMatch.substring(1, tagMatch.length-1);
			todoValue = todoValue.slice(todoValue.indexOf("]")+1, todoValue.length).trim();
		}
		if(!todoValue) return;
			
		todos.add(todoValue, tag);
		todoValue = "";
	}

	function executeCommand(command){
		switch(command){
			case("/clear"):
				todos.clear()
				break
			default:
				toast.push("Unknown command", {
					theme: {
						"--toastBackground": "var(--error)",
						"--toastColor": "white",
						"--toastBarBackground": "rgb(255 255 255 / 0.5)"
					}
				})
		}
	}

	onMount(() => {
		if(!$todos.length)
			document.getElementById("task-input").focus();
	});
</script>

<form on:submit|preventDefault={addTodo}>
	<div>	
		<label for="task-input">New todo</label>
		<input type="text" id="task-input" name="title" bind:value={todoValue}>
		<button type="submit" aria-label="Add todo" title="Add todo">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
			</svg>
		</button>
		{#if !$todos.length}
		<span><span class="hint">Hint:</span> You can use [tags]</span>
		{/if}
	</div>
</form>

<style>
form {
	background: linear-gradient(var(--background), rgba(255,255,255,0));
	padding: 1.5em;
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	position: sticky;
	top: 0;
	z-index: 9;
}

form > div {
	position: relative;
	width: 100%;
}

form > div > span {
	position: absolute;
	left: 0;
	bottom: -2em;
	transition: opacity .2s ease-out, bottom .2s ease-out;
	opacity: 0;
	pointer-events: none;
}

label[for="task-input"] {
	position: absolute;
	opacity: 0;
	pointer-events: none;
}

form:focus-within > div > span {
	bottom: -2.5em;
	opacity: 1;
}

.hint {
	padding: .2em .5em;
	border-radius: .5em;
	background: var(--interface);
}

input {
	width: 100%;
	appearance: none;
	border-radius: .5rem;
	border: 2px solid var(--interface);
	padding: 1em;
	font-size: inherit;
	background: var(--interface);
	color: inherit;
	transition: outline 75ms ease-out;
}

input:focus-visible {
	--transparency: .1 !important;
	outline: solid 3px var(--accent);
	outline-offset: 2px;
}

button[type="submit"] {
	padding: .5em;
	border-radius: .25rem;
	border: none;
	background: transparent;
	color: var(--text);
	display: grid;
	place-items: center;
	position: absolute;
	top: 50%;
	right: .6em;
	transform: translateY(-50%);
}

button[type="submit"]:hover,
button[type="submit"]:focus-visible {
	background: var(--interface-contrast);
	color: var(--text-contrast);
	outline: none;
}

svg {
	width: 1.8em;
	height: 1.8em;
}
</style>