function initFavoriteCarousel() {
  const track = document.querySelector(".carousel-container");
  const cards = document.querySelectorAll(".favorite-card");
  const btnPrev = document.querySelector("#button-previous");
  const btnNext = document.querySelector("#button-next");


  if (!track || cards.length === 0 || !btnPrev || !btnNext) return;

  let currentIndex = 0;

  function moveCarousel() {

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const itemWidth = cardWidth + gap;


    const trackWidth = track.offsetWidth;
    const itemsPerScreen = Math.floor(trackWidth / itemWidth);
    

    const maxIndex = Math.max(0, cards.length - itemsPerScreen);

    if (currentIndex > maxIndex) currentIndex = 0; 
    if (currentIndex < 0) currentIndex = maxIndex;

 
    const amountToMove = currentIndex * itemWidth;
    track.style.transform = `translateX(-${amountToMove}px)`;
  }

  btnNext.addEventListener("click", () => {
    currentIndex++;
    moveCarousel();
  });

  btnPrev.addEventListener("click", () => {
    currentIndex--;
    moveCarousel();
  });


  window.addEventListener("resize", () => {
    currentIndex = 0;
    track.style.transform = `translateX(0)`;
  });
}


window.addEventListener("load", initFavoriteCarousel);

let carouselDepoiment = document.querySelector(".carousel-talking-wrapper");
let carouselCardsDepoiment = document.querySelectorAll(
  ".carousel-taking-cards"
);
let btnNextDepoiment = document.querySelector("#btnNext-depoiment-carousel");
let btnPreviousDepoiment = document.querySelector(
  "#btnPrevious-depoiment-carousel"
);
console.log(carouselCardsDepoiment);
let currentIndex = 0;

function updateCarousel() {
  carouselCardsDepoiment.forEach((card) => {
    card.classList.add("hidden");
  });

  carouselCardsDepoiment[currentIndex].classList.remove("hidden");
}

btnNextDepoiment.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > carouselCardsDepoiment.length - 1) {
    currentIndex = 0;
  }
  updateCarousel();
});

btnPreviousDepoiment.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselCardsDepoiment.length - 1;
  }

  updateCarousel();
});

const productCatalog = [
  {
    id: 1,
    nome: "White T-shirt",
    price: 9.99,
    image: "./src/assets/images/camisetabranca.jpg",
  },

  {
    id: 2,
    nome: "Black Sweatshirt",
    price: 19.99,
    image: "./src/assets/images/blusa preta.jpg",
  },

  {
    id: 3,
    nome: "Black T-shirt number 3",
    price: 10.99,
    image: "/src/assets/images/camisetaPreta.jpg",
  },
  {
    id: 4,
    nome: "Red dress",
    price: 30.0,
    image: "./src/assets/images/vestido.jpg",
  },

  {
    id: 5,
    nome: "Orange Beanie",
    price: 5.99,
    image: "./src/assets/images/hamed-darzi-6dILIIipKHk-unsplash.jpg",
  },
];

const ProductDisplay = document.querySelector("#vitrine-track");
function displayHtmlCard(produto) {
  const div = document.createElement("div");
  div.classList.add(
    "card-wrapper",
    "p-4",
    "bg-white",
    "shadow-md",
    "rounded-lg",
    "flex",
    "flex-col"
  );
  const image = document.createElement("img");
  image.classList.add(
    "image-card",
    "h-64",
    "w-full",
    "object-cover",
    "rounded-lg",
    "mb-3"
  );
  image.src = produto.image;
  image.alt = produto.nome;

  const infoWrapper = document.createElement("div");
  infoWrapper.classList.add("card-info-wrapper", "mt-4", "flex", "flex-col");

  const containerNameProduct = document.createElement("div");
  const containerBuyer = document.createElement("div");
  containerBuyer.classList.add(
    "flex",
    "flex-row",
    "item-center",
    "justify-evenly",
    "p-4"
  );

  const nomeProduto = document.createElement("h3");
  nomeProduto.classList.add("card-nome", "text-center");
  nomeProduto.textContent = produto.nome;

  const priceProduct = document.createElement("p");
  priceProduct.classList.add("font-semibold", "p-1.5");
  priceProduct.textContent = `$ ${produto.price}`;

  const buttonBuy = document.createElement("button");
  buttonBuy.textContent = "Buy";
  buttonBuy.classList.add(
    "buy-button",
    "bg-gray-200",
    "w-18",
    "rounded-lg",
    "hover:bg-gray-300",
    "hover:transition-all",
    "duration-300",
    "ease-in-out",
    "cursor-pointer"
  );

  const cartAdd = document.createElement("button");
  cartAdd.classList.add(
    "cart-button",
    "cursor-pointer",
    "hover:bg-gray-200",
    "p-1.5",
    "rounded-xl"
  );
  cartAdd.setAttribute("data-id", produto.id);

  const icone = document.createElement("img");
  icone.src = "./src/assets/images/add-to-cart.png";
  icone.classList.add("h-6");

  containerNameProduct.append(nomeProduto);

  div.append(image, infoWrapper);
  cartAdd.append(icone);
  containerBuyer.append(priceProduct, buttonBuy, cartAdd);
  infoWrapper.append(containerNameProduct, containerBuyer);

  return div;
}

productCatalog.forEach((products, index) => {
  const cardElement = displayHtmlCard(products);
  ProductDisplay.append(cardElement);
});

const buttonCard = document.querySelectorAll(".cart-button");

let cart = [];

buttonCard.forEach((button) => {
  button.addEventListener("click", () => {
    const idProduto = button.dataset.id;
    addCart(idProduto);
  });
});

function addCart(produtoId) {
  const selectedProduct = productCatalog.find(
    (produto) => produto.id == produtoId
  );
  if (selectedProduct) {
    console.log(`adicionado ao carrinho`, selectedProduct.nome);
    cart.push(selectedProduct);
    cartCount();
  }
}

function cartCount() {
  const countEl = document.querySelector("#cart-count");
  const quantity = cart.length;
  countEl.textContent = quantity;

  if (quantity > 0) {
    countEl.classList.remove("hidden");
  } else {
    countEl.classList.add("hidden");
  }
}
