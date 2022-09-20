(async () => {
    while(!window && !window.firebase && !window.firebase.isReady()){
        console.log("laoding");
    }
    console.log("Firebase ready!");
    const {
        collection,
        getDocs
    } = window.firestore;

    const {
        db
    } = window.firebase;

    async function LoadTodoItems() {
        const todoList = document.querySelector('#todo-items-list');
        const todoResult = await getDocs(collection(db, "todo-items"));

        todoList.innerHTML = "";
        todoResult.forEach(todoItem => {
            todoList.innerHTML += `<li>${todoItem.data().description}</li>`
        });
    }

    await LoadTodoItems();
})();