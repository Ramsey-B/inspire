function TodoService() {
	// A local copy of your todos
	var todoList
	var baseUrl = 'https://bcw-sandbox.herokuapp.com/api/ramsey/todos'

	function logError(err) {
		alert('Something went wrong! Try again!')
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getTodos = function (draw) {
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				todoList = res.data
				draw(res.data)
			})
			.fail(logError)
	}

	this.addTodo = function (todo, cb) {
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function(res){ // <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				todoList.push(res.data)
				cb(todoList)//reduces trips to api
			}) 
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoId,cb) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList

		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed

		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		var toggle
		for(var i=0; i<todoList.length; i++) {
			var item = todoList[i]
			if(item._id == todoId) {
				item.completed = !item.completed
				toggle = item
			}
		}
		var toggleComplete = {
			completed: toggle.completed
		}
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + todoId,
			data: JSON.stringify(toggleComplete)
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
				cb(todoList)//again, draw used to reduce api visits
			})
			.fail(logError)
	}

	this.removeTodo = function (todoId, cb) {
		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETe
		for (let i = 0; i < todoList.length; i++) {
			const item = todoList[i];
			if (item._id == todoId) {
				todoList.splice([i], 1)
			}
		}
		$.ajax({
			method: "DELETE",
			url: baseUrl + '/' + todoId,
			success: cb(todoList)//had strange errors with .then()
		}).fail(logError)
	}

}
