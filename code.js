const elements = {
  registerEmail: document.querySelector("#register-email"),
  registerPassword: document.querySelector("#register-password"),
  registerButton: document.querySelector("#register-button"),
  loginEmail: document.querySelector("#login-email"),
  longinPassword: document.querySelector("#longin-password"),
  loginButton: document.querySelector("#login-button"),
  gotoLink: document.querySelector("#goto-link"),
  newTodoDescription: document.querySelector("#create-todo-description"),
  newTodoButton: document.querySelector("#create-todo-button"),
};

function showRelevantHTML(id = "login") {
  for (const section of applicationSections) {
    const elements = document.querySelector(`#${section}`);
    if (!originalDisplayOptions.has(section)) {
      originalDisplayOptions.set(section, elements.style.display);
    }
    if (section === id) {
      elements.style.display = originalDisplayOptions.get(section);
    } else {
      elements.style.display = "none";
    }
  }
}

elements.gotoRegister.addEventListener("click", () =>
  showRelevantHTML("register")
);
elements.gotoLogin.addEventListener("click", () => showRelevantHTML("login"));

async function registerUser() {
  const { auth, createUserWhitEmaiAndlPassword } = window.fiba;

  const email = elements.registerEmail.value;
  const password = elements.registerPassword.value;

  try {
    await createUserWhitEmaiAndlPassword(auth, email, password);
    todoApp();
  } catch (error) {
    alert(error.message);
  }
}

async function loginUser() {
  const { auth, createUserWhitEmaiAndlPassword } = window.fiba;

  const email = elements.loginEmail.value;
  const password = elements.loginPassword.value;

  try {
    await createUserWhitEmaiAndlPassword(auth, email, password);
    todoApp();
  } catch (error) {
    alert(error.message);
  }
}

async function loadTodoItems() {
  const { db, collection, getDocs, auth } = window.fiba;

  const { uid } = auth.currentUser;
  const todoList = document.querySelector("#todo-items-list");
  const todoResult = await getDocs(collection(db, uid));

  todoList.innerHTML = "";
  todoResult.forEach((todoItem) => {
    todoList.innerHTML += `<li>${todoItem.data().description}</li>`;
  });
}

async function todoApp() {
  const { auth } = window.fiba;
  elements.registerButton.addEventListener("click", registerUser);
  elements.loginButton.addEventListener("click", loginUser);
  elements.newTodoButton.addEventListener("click", addTodoItem);

  if (auth.currentUser) {
    showRelevantHTML("todos");
    await loadTodoItems();
  } else {
    showRelevantHTML("login");
  }
}

function waitForFirebaseAndStart() {
  if (!window.fiba?.isReady()) {
    console.log("Waiting for Firebase");
    setTimeout(waitForFirebaseAndStart, 500);
  } else {
    console.log("Firebase is ready");
    todoApp();
  }
}

waitForFirebaseAndStart();

async function addTodoItem() {
  try {
    const { db, setDoc, doc, auth } = window.fiba;
    const userId = auth.currentUser.uid;
    const newTodoItemId = crypto.randomUUID;

    const newTodoItem = {
      description: elementsLocated.newTodoDescription.value,
      createTimestamp: Date.now(),
    };

    await setDoc(doc(db, userId, newTodoItem), newTodoItem);
    loadTodoItems();
  } catch (error) {
    alert(error.message);
  }
}

async function todoApp() {
  const { collection, getDocs, db } = window.fiba;
  await loadTodoItems(getDocs, db, collection);
}
function waitForFirebaseAndStart() {
  if (!window.fiba?.isReady()) {
    console.log("Waiting for firebase");
    setTimeout(waitForFirebaseAndStart, 500);
  } else {
    console.log("firebase ready!");
    todoApp();
  }
}

waitForFirebaseAndStart();

await loadTodoItems();
