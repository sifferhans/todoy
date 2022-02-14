<script>
	export let checked;
</script>

<label>
	<input type="checkbox" {checked} on:change />
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#ffffff">
			<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
		</svg>
	</span>
	<slot />
</label>

<style>
	label {
		display: flex;
		position: relative;
	}
	
	input[type="checkbox"] {
		margin-left: 1px;
		margin-top: 1px;
		margin-right: 1.5em;
		height: 1.5em;
		width: 1.5em;
		flex-shrink: 0;
	}

	input[type="checkbox"] + span {
		height: 1.5em;
		width: 1.5em;
		position: absolute;
		top: 0;
		left: 0;
		background: var(--interface);
		transition: background 50ms ease-out;
		border-radius: .2em;
	}

	span > svg {
		display: none;
	}

	input[type="checkbox"]:checked + span {
		background: var(--accent);
	}

	input[type="checkbox"]:checked + span > svg {
		display: inline;
	}
</style>