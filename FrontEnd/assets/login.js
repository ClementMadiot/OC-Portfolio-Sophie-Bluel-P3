//*------------------------------------
//* login
//*------------------------------------

//* Fetch login

function fetchLogin(email, password) {
  // () parametre
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ // Les objets
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "../index.html";
        return res.json();
    // S'il reconnaît l'utilisateur, envoie à la page main
      }
      throw new Error("Something wrong");
    // À l'inverse, envoie une erreur
    })
    .then((data) => {
      // Récupère le token avec setItem dans "localStorage"
      window.localStorage.setItem("token", data.token);
      console.log(localStorage);
    })
    .catch((error) => { // Si erreur
      const loginError = document.getElementById("login-error");
      loginError.style.opacity = 1;
      alert("There was an error", error);
    // Affiche moi message d'erreur
    });
}
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
// événement à la connexion
  e.preventDefault(); // => ne pas recharger la page

  const email = document.getElementById("login-email").value;
// Récupère ce qui a écrit dans l'input avec (.value)
  const password = document.getElementById("login-password").value;
  

  if (email && password) {
    fetchLogin(email, password);
  // Si il reconnaît l'email et password joue la fonction 
  }
});

// sophie.bluel@test.tld
//  S0phie


//-----------------------------------
