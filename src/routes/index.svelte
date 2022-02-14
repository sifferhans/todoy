<script>
import { SvelteToast } from "@zerodevx/svelte-toast";
import TodoList from "../components/TodoList.svelte";
import TodoForm from "../components/TodoForm.svelte";
import ThemeButton from "../components/ThemeButton.svelte";
import TheFooter from "../components/TheFooter.svelte";
import { createTodos } from "../store.js";
import { browser } from "$app/env";

const storedTodos = browser && JSON.parse(localStorage.getItem("todos")) || []
const filteredTodos = storedTodos.filter(todo => new Date(todo.timestamp).getDate() >= new Date().getDate())
const todos = createTodos(filteredTodos);

const today = new Date(Date.now()).toLocaleDateString();
</script>

<svelte:head>
	<title>Todoy - A simple todo for today</title>
</svelte:head>
<header>
	<div>
		<div>
			<h1 tabindex="-1" class="title">Todays tasks</h1>
			<ThemeButton />
		</div>
		<p class="date">{today}</p>
	</div>
</header>
<TodoForm {todos} />
<main>
	<TodoList {todos} />
</main>
<TheFooter />
<SvelteToast options={{ reversed: true, intro: { y: 50 } }} />

<style>
header {
	background: var(--interface);
}

header > div {
	padding: 1.5rem;
	max-width: 800px;
	margin: 0 auto;
}

header > div > div {
	margin-top: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
}

main {
	padding: 0 1.5rem;
	max-width: 800px;
	margin: 0 auto;
}

.title {
	display: inline-block;
	margin-right: .5em;
}

.date {
	margin-top: .2em;
	letter-spacing: .5px;
}
</style>