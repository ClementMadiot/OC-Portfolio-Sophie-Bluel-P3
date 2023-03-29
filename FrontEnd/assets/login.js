//*------------------------------------
//* login
//*------------------------------------

//* Fetch login



function fetchLogin(email, password) {
  /// () parametre
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      /// La syntaxe ajoute une entrée / stocke la paire clé/valeur
      window.localStorage.setItem("token", data.token);
      console.log(localStorage);
    }) 
    
}
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email && password) {
    fetchLogin(email, password);
  } 


  var response;
  const errorLogin = document.getElementById("login-error")

  try {
    response = window.localStorage.getItem("token", data.token);
  } catch (error) {
    if (response?.ok, res) {
      errorLogin.style.opacity = 0
      console.log("yes");
      alert("Succesful", error);
      res.status(200).json(response?.ok);
    } else {
      errorLogin.style.opacity = 1
      console.log("no");
      alert('There was an error', error);
      res.status(404).json(!response.ok);

    }
  }

});











    // const erreur = document.querySelector("error")
    // if (localStorage.getItem("token")) { 
    //   erreur.createElement
    // }