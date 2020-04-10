import { getEvent } from "./helpers/requests.js";
let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get("id");
getEventData(idEvent);

function getEventData(idEvent) {
  getEvent(idEvent)
    .then((response) => {
      document.title = response.data.title;
      setTimeout(() => (document.location.href = response.data.buy_link), 2000);
    })
    .catch((error) => {
      console.log(error);
    });
}
