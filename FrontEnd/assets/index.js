//*----------------------------------------
//* Récupérer l'API
//*----------------------------------------
var picturesData = []; // Boite

async function fetchPictures() {
  // Récupération des données de l'API avec la méthode fetch
  await fetch("http://localhost:5678/api/works")
    // attend que le await soit exécuté avant de faire la suite
    .then((response) => response.json())
    // Données transmise sous la forme d'un "Objet"
    .then((data) => (picturesData = data));
  // Afficher les données dans un tableau
  // console.log(picturesData);
}

//*------------------------------------
//* élément de l'APLI
//*------------------------------------

function createFigure(card) {
  // card = nom du paramètre de l'array => picturesData
  var figure = document.createElement("figure");
  // création de la balise
  figure.dataset.number = card.category.id;
  // donner le paramètre "id" pour les filtrer

  var img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.src = card.imageUrl; // Récupérer l'URL de img
  figure.appendChild(img); // Mettre en parent "figure"

  var figcaption = document.createElement("figcaption");
  figcaption.textContent = card.title; // Récupérer le titre
  figure.appendChild(figcaption);

  return figure; // L'exécuter
}

function editPopup(card) {
  /// Le block
  var figureModal = document.createElement("figure");
  figureModal.dataset.number = card.id;

  /// Image
  var imgModal = document.createElement("img");
  imgModal.crossOrigin = "anonymous";
  imgModal.src = card.imageUrl;
  figureModal.appendChild(imgModal);

  /// div des boutons
  var classBtn = document.createElement("div");
  classBtn.classList.add("btn-class");
  figureModal.appendChild(classBtn);

  /// bouton move
  var btnMove = document.createElement("button");
  btnMove.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right">';
  btnMove.classList.add("btn-move");
  classBtn.appendChild(btnMove);

  figureModal.addEventListener("mouseover", () => {
    btnMove.style.visibility = "visible";
  });
  figureModal.addEventListener("mouseout", () => {
    btnMove.style.visibility = "hidden";
  });

  /// bouton delete
  var btnDelete = document.createElement("button");
  btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  btnDelete.classList.add("btn-delete");
  classBtn.appendChild(btnDelete);

  function deletePost() {
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      var deleteId =
        e.target.parentElement.parentElement.parentElement.dataset.number;
      // console.log(deleteId);
      // deleteId => supprimer l'id de la figure
      figureModal.parentNode.removeChild(figureModal);
      // supprimer le post de la pop up
      deletePostGallery(deleteId);
      // Jouer deleteId pour supprimer le post du main
    });
  }
  deletePost();

  /// text edite
  var figcaptionModal = document.createElement("figcaption");
  figcaptionModal.textContent = "éditer";
  figureModal.appendChild(figcaptionModal);

  return figureModal;
}
//*------------------------------------
//* Afficher les éléments
//*------------------------------------

async function designDisplay(catId = 0) {
  // Afficher les photos
  await fetchPictures();
  // Jouer la fonction pour affichier les données

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  // Efface le contenue / évite la répétiton

  const galleryModal = document.getElementById("modalGallery");
  galleryModal.innerHTML = "";
  // Même paramètre pour la Pop-up

  const allPictures = document.querySelector(".btnAll");
  // Balise bouton => "tous"
  allPictures.addEventListener("click", () => {
    // événement au click joue la fonction
    designDisplay();
  });

  picturesData.forEach((card) => {
    // pour chaque élément de "picturesData"
    //card = nom que je donne a l'élément

    if (catId == 0 || catId == card.category.id) {
      // Paramètre pour le filtre
      var figure = createFigure(card);
      // Récupère le numéro (id) pour chaque figure
      gallery.appendChild(figure);
      // la div gallery devient son parent
    }
    var figureModal = editPopup(card);
    galleryModal.appendChild(figureModal);
  });
}
designDisplay();

//*------------------------------------
//* Filter
//*------------------------------------

var filterData = []; // Boîte

async function fetchFilter() {
  await fetch("http://localhost:5678/api/categories")
    // Récupérer les boutons "filter"
    .then((response) => response.json())
    .then((filter) => (filterData = filter));
  // console.log(filterData);
}

async function filterDisplay() {
  await fetchFilter();

  const filterList = document.getElementById("filterList");
  // Séléctionner l'id

  filterData.forEach((card) => {
    // Créer une règle pour chaque button
    var myBtn = document.createElement("button");
    myBtn.dataset.number = card.id;
    // Récupérer l'id pour les filtrer
    myBtn.textContent = card.name;
    // Récupérer le nom du POST
    myBtn.addEventListener("click", () => {
      // Créer un événement au click
      console.log(myBtn); // l'élément
      console.log(card.id); // Son numéro de filtre
      designDisplay(card.id);
      // Jouer la fonction pour chaque élément
    });
    filterList.appendChild(myBtn);
    // Mettre chaque buttons dans la div
  });
}
filterDisplay(); // Jouer la fonction

//*------------------------------------
//* Login
//*------------------------------------

// Redirection au login
var btnLogin = document.querySelector(".btn-login");
btnLogin.addEventListener("click", () => {
  window.location.href = "./assets/login.html";
});

// Récuperer le "token"
let userToken = localStorage.getItem("token");

// Affiche les boutons "modifier"
function DisplayEdit() {
  var btnEdit = document.getElementById("edit-gallery");
  var btnModal = document.querySelectorAll(".btn-modal");
  var btnLogin = document.querySelector(".btn-login");
  for (var i = 0; i < btnModal.length; i++) {
    // for => selectionne tous les boutons "modifier"
    if (userToken) {
      // if => si l'utilisateur a son token
      btnModal[i].style.display = "block";
      btnEdit.style.display = "block";
      btnLogin.textContent = "Logout";
    }
  }
}
DisplayEdit(); // Pour l'afficher

//* First Pop-up

var galleryImg = document.querySelector(".gallery");

var popUp = document.getElementById("pop-up");
// popUp => div qui contient tout la pop-up
var editGallery = document.getElementById("edit-gallery");
// editGallery => btn modifier
var backgroundOpacity =
  document.getElementsByClassName("background-opacity")[0];

editGallery.addEventListener("click", () => {
  popUp.classList.toggle("active-popUp");
  backgroundOpacity.classList.toggle("active-popUp");
});
// faire apparaître la pop up au click

closeBtn.addEventListener("click", () => {
  popUp.classList.toggle("active-popUp");
  backgroundOpacity.classList.toggle("active-popUp");
  designDisplay();
});
// fermer la pop up au click

//* Second popup

var newPopUp = document.getElementById("new-pop-up");
// newPopUp => div qui contient la 2 pop-up
var btnAddPictures = document.querySelector(".btn-add-post");
// btnAddPictures => btn "Ajouter une photo"

btnAddPictures.addEventListener("click", (e) => {
  newPopUp.classList.toggle("active-popUp");
  popUp.classList.toggle("active-popUp");
});

closeBtn2.addEventListener("click", () => {
  newPopUp.classList.toggle("active-popUp");
  backgroundOpacity.classList.toggle("active-popUp");
});
backBtn.addEventListener("click", () => {
  popUp.classList.toggle("active-popUp");
  newPopUp.classList.toggle("active-popUp");
});
// => btn retour

//*------------------------------------
//* New Post
//*------------------------------------

async function newPost(inputData) {
  // nouveau post
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: inputData,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("There was an error");
      }
    })
    .then((data) => {
      designDisplay();
    });
}

document.querySelectorAll(".file-upload__button").forEach((button) => {
  const hiddenInput = button.parentElement.querySelector(".file-upload__input");
  const dropZoneElement = document.querySelector(".drop-zone");
  var inputFiles = [];

  button.addEventListener("click", () => {
    hiddenInput.click();
  });
  // au click sur le btn, active input pour l'upload

  hiddenInput.addEventListener("change", () => {
    inputFiles = hiddenInput.files;
    // console.log(inputFiles);
    if (inputFiles.length) {
      updadeThumbnail(dropZoneElement, inputFiles[0]);
    }
  });
  function updadeThumbnail(dropZoneElement, inputFiles) {
    // console.log(dropZoneElement);
    // console.log(inputFiles);
    var dropZoneToggle = document.querySelector(".drop-zone-toggle");
    // div => i + input + btn + p
    var thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    // futur emplacement pour img

    /// First time = no thumbnail element, so lets creat it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("img");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneToggle.style.display = "none";
      dropZoneElement.appendChild(thumbnailElement);

      /// Reset after click icon
      backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dropZoneToggle.style.display = "flex";
        thumbnailElement.parentNode.removeChild(thumbnailElement);
      });
      closeBtn2.addEventListener("click", () => {
        dropZoneToggle.style.display = "flex";
        thumbnailElement.parentNode.removeChild(thumbnailElement);
      });
    }
    /// Show thumbnail for image files
    if (inputFiles.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        thumbnailElement.src = reader.result;
      };
      reader.readAsDataURL(inputFiles);
    }
  }
});

const formNewPost = document.getElementById("form-New-Post");

formNewPost.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData();

  //// Les relier à l'API
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  const files = document.getElementById("myFile");
  formData.append("image", files.files[0]);
  formData.append("title", title.value);
  formData.append("category", parseInt(category.value));
  /// integer = nombre
  // console.log(formData);
  if (newPost(formData)) {
    var dropZoneToggle = document.querySelector(".drop-zone-toggle");
    var thumbnailElement = document.querySelector(".drop-zone__thumb");
    var category0 = document.getElementById("category")[0];

    newPopUp.classList.toggle("active-popUp");
    backgroundOpacity.classList.toggle("active-popUp");
    dropZoneToggle.style.display = "flex";
    thumbnailElement.parentNode.removeChild(thumbnailElement);
    title.value = "";
    category.value = "";
  }
});

//*------------------------------------
//* Delete Post
//*------------------------------------

function deletePostGallery(id) {
  // console.log(`http://localhost:5678/api/works/${id}`);
  fetch(`http://localhost:5678/api/works/${id}`, {
    /// dans url ajouter ${parametre}
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
