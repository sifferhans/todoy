<script>
	import TodoItem from "./TodoItem.svelte";
	export let todos;

	function toggleTodo(event){
		todos.toggle(event.detail.todo)
	}

	function removeTodo(event){
		todos.remove(event.detail.todo)
	}
</script>

<ul>
	{#each $todos.sort((a,b) => a.timestamp - b.timestamp) as todo, i (i)}
		<TodoItem {todo} on:toggle={toggleTodo} on:delete={removeTodo} />
	{/each}
</ul>

<style>
ul {
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 1em;
}
</style>