// ------------ SIGNUP FUNCTION ------------
function signup() {
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!fname || !lname || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Get existing users or empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already registered
  let userExists = users.some(user => user.email === email);

  if (userExists) {
    alert("This email ID is already registered!");
    return;
  }

  // Add new user
  users.push({
    fname: fname,
    lname: lname,
    email: email,
    password: password
  });

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Please login.");
  window.location.href = "loginform.html"; // go back to login
}



// ------------ LOGIN FUNCTION ------------
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user
  let validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    alert("Login successful!");
    window.location.href = "dashboard.html";   // redirect to dashboard
  } else {
    alert("Invalid email or password");
  }
}
