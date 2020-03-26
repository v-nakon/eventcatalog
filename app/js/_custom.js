var searchName = document.querySelector("#event_name");
var searchLocation = document.querySelector("#city");
var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");
var spinner = document.querySelector(".block_spinner");
getCities("city");
getCategories();

closeModalNotfound.addEventListener("click", function() {
  modalNotFound.style.display = "none";
  document.location.href = "/";
});

let btnSearch = document.querySelector(".btn_search");
btnSearch.addEventListener("click", () => searchEvent("event_name", "city"));

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
    new Date(objItem.start_date).toLocaleDateString() +
    `</div>
	  <div class="event_card_location">` +
    objItem.address +
    `</div>
	  <input class="event_card_btn" type="submit" value="Посмотреть" onclick="viewEvent(` +
    objItem.id +
    `)">
	</div>`;
  // console.log(test);

  let listEventsElement = document.querySelector(".container_events");
  let eventCardElement = document.createElement("li");
  eventCardElement.className = "event_card";
  eventCardElement.innerHTML = eventCardElements;
  listEventsElement.append(eventCardElement);
}

function getCities(elementSelect) {
  axios
    .get("https://eventafisha.com/api/v1/cities")
    .then(function(response) {
      for (let item in response.data) {
        addOptionSelect(response.data[item], elementSelect);
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}
function getCategories() {
  axios
    .get("https://eventafisha.com/api/v1/categories")
    .then(function(response) {
      for (let item in response.data) {
        addCatToSearch(response.data[item], ".container_category");
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}
// categories for search
function addCatToSearch(item, elementTo) {
  // console.log(item);
  let catElements = document.querySelector(elementTo);
  let newCat = document.createElement("div");
  newCat.classList.add("item_category");
  newCat.setAttribute("category_id", item.id);
  newCat.innerHTML = item.title;
  catElements.appendChild(newCat);
  addEventToElement(newCat, item.id);
}
function addEventToElement(element, catId) {
  element.addEventListener("click", function() {
    delActiveColor();
    console.log("CAT - ", catId);
    element.classList.add("color_active_cat");
    document.querySelector(".arrow_down").classList.add("color_active_cat");
    categorySearch = catId;
    paginationAjax(
      "#pagination",
      nameEventSearch,
      cityEventSearch,
      fromDateSearch,
      toDateSearch,
      categorySearch
    );
  });
}
function delActiveColor() {
  let arrActiveColor = document.querySelectorAll(".color_active_cat");
  console.log("arr", arrActiveColor);
  arrActiveColor.forEach(function(el) {
    el.classList.remove("color_active_cat");
    // console.log("delete class")
  });
}
// end categories for search
function addOptionSelect(item, elementSelect) {
  let selectCategory = document.getElementById(elementSelect);
  let option = document.createElement("option");
  option.value = item.id;
  option.innerHTML = item.title;
  selectCategory.add(option);
}

// search function
var fromDateSearch = "";
var toDateSearch = "";
var nameEventSearch = "";
var cityEventSearch = "";
var categorySearch = "";
var arrElCat = [
  {
    el: document.querySelector("#search_cat_all"),
    id: ""
  },
  {
    el: document.querySelector("#search_cat_main1"),
    id: 4
  },
  {
    el: document.querySelector("#search_cat_main2"),
    id: 20
  },
  {
    el: document.querySelector("#search_cat_main3"),
    id: 21
  }
];
function addListenerToArrEl(arr) {
  for (let i in arr) {
    arr[i].el.addEventListener("click", function() {
      delActiveColor();
      arr[i].el.classList.add("color_active_cat");
      categorySearch = arr[i].id;
      paginationAjax(
        "#pagination",
        nameEventSearch,
        cityEventSearch,
        fromDateSearch,
        toDateSearch,
        categorySearch
      );
    });
  }
}
addListenerToArrEl(arrElCat);

function splitSearchDate(dates) {
  if (dates.indexOf(" - ") > -1) {
    let dateArr = dates.split(" - ");
    fromDateSearch = dateArr[0];
    toDateSearch = dateArr[1];
  } else {
    fromDateSearch = dates;
  }
}
function searchEvent(titleEl, cityEl) {
  nameEventSearch = document.getElementById(titleEl).value;
  cityEventSearch = document.getElementById(cityEl).value;
  // searchRequest(nameEvent, cityEvent);
  paginationAjax(
    "#pagination",
    nameEventSearch,
    cityEventSearch,
    fromDateSearch,
    toDateSearch,
    categorySearch
  );
}
function removeEventList() {
  var listEventEl = document.querySelector(".container_events");
  while (listEventEl.firstChild) {
    listEventEl.removeChild(listEventEl.firstChild);
  }
}

$(function() {
  paginationAjax("#pagination", "", "", "", "", "");
});

function checkSearchParam(title, city, dateStart, dateEnd, category) {
  let link = "https://eventafisha.com/api/v1/events?paginate=";
  if (title !== "") {
    link += "&title=" + title;
  }
  if (city !== "") {
    link += "&city_id=" + city;
  }
  if (dateStart !== "") {
    link += "&date_start=" + dateStart;
  }
  if (dateEnd !== "") {
    link += "&date_end=" + dateEnd;
  }
  if (category !== "") {
    link += "&category_id=" + category;
  }
  return link;
}

function paginationAjax(name, title, city, dateStart, dateEnd, category) {
  let url = checkSearchParam(title, city, dateStart, dateEnd, category);
  var container = $(name);
  container.pagination({
    dataSource: url,
    locator: "data",
    totalNumberLocator: function(dataSource) {
      // you can return totalNumber by analyzing response content
      console.log("test", dataSource.total);
      return dataSource.total;
    },
    pageSize: 24,
    showPageNumbers: true,
    showPrevious: true,
    showNext: true,
    // showNavigator: true,
    showFirstOnEllipsisShow: true,
    showLastOnEllipsisShow: true,
    className: "paginationjs-theme paginationjs-small",
    alias: {
      pageNumber: "page",
      pageSize: "limit"
    },
    ajax: {
      beforeSend: function() {
        // container.prev().html('Загрузка данных');
        spinner.classList.remove("hide_spinner");
      }
    },
    callback: function(response, pagination) {
      // window.console && console.log(22, response, pagination.pageNumber);
      // console.log(pagination.pageNumber);
      // console.log("res len", response.length);
      spinner.classList.add("hide_spinner");
      if (response.length === 0) {
        modalNotFound.style.display = "block";
      } else {
        removeEventList();
        $.each(response, function(index, item) {
          createEventCard(item);
        });
        window.scrollTo(0, 0);
      }
      // searchName.value = "";
      // searchLocation.value = "";

      // if (window.matchMedia("(max-width: 768px)").matches){
      // 	hideSearch();
      // 	searchNameMob.value = "";
      // 	searchLocationMob.value = "";
      // }
    }
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

// search datepicker
let $btn = $(".datepicker_btn"),
  $input = $("#dp"),
  dp = $input
    .datepicker({
      showEvent: "none",
      range: true,

      onSelect: function(dateText, inst) {
        splitSearchDate(dateText);
      },
      minDate: new Date()
    })
    .data("datepicker");

$btn.on("click", function() {
  dp.show();
  dp.clear();
  $input.focus();
});

// Open the dropdown window CATEGORY
var catWindow = document.querySelector(".dropdown_content");
var containerCatWindow = document.querySelector(".container_category");
var btnShowCat = document.querySelector(".dropbtn");

//   btnShowCat.addEventListener("click", function() {
//     catWindow.style.display = "block";
//   });
btnShowCat.addEventListener("click", function() {
  catWindow.classList.toggle("show");
});
// Close the dropdown if the user clicks outside of it CATEGORY
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdown = document.querySelector(".dropdown_content");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
};
//  window.onclick = function(event) {
//    if (!event.target.matches('.dropbtn') && !event.target.matches('.container_category') && !event.target.matches('.item_category')) {
// 	   if (catWindow.classList.contains('show')) {
// 		   catWindow.classList.remove('show');
// 	   }
//    }
//  };
