axios.get('https://eventafisha.com/api/v1/events')
  .then(function (response) {
    // handle success
	console.log(response.data);
	for(let item in response.data) {
		createEventCard(response.data[item]);
	};
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
// request end
function viewEvent(id) {
	console.log("ID", id);
	console.log(window.location.href);
	let urlEvent = window.location.href + "event-page.html?id=" + id;
	window.open(urlEvent);
}

function createEventCard(objItem) {
	let eventCardElements = 
	`
	<div class="event_card_content">
	  <img src="https://eventafisha.com/storage/` + objItem.images + `" alt="" class="event_card_img">
	  <div class="event_card_title">` + objItem.title + `</div>
	  <div class="event_card_tag">Webinar</div>
	  <div class="event_card_date">` + objItem.start_date + `</div>
	  <div class="event_card_location">` + objItem.address + `</div>
	  <input class="event_card_btn" type="submit" value="View event" onclick="viewEvent(`+ objItem.id +`)">
	</div>`;
	// console.log(test);

	let listEventsElement = document.querySelector(".container_events");
	let eventCardElement = document.createElement('li');
	eventCardElement.className = "event_card";
	eventCardElement.innerHTML = eventCardElements;
  	listEventsElement.append(eventCardElement);
}
