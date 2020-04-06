export function addOptionSelect(item, elementSelect) {
  let selectCategory = document.getElementById(elementSelect);
  let option = document.createElement("option");
  option.value = item.id;
  option.innerHTML = item.title;
  selectCategory.add(option);
}

// for create list events on main page
export function createEventCard(objItem) {
  let eventCardElements =
    `
	<div class="event_card_content">
	  <img src="https://eventafisha.com/storage/` +
    objItem.images +
    `" alt="" class="event_card_img">
	  <div class="event_card_title">` +
    sliceText(objItem.title) +
    `</div>
	  <div class="event_card_tag">` +
    objItem.category.title +
    `</div>
	  <div class="event_card_date">` +
    setDates(objItem) +
    `</div>
	  <div class="event_card_location">` +
    checkCity(objItem.city) +
    objItem.address +
    `</div>
	  <input class="event_card_btn" type="submit" value="Посмотреть")">
	</div>`;
  // console.log(test);

  let listEventsElement = document.querySelector(".container_events");
  let eventCardElement = document.createElement("li");
  eventCardElement.className = "event_card";
  eventCardElement.innerHTML = eventCardElements;
  listEventsElement.append(eventCardElement);
  addEventToEl(eventCardElement, objItem.id);
}
function addEventToEl(element, id) {
  let btnEl = element.querySelector(".event_card_btn");
  btnEl.addEventListener("click", function () {
    let urlEvent = window.location.href + "event-page.html?id=" + id;
    window.open(urlEvent);
  });
}
function sliceText(text) {
  let sliced = text.replace(/<\/?[^>]+>/g, "");
  sliced = sliced.slice(0, 60);
  if (sliced.length < text.length) {
    sliced += "...";
  }
  return sliced;
}
// END for create list events on main page
function checkCity(objCity) {
  if (objCity === null) {
    return "";
  } else {
    return objCity.title + ", ";
  }
}
function setDates(objItem) {
  let startDate = new Date(objItem.start_date).toLocaleDateString();
  let endDate = new Date(objItem.end_date).toLocaleDateString();
  if (startDate === endDate) {
    return startDate;
  } else {
    return startDate + " - " + endDate;
  }
}
