import { writable } from "svelte/store";

export const createTodos = (initialTodos = []) => {
	const { subscribe, update } = writable(initialTodos);

	return {
		subscribe,
		add(title, tag){
			const todo = {
				timestamp: Date.now(),
				title,
				tag,
				done: false
			};
			update(prev => {
				localStorage.setItem("todos", JSON.stringify([...prev, todo]))
				return [...prev, todo]
			});
		},
		remove(todo){
			update(prev => {
				const p = prev.filter(t => t !== todo)
				localStorage.setItem("todos", JSON.stringify(p))
				return p
			})
		},
		toggle(todo){
			this.remove(todo)
			todo.done = !todo.done

			update(prev => {
				localStorage.setItem("todos", JSON.stringify([...prev, todo]))
				return prev.concat(todo)
			})
		},
		clear(){
			update(prev => {
				localStorage.setItem("todos", JSON.stringify([]))
				return []
			})
		}
	}
}