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
    .then((res) => {
      if (res.ok) {
        window.location.href = "../index.html";
        return res.json();
      }
      throw new Error("Something wrong");
    })
    .then((data) => {
      /// La syntaxe ajoute une entrée / stocke la paire clé/valeur
      window.localStorage.setItem("token", data.token);
      console.log(localStorage);
    })
    .catch((error) => {
      const loginError = document.getElementById("login-error");
      loginError.style.opacity = 1;
      alert("There was an error", error);
    });
}
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email && password) {
    fetchLogin(email, password);
  }
});

// sophie.bluel@test.tld
//  S0phie


//-----------------------------------

