//*------------------------------------
//* Pictures
//*------------------------------------
let picturesData = []; /// Boite

async function fetchPictures() {
  /// Aller cherhcer les photos
  await fetch("http://localhost:5678/api/works") /// attend que le await soit exécuté avant de faire la suite
    .then((response) => response.json())
    .then((data) => (picturesData = data));
  // console.log(picturesData);
};

async function designDisplay(catId = 0) {
  /// Affichage des photos
  await fetchPictures();

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; /// Delete pictures after deselect

  const allPictures = document.querySelector(".btnAll");
  allPictures.addEventListener("click", () => {
    designDisplay();
  });

  picturesData.forEach((card) => {
    /// card = nom que je donne a l'element

    if (catId == 0 || catId == card.category.id) {
      var figure = document.createElement("figure"); /// creer une balise figure
      figure.dataset.number = card.category.id; /// dataset bouge pas

      var img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.src = card.imageUrl;
      figure.appendChild(img); /// appendchild = enfant de figure

      var figcaption = document.createElement("figcaption");
      figcaption.textContent = card.title;
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
  });
};
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
};

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
};
filterDisplay();


if (localStorage.getItem("token")) {

}

// si j'ai le token display ?? nodisplay
//createlement
// est ce que j'ai le token dans mon localstorage
//createlement append


//!afficher message d'erreur sur login
// erreur fetch


//! rediriger user apres connection + afficher modif
// si j'ai le token display ?? nodisplay
//createlement
// est ce que j'ai le token dans mon localstorage
//createlement append

// window.location.href = "http://127.0.0.1:5500/oc-P3-Portfolio/FrontEnd/index.html";





