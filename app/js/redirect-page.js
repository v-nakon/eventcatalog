let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get("id");

axios
  .get("https://eventafisha.com/api/v1/events/" + idEvent)
  .then(function (response) {
    document.title = response.data.title;
    setTimeout(() => (document.location.href = response.data.buy_link), 4000);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
