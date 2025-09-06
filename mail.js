const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const loginError = document.getElementById("loginError");
  const registerError = document.getElementById("registerError");

  function showRegister() {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
  }

  function showLogin() {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
  }

  
  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      registerError.textContent = "Invalid email format.";
      registerError.style.display = "block";
      return;
    }

    let users = getUsers();
    if (users.find(u => u.email === email)) {
      registerError.textContent = "Email already registered.";
      registerError.style.display = "block";
      return;
    }

    users.push({ email, password });
    saveUsers(users);
    alert("✅ Account created! Please log in.");
    showLogin();
  });

  
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      
      window.location.href = "mindease.html";
    } else {
      loginError.textContent = " Invalid email or password.";
      loginError.style.display = "block";
    }
  });