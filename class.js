class TodoList {
    constructor(text) {
        this.text = text;
        this.complete = false;
        this.updateMode = false;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }

    toggleUpdateMode() {
        this.updateMode = !this.updateMode;
    }
}

const todoInput = document.getElementsByClassName("add-input")[0];
const addBtn = document.getElementsByClassName("add-btn")[0];
const todoList = document.getElementsByClassName("list")[0];

const clickAddBtn = () => {
    const taskText = todoInput.value.trim();

    if (taskText !== "") {
        const newTask = new TodoList(taskText);
        const taskItem = document.createElement("li");
        taskItem.className = "none-update-mode";

        taskItem.innerHTML = `<span>${newTask.text}</span><input class='update-input' type='text' value=${newTask.text}/>`;
        todoList.appendChild(taskItem);

        // 수정,삭제 버튼 추가
        const updateBtn = document.createElement("button");
        updateBtn.innerText = "수정";
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "삭제";

        taskItem.appendChild(updateBtn);
        taskItem.appendChild(removeBtn);

        const taskSpan = taskItem.getElementsByTagName("span")[0];

        // 글자 클릭시 완료여부 토글
        taskSpan.addEventListener("click", () => {
            newTask.toggleComplete();

            if (newTask.complete) {
                taskItem.classList.add("complete");
            } else {
                taskItem.classList.remove("complete");
            }
        });

        // 삭제 이벤트
        removeBtn.addEventListener("click", () => {
            todoList.removeChild(taskItem);
        });

        // 수정 버튼 클릭시 input <-> span 으로 토글
        updateBtn.addEventListener("click", () => {
            const updateInput =
                taskItem.getElementsByClassName("update-input")[0];

            if (newTask.updateMode === false) {
                taskItem.classList.add("update-mode");
                taskItem.classList.remove("none-update-mode");
                const taskSpan = taskItem.getElementsByTagName("span")[0];

                updateInput.value = taskSpan.innerText;
                newTask.toggleUpdateMode();
            } else {
                // 인풋 비었을 시 alert
                if (updateInput.value !== "") {
                    taskItem.classList.add("none-update-mode");
                    taskItem.classList.remove("update-mode");
                    taskSpan.innerText = updateInput.value;
                    newTask.toggleUpdateMode();
                } else {
                    alert("글자를 입력해 주세요.");
                }
            }
        });

        todoInput.value = "";
    }
};

addBtn.addEventListener("click", clickAddBtn);
// 엔터로 목록 추가
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        clickAddBtn();
    }
});
