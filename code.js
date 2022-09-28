const element ={
    registerEmail: document.querySelector("#register-email"),
    registerPassword: document.querySelector("#register-password"),
    registerButton: document.querySelector("#register-button"),
    loginEmail: document.querySelector("#login-email"),
    longinPassword: document.querySelector("#longin-password"),
    loginButton: document.querySelector("#login-button"),
    gotoLink: document.querySelector("#goto-link"),
};

// const { copyFileSync } = require("fs");

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

    function showRelevantHTML(id ="login") {
        for (const section of applicationSections){
            const element = document.querySelector(`#${section}`);
            if(!originalDisplayOptions.has(section)){
                originalDisplayOptions.set(section, element.style.display);
            }
            if(section === id) {
                element.style.display = originalDisplayOptions.get(section);
            }else{
                element.style.display = "none";
            }
        }
    }

    elements.gotoRegister.addEventListener("click", () => showRelevantHTML("register"));
    elements.gotoLogin.addEventListener("click", () => showRelevantHTML("login"));

    async function registerUser(){
        const {auth, createUserWhitEmaiAndlPassword} = window.fiba;

        const email = element.registerEmail.value ;
        const password = element.registerPassword.value;

        try{
            await createUserWhitEmaiAndlPassword(auth, email, password);
            todoApp();
        }catch(error){
            alert(error.message);
        }
    }

    async function LoginUser(){
        const {auth, createUserWhitEmaiAndlPassword} = window.fib;

        const email = element.loginEmail.value ;
        const password = element.loginPassword.value;

        try{
            await createUserWhitEmaiAndlPassword(auth, email, password);
            todoApp();
        }catch(error){
            alert(error.message);
        }
    }

    async function LoadTodoItems() {
        const todoList = document.querySelector('#todo-items-list');
        const todoResult = await getDocs(collection(db, "todo-items"));

        todoList.innerHTML = "";
        todoResult.forEach(todoItem => {
            todoList.innerHTML += `<li>${todoItem.data().description}</li>`
        });
    }
async function todoApp(){
    const {auth} = window.fiba;
    element.registerButton.addEventListener('click', registerUser);
    element.loginButton.addEventListener('click', registerEmail);

    if(auth.currentUser){
        showRelevantHTML("todos")
        await LoadTodoItems();
    }else{
        showRelevantHTML("login")
    }
}

    async function todoApp(){
        const { collection, getDocs, db} = window.fiba
        await LoadTodoItems(getDocs, db, collection);
    }
    function waitForFirebaseAndStart(){
        if(!window.fiba?.isReady()){
            console.log("Waiting for firebase");
            setTimeout(waitForFirebaseAndStart, 500);
        }else{
            console.log("firebase ready!");
            todoApp();
        }
    }

    waitForFirebaseAndStart();

    await LoadTodoItems();
})();