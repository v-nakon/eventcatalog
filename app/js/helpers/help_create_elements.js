export function addOptionSelect(item, elementSelect) {
  let selectCategory = document.getElementById(elementSelect);
  let option = document.createElement("option");
  option.value = item.id;
  option.innerHTML = item.title;
  selectCategory.add(option);
};

// for create list events on main page
export function createEventCard(objItem) {
  let listEventsElement = document.querySelector(".container_list_events");
  let costEvent = checkCostEvent(objItem.cost);
  let eventCardElements =
    `<div class="event_card_date_info">
      <div class="event_card_date">
          <img class="event_card_img" src="https://eventafisha.com/storage/` +
    objItem.images +
    `" alt="title">
          <div class="event_time">` +
    new Date(objItem.start_date).toLocaleDateString() +
    `</div>
      </div>
      <div class="event_card_info">
          <div class="event_title_tag">
              <div class="title_img_mob">
                  <img class="event_card_img_mob" src="https://eventafisha.com/storage/` +
    objItem.images +
    `" alt="title">
                  <div class="event_title">` +
    objItem.title +
    `</div>
              </div>
              <div class="event_tag">` +
    objItem.category.title +
    `</div>
          </div>
          <div class="event_time_mob">` +
    new Date(objItem.start_date).toLocaleDateString() +
    `</div>
          <div class="event_location_price">
              <div class="event_location">
                  <svg xmlns="http://www.w3.org/2000/svg" class="location_icon" viewBox="0 0 24 24"><path fill="#666" d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                  <div class="location_name">` + checkCity(objItem.city) +
    objItem.address +
    `</div>
              </div>`
    + costEvent +
    `</div>
      <div class="tags_info">` +
    createTagsElement(objItem.tags) +
    `</div>
      </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="info_icon" viewBox="0 0 24 24"><path class="info_icon_color" d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>`;
  // console.log(test);

  let eventCardElement = document.createElement("a");
  eventCardElement.setAttribute("target", "_blank");
  eventCardElement.href = "/event-page.html?id=" + objItem.id;
  eventCardElement.className = "event_card";
  eventCardElement.innerHTML = eventCardElements;
  listEventsElement.append(eventCardElement);
};
function checkCostEvent(cost) {
  let tempEl = `<div class="event_price">
    <svg xmlns="http://www.w3.org/2000/svg" class="price_icon" viewBox="0 0 24 24"><path fill="#666" d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></svg>
    <div class="price">` +
    cost +
    `
    </div>
    </div>`;
  if (cost == 0) {
    return "";
  } else {
    return tempEl;
  }
};
function createTagsElement(arr) {
  let tags = "";
  for (let i = 0; i < arr.length; i++) {
    // console.log("tags", arr[i].title);
    tags += '<div class="event_tag green_tag_info">' + arr[i].title + "</div>";
  }
  // console.log(tags);
  return tags;
};
// END for create list events on main page
function checkCity(objCity) {
  if (objCity === null) {
    return "";
  } else {
    return objCity.title + ", ";
  }
}