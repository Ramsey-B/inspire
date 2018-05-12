function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()

	// Use this getTodos function as your callback for all other edits
	function getTodos() {
		//FYI DONT EDIT ME :)
		todoService.getTodos(draw)
	}

	function draw(todos) {
		//todos == array
		//WHAT IS MY PURPOSE?
		//BUILD YOUR TODO TEMPLATE HERE
		var template = `
		<form class="form-inline" onsubmit="app.controllers.todoController.addTodoFromForm(event)" id="add-todo">
		<div class="form-group">
			<input type="text" class="form-control" name="todo" placeholder="add todo" />
			<button type="submit" class="btn btn-outline-primary" id="add-todo-btn">Add</button>
		</div>
		</form>`
		//DONT FORGET TO LOOP
		for (let i = 0; i < todos.length; i++) {
			const todo = todos[i];
			if (todo.completed) {
			template += `<form>
			<div>
				<input type="checkbox" onclick="app.controllers.todoController.toggleTodoStatus('${todo._id}')" checked>
				<label for="complete-task">${todo.description}</label>
				<button onclick="app.controllers.todoController.removeTodo('${todo._id}')">Delete</button>
			</div>
			</form>`
			} else {
				template += `<form>
			<div>
				<input type="checkbox" onclick="app.controllers.todoController.toggleTodoStatus('${todo._id}')">
				<label for="complete-task">${todo.description}</label>
				<button onclick="app.controllers.todoController.removeTodo('${todo._id}')">Delete</button>
			</div>
			</form>`
			}
		}
		document.getElementById('todo').innerHTML = template
	}

	this.addTodoFromForm = function (e) {
		e.preventDefault() // <-- hey this time its a freebie don't forget this
		// TAKE THE INFORMATION FORM THE FORM
		var form = e.target.todo.value
		var todo = {
			// DONT FORGET TO BUILD YOUR TODO OBJECT
			description: form
		}
		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		todoService.addTodo(todo, draw)
		//^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	this.toggleTodoStatus = function (todoId) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoId, draw)
		// YEP THATS IT FOR ME
	}

	this.removeTodo = function (todoId) {
		// ask the service to run the remove todo with this id
		todoService.removeTodo(todoId, draw)
		// ^^^^ THIS LINE OF CODE PROBABLY LOOKS VERY SIMILAR TO THE toggleTodoStatus
	}

	// IF YOU WANT YOUR TODO LIST TO DRAW WHEN THE PAGE FIRST LOADS WHAT SHOULD YOU CALL HERE???
	getTodos()
}
