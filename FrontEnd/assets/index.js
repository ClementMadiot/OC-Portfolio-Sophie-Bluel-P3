//*------------------------------------
//* Pictures
//*------------------------------------
var picturesData = []; /// Boite

async function fetchPictures() {
  /// Aller cherhcer les photos
  await fetch("http://localhost:5678/api/works") /// attend que le await soit exécuté avant de faire la suite
    .then((response) => response.json())
    .then((data) => (picturesData = data));
  // console.log(picturesData);
}

function createFigure(card) {
  var figure = document.createElement("figure"); /// creer une balise figure
  figure.dataset.number = card.category.id; /// dataset bouge pas

  var img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.src = card.imageUrl;
  figure.appendChild(img); /// appendchild = enfant de figure

  var figcaption = document.createElement("figcaption");
  figcaption.textContent = card.title;
  figure.appendChild(figcaption);

  return figure;
}

function editPopup(card) {
  /// Le block
  var figureModal = document.createElement("figure");
  figureModal.dataset.number = card;

  /// Image
  var imgModal = document.createElement("img");
  imgModal.crossOrigin = "anonymous";
  imgModal.src = card.imageUrl;
  figureModal.appendChild(imgModal);

  /// div des bouttons
  var classBtn = document.createElement("div");
  classBtn.classList.add("btn-class");
  figureModal.appendChild(classBtn);

  /// boutton move
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

  /// boutton delete
  var btnDelete = document.createElement("button");
  btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  btnDelete.classList.add("btn-delete");
  classBtn.appendChild(btnDelete);

  btnDelete.addEventListener("click", () => {
    figureModal.innerHTML = "";
  });

  /// test edite
  var figcaptionModal = document.createElement("figcaption");
  figcaptionModal.textContent = "éditer";
  figureModal.appendChild(figcaptionModal);

  return figureModal;
}

async function designDisplay(catId = 0) {
  /// Affichage des photos
  await fetchPictures();

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; /// Delete pictures after deselect

  const galleryModal = document.getElementById("modalGallery");

  const allPictures = document.querySelector(".btnAll");
  allPictures.addEventListener("click", () => {
    designDisplay();
  });

  picturesData.forEach((card) => {
    /// card = nom que je donne a l'element

    if (catId == 0 || catId == card.category.id) {
      var figure = createFigure(card);
      gallery.appendChild(figure);
    }
    var figureModal = editPopup(card);
    galleryModal.appendChild(figureModal);
  });
}
designDisplay();

//*------------------------------------
//* Filter
//*------------------------------------

var filterData = [];

async function fetchFilter() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((filter) => (filterData = filter));

  // console.log(filterData);
}

async function filterDisplay() {
  await fetchFilter();

  const filterList = document.getElementById("filterList");

  filterData.forEach((load) => {
    var myBtn = document.createElement("button");
    myBtn.dataset.number = load.id;
    myBtn.textContent = load.name;
    myBtn.addEventListener("click", () => {
      // console.log(myBtn);
      // console.log(load.id);
      designDisplay(load.id);
    });
    filterList.appendChild(myBtn);
  });
}
filterDisplay();

//*------------------------------------
//* Login
//*------------------------------------

/// Redirection au login
var btnLogin = document.querySelector(".btn-login");
btnLogin.addEventListener("click", () => {
  window.location.href = "./assets/login.html";
});

/// Recuperer userId
let userToken = localStorage.getItem("token");

/// Afficher les bouttons modifiers
function DisplayEdit() {
  var btnEdit = document.getElementById("edit-gallery");
  var btnModal = document.querySelectorAll(".btn-modal");
  var btnLogin = document.querySelector(".btn-login");
  for (var i = 0; i < btnModal.length; i++) {
    if (userToken) {
      btnModal[i].style.display = "block";
      btnEdit.style.display = "block";
      btnLogin.textContent = "Logout";
    }
  }
}
DisplayEdit();

//* First Pop-up

var popUp = document.getElementById("pop-up");
var editGallery = document.getElementById("edit-gallery");

editGallery.addEventListener("click", () => {
  popUp.classList.toggle("active-popUp");
});

closeBtn.addEventListener("click", () => {
  popUp.classList.toggle("active-popUp");
});

//* Second popup

var newPopUp = document.getElementById("new-pop-up");
var btnAddPictures = document.querySelector(".btn-add-post");

btnAddPictures.addEventListener("click", (e) => {
  newPopUp.classList.toggle("active-popUp");
  popUp.classList.toggle("active-popUp");
});

closeBtn2.addEventListener("click", () => {
  newPopUp.classList.toggle("active-popUp");
});
backBtn.addEventListener("click", () => {
  popUp.classList.toggle("active-popUp");
  newPopUp.classList.toggle("active-popUp");
});

//-------------------------------------------

//*------------------------------------
//* New Post
//*------------------------------------

async function newPost(inputData) {
  /// Poster nouveau post
  await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      "Authorization" : `Bearer ${userToken}`
    },
    body: (inputData),
  })
    .then((res) => {
      if (res.ok) {
        createFigure();
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
  const dropZoneElement = hiddenInput.closest(".drop-zone");
  var inputFiles = [];

  button.addEventListener("click", () => {
    hiddenInput.click();
  });

  hiddenInput.addEventListener("change", () => {
    inputFiles = hiddenInput.files;
    if (inputFiles.length) {
      updadeThumbnail(dropZoneElement, inputFiles[0]);
    }
  });
  function updadeThumbnail(dropZoneElement, inputFiles) {
    // console.log(dropZoneElement);
    // console.log(inputFiles);

    var thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    /// First time = no thumbnail element, so lets creat it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("img");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
    /// Show thumbnail for image files
    if (inputFiles.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        thumbnailElement.src = reader.result;
        console.log(inputFiles);
      };
      reader.readAsDataURL(inputFiles);
    }
  }
});

const formNewPost = document.getElementById("form-New-Post");
formNewPost.addEventListener("submit", (e) => {
  console.log("test");
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
  console.log(formData);
  
  newPost(formData);
});

function deletePost() {
  fetch("http://localhost:5678/api/works/1", {
    /// dans url ajouter ${parametre}
    method: "DELETE",
    headers: {
      "Authorization" : `Bearer ${userToken}`
    }
  })
  .then((res) => {
    if (res.ok) {

    }
  })
  .then((data) => {
    
  })
  
}



//! Modifier retour newPost (message confirm)
//! Gerer la delete de l' api
/// creer function et la rappelet dans deletPost
//! gerer le css