function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()
	var name
	var date = new Date()
    var hour = date.getHours()

	// Use this getTodos function as your callback for all other edits
	function getTodos() {
		//FYI DONT EDIT ME :)
		debugger
		todoService.getTodos(draw, name)
	}

	function drawGreet () {
		if(hour < 12) {
			document.getElementById('greeting').innerHTML = `<h3>Good Morning, ${name}</h3>`
		} else {
			document.getElementById('greeting').innerHTML = `<h3>Good Evening, ${name}</h3>`
		}
	}

	function draw(todos) {
		//todos == array
		//WHAT IS MY PURPOSE?
		//BUILD YOUR TODO TEMPLATE HERE
		var template = ''
		//DONT FORGET TO LOOP
		for (let i = 0; i < todos.length; i++) {
			const todo = todos[i];
			if (todo.completed) {
			template += `<form>
			<div>
				<input type="checkbox" onclick="app.controllers.todoController.toggleTodoStatus('${todo._id}')" checked>
				<label for="complete-task" class="completed"><strike>${todo.description}</strike></label>
				<button onclick="app.controllers.todoController.removeTodo('${todo._id}')" class="btn btn-outline-danger delete"><i class="fas fa-times"></i></button>
			</div>
			</form>`
			} else {
				template += `<form>
			<div>
				<input type="checkbox" onclick="app.controllers.todoController.toggleTodoStatus('${todo._id}')">
				<label for="completed-task" class="incomplete">${todo.description}</label>
				<button onclick="app.controllers.todoController.removeTodo('${todo._id}')" class="btn btn-outline-danger delete"><i class="fas fa-times"></i></button>
			</div>
			</form>`
			}
		}
		template += `
		<form class="form-inline" onsubmit="app.controllers.todoController.addTodoFromForm(event)" id="add-todo">
		<div class="form-group">
			<input type="text" class="form-control" name="todo" placeholder="add todo" />
			<button type="submit" class="btn btn-outline-success" id="add-todo-btn">Add</button>
		</div>
		</form>`
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
		todoService.addTodo(todo, draw, name)
		//^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	this.addName = function (e) {
		e.preventDefault()
		name = e.target.user.value
		drawGreet()
		getTodos()
	}

	this.toggleTodoStatus = function (todoId) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoId, draw, name)
		// YEP THATS IT FOR ME
	}

	this.removeTodo = function (todoId) {
		// ask the service to run the remove todo with this id
		todoService.removeTodo(todoId, draw, name)
		// ^^^^ THIS LINE OF CODE PROBABLY LOOKS VERY SIMILAR TO THE toggleTodoStatus
	}

	// IF YOU WANT YOUR TODO LIST TO DRAW WHEN THE PAGE FIRST LOADS WHAT SHOULD YOU CALL HERE???
	getTodos()
}
