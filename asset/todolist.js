/*todo
* innerHTML + = todo 로 처리했던 부분 insertAdjacentHTML 로 바꾸기 // Done
* 등록한 할 일을 완료 처리하기 //Done
*  - 이벤트 할당하기
*  - class추가하기(li에 completed)
* 삭제하기 
*  - 이벤트 할당하기
*  - li을 서서히 사라지게 처리한 후 삭제
* 등록하기
*  - 애니메이션 기능을 추가
*/

$(document).ready(function () {
	$("#new-todo").on("keydown", addTodo);
	$("#todo-list").on("click", "input", completeTodo);
	$("#todo-list").on("click", "button", deleteTodo);

	function addTodo(ev) {
		var ENTER_KEYCODE = 13;
		if(ev.keyCode === ENTER_KEYCODE) {
			var todo = makeTodoList(ev.target.value);
			var todoList = document.getElementById("todo-list"); 
			todoList.insertAdjacentHTML('beforeend', todo);
			ev.target.value = "";
		}
	}

	function makeTodoList(todo) {
		var source = document.getElementById("todo-template").innerHTML;
		var template = Handlebars.compile(source);
		var context = {todoTitle: todo};
		return template(context);
	}

	function completeTodo(ev) {
		var input = ev.currentTarget;
		var li = input.parentNode.parentNode;
		if(input.checked === true) {
			li.className = "completed";
		}else {
			li.className = "";
		}
	}

	function deleteTodo(ev) {
		var button = ev.currentTarget;
		var li = button.parentNode.parentNode;
		var start = null;
		window.requestAnimationFrame(deleteStep); //질문. requestAnimationFrame은 window에만 바인딩해줘야 하는걸까? li에 바인딩 해주면 안되나?
		
		function deleteStep(timestamp) {
			if(!start) start = timestamp;
				var progress = timestamp - start;
		  		li.style.opacity = 1 - progress * 0.01;
		 	if (progress < 200) {
		    	window.requestAnimationFrame(deleteStep);
		 	}
		  	else {
		  		li.parentNode.removeChild(li);
		  	}
		}
	}

	
});
