import { addOptionSelect } from "./helpers/help_create_elements.js";
import { createEventCard } from "./helpers/help_create_elements.js";
import { getCategories } from "./helpers/requests.js";
import { getCities } from "./helpers/requests.js";
import { getSubjects } from "./helpers/requests.js";
import { addCatToSearch } from "./helpers/category_search_block.js";

var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");
var spinner = document.querySelector(".block_spinner");
getCitiesData();
getCategoriesData();
getSubjectsData();

closeModalNotfound.addEventListener("click", function () {
  modalNotFound.style.display = "none";
  document.location.href = "/";
});

let btnSearch = document.querySelector(".btn_search");
btnSearch.addEventListener("click", () =>
  searchEvent("event_name", "city", "subject_search")
);

function getCitiesData() {
  getCities()
    .then((response) => {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "city");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function getSubjectsData() {
  getSubjects()
    .then((response) => {
      for (let item in response.data) {
        addOptionSelect(response.data[item], "subject_search");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function getCategoriesData() {
  getCategories()
    .then((response) => {
      for (let item in response.data) {
        addCatToSearch(response.data[item], ".container_category");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// search function
export var fromDateSearch = "";
export var toDateSearch = "";
export var nameEventSearch = "";
export var cityEventSearch = "";
export var categorySearch = "";
export var subjectSearch = "";
export function setCategorySearch(value) {
  categorySearch = value;
}
function splitSearchDate(dates) {
  if (dates.indexOf(" - ") > -1) {
    let dateArr = dates.split(" - ");
    fromDateSearch = dateArr[0];
    toDateSearch = dateArr[1];
  } else {
    fromDateSearch = dates;
  }
}
function searchEvent(titleEl, cityEl, subjectEl, searchCityID) {
  nameEventSearch = document.getElementById(titleEl).value;
  if (searchCityID === undefined) {
    cityEventSearch = document.getElementById(cityEl).value;
  } else {
    cityEventSearch = searchCityID;
  }
  subjectSearch = document.getElementById(subjectEl).value;
  paginationAjax(
    "#pagination",
    nameEventSearch,
    cityEventSearch,
    fromDateSearch,
    toDateSearch,
    categorySearch,
    subjectSearch
  );
}
function removeEventList() {
  var listEventEl = document.querySelector(".container_events");
  while (listEventEl.firstChild) {
    listEventEl.removeChild(listEventEl.firstChild);
  }
}

function checkSearchParam(title, city, dateStart, dateEnd, category, subject) {
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
  if (subject !== "") {
    link += "&subject_id=" + subject;
  }
  return link;
}

export function paginationAjax(
  name,
  title,
  city,
  dateStart,
  dateEnd,
  category,
  subject
) {
  let url = checkSearchParam(
    title,
    city,
    dateStart,
    dateEnd,
    category,
    subject
  );
  var container = $(name);
  container.pagination({
    dataSource: url,
    locator: "data",
    totalNumberLocator: function (dataSource) {
      // you can return totalNumber by analyzing response content
      // console.log("test", dataSource.total);
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
      pageSize: "limit",
    },
    ajax: {
      beforeSend: function () {
        // container.prev().html('Загрузка данных');
        spinner.classList.remove("hide_spinner");
      },
    },
    callback: function (response, pagination) {
      // window.console && console.log(22, response, pagination.pageNumber);
      // console.log(pagination.pageNumber);
      // console.log("res len", response.length);
      spinner.classList.add("hide_spinner");
      if (response.length === 0) {
        modalNotFound.style.display = "block";
      } else {
        removeEventList();
        $.each(response, function (index, item) {
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
    },
  });
}

// search datepicker
let $btn = $(".datepicker_btn"),
  $input = $("#dp"),
  dp = $input
    .datepicker({
      showEvent: "none",
      range: true,

      onSelect: function (dateText, inst) {
        splitSearchDate(dateText);
      },
      minDate: new Date(),
    })
    .data("datepicker");

$btn.on("click", function () {
  dp.show();
  dp.clear();
  $input.focus();
});

document.addEventListener("keydown", pushEnterBtn);
function pushEnterBtn(event) {
  if (event.which == 13 || event.keyCode == 13) {
    let getElTag = document.activeElement.tagName;
    if (getElTag === "INPUT" || getElTag === "SELECT") {
      searchEvent("event_name", "city", "subject_search");
    }
  }
}

let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let categoryIdParam = urlParams.get("cat_id");
let cityIdParam = urlParams.get("city_id");
// console.log(cityIdParam);
if (categoryIdParam !== null) {
  categorySearch = categoryIdParam;
  searchEvent("event_name", "city", "subject_search");
} else if (cityIdParam !== null) {
  searchEvent("event_name", "city", "subject_search", cityIdParam);
} else {
  paginationAjax("#pagination", "", "", "", "", "", "");
}
