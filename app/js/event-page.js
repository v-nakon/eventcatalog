let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get('id')
console.log(idEvent);


axios.get('https://eventafisha.com/api/v1/events/' + idEvent)
  .then(function (response) {
	console.log(response.data);
    setTitle(response.data);
    setDate(response.data);
    setLocation(response.data);
    setPrice(response.data);
    setBuyLink(response.data);
    setDescription(response.data);
    setImg(response.data);
    setCategory(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

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
     dateElement.innerHTML = startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
 }
 function setLocation(obj) {
     let location = obj.address;
     let locationElement = document.querySelector(".item_location");
     locationElement.innerHTML = location;
 }
 function setPrice(obj) {
     let price = obj.cost;
     let priceElement = document.querySelector(".buy_box_price");
     priceElement.innerHTML = price;
 }
 function setBuyLink(obj) {
     let buyLink = obj.buy_link;
     let buyBtn = document.querySelector(".buy_box_btn");
     buyBtn.addEventListener( "click" , () => window.open(buyLink));
 }
 function setDescription(obj) {
     let description = obj.desc;
     let descriptionElement = document.querySelector(".event_description");
     descriptionElement.innerHTML = description;
 }
 function setImg(obj) {
     let imgPath = obj.images;
     console.log("https://eventafisha.com/storage/" + imgPath);
     let imgElement = document.querySelector(".event_img");
     imgElement.src = "https://eventafisha.com/storage/" + imgPath;
 }
 function setCategory(obj) {
    let category = obj.category.title;
    let categoryElement = document.querySelector(".item_tag");
    categoryElement.innerHTML = category;
}