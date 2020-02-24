var searchName = document.querySelector("#event_name");
var searchLocation = document.querySelector("#city");
var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");
var datepickerStart = "";
var datepickerEnd = "";
getCities("city");

closeModalNotfound.addEventListener("click", function() {
	modalNotFound.style.display = "none";
	document.location.href = "/";
  });

let btnSearch = document.querySelector(".btn_search");
btnSearch.addEventListener('click',() => searchEvent("event_name", "city", datepickerStart, datepickerEnd));

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
	  <div class="event_card_tag">` + objItem.category.title + `</div>
	  <div class="event_card_date">` + new Date(objItem.start_date).toLocaleDateString() + `</div>
	  <div class="event_card_location">` + objItem.address + `</div>
	  <input class="event_card_btn" type="submit" value="Посмотреть" onclick="viewEvent(`+ objItem.id +`)">
	</div>`;
	// console.log(test);

	let listEventsElement = document.querySelector(".container_events");
	let eventCardElement = document.createElement('li');
	eventCardElement.className = "event_card";
	eventCardElement.innerHTML = eventCardElements;
  	listEventsElement.append(eventCardElement);
}

function getCities(elementSelect) {
    axios.get('https://eventafisha.com/api/v1/cities')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], elementSelect);
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
function addOptionSelect(item, elementSelect) {
    let selectCategory = document.getElementById(elementSelect);
    let option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.title;
    selectCategory.add(option);
  }

// для поиска по названию/городу
function searchEvent(titleEl, cityEl, dateStart, dateEnd) {
	let nameEvent = document.getElementById(titleEl).value;
	let cityEvent = document.getElementById(cityEl).value;
	// searchRequest(nameEvent, cityEvent);
	paginationAjax('#pagination', nameEvent, cityEvent, dateStart, dateEnd, "");
}
function removeEventList() {
	var listEventEl = document.querySelector(".container_events");
	while (listEventEl.firstChild) {
		listEventEl.removeChild(listEventEl.firstChild);
	}
}

$(function() {
	paginationAjax('#pagination', '', '', '', '', '');
});

function checkSearchParam(title, city, dateStart, dateEnd, category) {
	let link = "https://eventafisha.com/api/v1/events?paginate=";
	if(title !== "") {
		link += "&title=" + title;
	}
	if(city !== "") {
		link += "&city_id=" + city;
	}
	if(dateStart !== "") {
		link += "&date_start=" + dateStart;
	}
	if(dateEnd !== "") {
		link += "&date_end=" + dateEnd;
	}
	if(category !== "") {
		link += "&category_id=" + category;
	}
	return link;
};

function paginationAjax(name, title, city, dateStart, dateEnd, category) {
	let url = checkSearchParam(title, city, dateStart, dateEnd, category);
	var container = $(name);
	container.pagination({
	  dataSource: url,
	  locator: 'data',
	  totalNumberLocator: function(dataSource) {
		// you can return totalNumber by analyzing response content
		console.log("test", dataSource.total)
		return dataSource.total;
	},
	  pageSize: 20,
	  showPageNumbers: true,
	  showPrevious: true,
	  showNext: true,
	  // showNavigator: true,
	  showFirstOnEllipsisShow: true,
	  showLastOnEllipsisShow: true,
	  className: 'paginationjs-theme paginationjs-small',
	  alias: {
	  	pageNumber: 'page',
		pageSize: 'limit',
	  },
	  ajax: {
		// beforeSend: function() {
		//   container.prev().html('Загрузка данных');
		// }
	  },
	  callback: function(response, pagination) {
		// window.console && console.log(22, response, pagination.pageNumber);
		// console.log(pagination.pageNumber);
		// console.log("res len", response.length);
		if(response.length === 0) {
			modalNotFound.style.display = "block";
		} else {
			removeEventList();
			$.each(response, function (index, item) {
				createEventCard(item);
			});
		}
		searchName.value = "";
		searchLocation.value = "";
		datepickerStart = "";
		datepickerEnd = "";
		
		// if (window.matchMedia("(max-width: 768px)").matches){
		// 	hideSearch();
		// 	searchNameMob.value = "";
		// 	searchLocationMob.value = "";
		// }
	  }
	})
  };

  $(function(){
	$('.datepicker-start').datepicker({
	   onSelect: function (dateText, inst) {
		//   console.log(dateText)
		  datepickerStart = dateText;
	   },
	   minDate: new Date()
	});
 });

 $(function(){
	$('.datepicker-end').datepicker({
	   onSelect: function (dateText, inst) {
		//   console.log(dateText)
		  datepickerEnd = dateText;
	   },
	   minDate: new Date()
	});
 });