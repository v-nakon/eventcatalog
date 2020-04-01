let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get("id");
console.log(idEvent);

axios
  .get("https://eventafisha.com/api/v1/events/" + idEvent)
  .then(function(response) {
    checkMetaData(response.data);
    document.title = response.data.title;
    setTitle(response.data);
    setDate(response.data);
    setLocation(response.data);
    setPrice(response.data);
    setBuyLink(response.data);
    setDescription(response.data);
    setImg(response.data);
    setCategory(response.data);
    setPromo(response.data);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });
function checkMetaData(response) {
  if (response.seo.meta_title !== null) {
    setMetaData("title", response.seo.meta_title);
  } else {
    setMetaData("title", response.title);
  }
  if (response.seo.meta_desc !== null) {
    setMetaData("description", response.seo.meta_desc);
  }
  if (response.seo.meta_keywords !== null) {
    setMetaData("keywords", response.seo.meta_keywords);
  }
}
function setMetaData(name, data) {
  let meta = document.createElement("meta");
  meta.name = name;
  meta.content = data;
  document.querySelector("head").appendChild(meta);
}

function setTitle(obj) {
  let title = obj.title;
  let titleElement = document.querySelector(".event_main_title");
  let titleBuyBox = document.querySelector(".buy_box_title");
  titleElement.innerHTML = title;
  titleBuyBox.innerHTML = title;
}
function setDate(obj) {
  let startDate = new Date(obj.start_date);
  let endDate = new Date(obj.end_date);
  let dateElement = document.querySelector(".item_date");
  dateElement.innerHTML =
    startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
}
function setLocation(obj) {
  let location = obj.address;
  let locationElement = document.querySelector(".item_location");
  locationElement.innerHTML = location;
}
function setPrice(obj) {
  let price = obj.cost;
  let priceElement = document.querySelector(".buy_box_price");
  if (price == 0) {
    priceElement.classList.add("hide_element");
    renameBtn();
  } else {
    priceElement.innerHTML = price;
  }
}
function setBuyLink(obj) {
  let buyLink = obj.buy_link;
  let price = obj.cost;
  let buyBtn = document.querySelector(".buy_box_btn");
  let id = obj.id;
  let redirectLink = "https://eventafisha.com/events/" + id + "/redirect-page";
  if (buyLink === null && price == 0) {
    document.querySelector(".buy_box").classList.add("hide_element");
  } else if (buyLink === null) {
    buyBtn.classList.add("hide_element");
  } else {
    buyBtn.addEventListener("click", () => window.open(redirectLink));
  }
}
function setDescription(obj) {
  let description = obj.desc;
  let description_first = obj.description_first;
  let description_second = obj.description_second;
  // console.log(description_first + " " + description_second);
  if (description_first !== null || description_first !== null) {
    let descriptionElement1 = document.querySelector(".description_first");
    descriptionElement1.innerHTML = description_first;
    let descriptionElement2 = document.querySelector(".description_second");
    descriptionElement2.innerHTML = description_second;
  } else {
    let descriptionElement = document.querySelector(".event_description");
    descriptionElement.innerHTML = description;
  }
}
function setImg(obj) {
  let imgPath = obj.images;
  // console.log("https://eventafisha.com/storage/" + imgPath);
  let imgElement = document.querySelector(".event_img");
  imgElement.src = "https://eventafisha.com/storage/" + imgPath;
}
function setCategory(obj) {
  let category = obj.category.title;
  let categoryElement = document.querySelector(".item_tag");
  categoryElement.innerHTML = category;
}
function setPromo(obj) {
  let promo = obj.promocode;
  let promoElement = document.querySelector(".item_event_promo");
  if (promo === null) {
    promoElement.classList.add("hide_element");
  } else {
    promoElement.innerHTML = "Промокод: " + promo;
  }
}
function renameBtn() {
  let btn = document.querySelector(".buy_box_btn");
  btn.value = "РЕГИСТРАЦИЯ";
}
