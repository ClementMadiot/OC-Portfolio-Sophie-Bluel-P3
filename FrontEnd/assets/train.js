

let picturesData = [];

const fetchPictures = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => (res = res.json()))
    .then((data) => (picturesData = data));
  // console.log(picturesData);
};

const designDisplay = async (cardId = 0) => {
  await fetchPictures();

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  const all = document.querySelector(".btnAll")
  all.addEventListener("click", () => {
    designDisplay();
  })
  

  picturesData.forEach((card) => {
    if (cardId == 0 || cardId == card.category.id) {
      let figure = document.createElement("figure");
      figure.dataset.number = card.category.id;
      gallery.appendChild(figure);

      let img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.src = card.imageUrl;
      figure.appendChild(img);

      let figcaption = document.createElement("figcaption");
      figcaption.textContent = card.title;
      figure.appendChild(figcaption);
    }
  });
};
designDisplay();

let filterData = [];

const fetchFilter = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((list) => (filterData = list));
  console.log(filterData);
};

const filterDisplay = async () => {
  await fetchFilter();

  const filterList = document.getElementById("filterList");

  filterData.forEach((list) => {
    let myBtn = document.createElement("button");
    filterList.appendChild(myBtn);

    myBtn.dataset.number = list.id;
    myBtn.textContent = list.name;
    myBtn.addEventListener("click", () => {
      designDisplay(list.id);
    })
  });
};
filterDisplay();
