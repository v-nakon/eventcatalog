
import { getCategories } from "./requests.js";
import { getTags } from "./requests.js";
import { getCities } from "./requests.js";
import { getSubjects } from "./requests.js";
import { createUserEvent } from "./requests.js";
import { addOptionSelect } from "./help_create_elements.js";

var modal = document.querySelector(".container_modal");
var createEventBtn = document.querySelector(".container_create_event");
var closeModal = document.querySelector(".close_modal");
var modalModeration = document.querySelector(".container_modal_moderation");
var modalModerationError = document.querySelector(".container_modal_error");
var closeModalModeration = document.querySelector(".close_modal_moderation");
var closeModalError = document.querySelector(".close_modal_error");
var submitCreateEvent = document.querySelector("#submit_create_event");
var imgBase64 = "";
// INPUTS VARIABLE
var nameEvent = "";
var startDateEvent = "";
var endDateEvent = "";
var timeEvent = "";
var priceEvent = "";
var categoryEvent = "";
var subjectEvent = "";
var tagsElement = "";
var tagsEvent = [];
var cityEvent = "";
var addressEvent = "";
var descEvent = "";
// let organizerEvent = document.querySelector("#modal_organizer").value;
var urlEvent = "";
var clientName = "";
var clientEmail = "";
var clientTel = "";

// END INPUTS VARIABLE
getCategoriesData();
getTagsData();
getCitiesData();
getSubjectsData();

createEventBtn.addEventListener("click", function () {
  modal.style.display = "block";
});
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});
closeModalModeration.addEventListener("click", function () {
  modalModeration.style.display = "none";
  document.location.href = "/";
});
closeModalError.addEventListener("click", function () {
  modalModerationError.style.display = "none";
  document.location.href = "/";
});
submitCreateEvent.addEventListener("click", function () {
  getModalInputs();
});
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
document.querySelector("#modal_img").addEventListener('change', (event) => {
  getBase64();
});

function getCategoriesData() {
  getCategories().then(response => {
    for (let item in response.data) {
      addOptionSelect(response.data[item], "modal_category");
    };
  }).catch(error => {
    console.log(error);
  })
};
function getTagsData() {
  getTags().then(response => {
    for (let item in response.data) {
      addOptionSelect(response.data[item], "modal_tags");
    };
  }).catch(error => {
    console.log(error);
  })
};
function getCitiesData() {
  getCities().then(response => {
    for (let item in response.data) {
      addOptionSelect(response.data[item], "modal_city");
    };
  }).catch(error => {
    console.log(error);
  })
};
function getSubjectsData() {
  getSubjects().then(response => {
    for (let item in response.data) {
      addOptionSelect(response.data[item], "modal_subject");
    };
  }).catch(error => {
    console.log(error);
  })
};

function createEvent() {
  let newStartDate = dateForRequest(startDateEvent);
  let newEndDate = dateForRequest(endDateEvent);
  let meta = {
    title: nameEvent,
    start_date: newStartDate,
    end_date: newEndDate,
    time: timeEvent,
    address: addressEvent,
    cost: priceEvent,
    city_id: cityEvent,
    category_id: categoryEvent,
    subject_id: subjectEvent,
    tags: tagsEvent, //array
    buy_link: urlEvent,
    desc: descEvent,
    image: imgBase64, //file
    organizer_fio: clientName,
    organizer_phone: clientTel,
    organizer_email: clientEmail
  }
  createUserEvent(meta).then(response => {
    modal.style.display = "none";
    modalModeration.style.display = "block";
  }).catch(error => {
    console.log(error);
    modalModerationError.style.display = "block";
  })
}
function getBase64() {
  let file = document.querySelector("#modal_img").files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    imgBase64 = reader.result;
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
};
function getModalInputs() {
  nameEvent = document.querySelector("#modal_event_name").value;
  priceEvent = document.querySelector("#modal_price").value;
  categoryEvent = document.querySelector("#modal_category").value;
  subjectEvent = document.querySelector("#modal_subject").value;
  tagsElement = document.querySelector("#modal_tags");
  cityEvent = document.querySelector("#modal_city").value;
  addressEvent = document.querySelector("#modal_address").value;
  descEvent = document.querySelector("#modal_description").value;
  urlEvent = document.querySelector("#modal_url").value;
  clientName = document.querySelector("#modal_client_name").value;
  clientEmail = document.querySelector("#modal_client_email").value;
  clientTel = document.querySelector("#modal_client_tel").value;
  for (var i = 0; i < tagsElement.length; i++) {
    if (tagsElement.options[i].selected) tagsEvent.push(tagsElement.options[i].value);
  };
  inputsValidation();
};
function validateDate(value) {
  console.log(value);
  var arrD = value.split(".");
  arrD[1] -= 1;
  var d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {
    return false;
  }
}
function dateForRequest(date) {
  if (date !== '') {
    let arr = date.split(".");
    let newDate = arr[2] + '-' + arr[1] + '-' + arr[0];
    return newDate;
  }
  return date;
}
function inputsValidation() {
  let errorTitle = document.querySelector("#error_title");
  let errorStartDate = document.querySelector("#error_start_date");
  let errorPrice = document.querySelector("#error_price");
  let errorCategory = document.querySelector("#error_category");
  let errorSubject = document.querySelector("#error_subject");
  let errorTags = document.querySelector("#error_tags");
  let errorCity = document.querySelector("#error_city");
  let errorAddress = document.querySelector("#error_address");
  let errorDescription = document.querySelector("#error_description");
  let errorImg = document.querySelector("#error_img");
  let errorUrl = document.querySelector("#error_url");
  let errorClientName = document.querySelector("#error_client_name");
  let errorClientEmail = document.querySelector("#error_client_email");
  if (nameEvent === "") {
    errorTitle.innerHTML = 'Поле "Название мероприятия" не должно быть пустым!';
    return;
  } else {
    errorTitle.innerHTML = '';
  }
  if (validateDate(startDateEvent)) {
    errorStartDate.innerHTML = '';
  } else {
    errorStartDate.innerHTML = 'Поле "Дата начала мероприятия" пустое или имеет не правильный формат!';
    return;
  }
  if (priceEvent === "") {
    errorPrice.innerHTML = 'Поле "Цена мероприятия" не должно быть пустым!';
    return;
  } else {
    errorPrice.innerHTML = '';
  }
  if (categoryEvent === "") {
    errorCategory.innerHTML = 'Поле "Категория мероприятия" не должно быть пустым!';
    return;
  } else {
    errorCategory.innerHTML = '';
  }
  if (subjectEvent === "") {
    errorSubject.innerHTML = 'Поле "Тематика мероприятия" не должно быть пустым!';
    return;
  } else {
    errorSubject.innerHTML = '';
  }
  if (tagsEvent === "") {
    errorTags.innerHTML = 'Поле "Теги мероприятия" не должно быть пустым!';
    return;
  } else {
    errorTags.innerHTML = '';
  }
  if (cityEvent === "") {
    errorCity.innerHTML = 'Поле "Город мероприятия" не должно быть пустым!';
    return;
  } else {
    errorCity.innerHTML = '';
  }
  if (addressEvent === "") {
    errorAddress.innerHTML = 'Поле "Адрес мероприятия" не должно быть пустым!';
    return;
  } else {
    errorAddress.innerHTML = '';
  }
  if (descEvent === "") {
    errorDescription.innerHTML = 'Поле "Описание мероприятия" не должно быть пустым!';
    return;
  } else {
    errorDescription.innerHTML = '';
  }
  if (imgBase64 === "") {
    errorImg.innerHTML = 'Загрузите картинку мероприятия!';
    return;
  } else {
    errorImg.innerHTML = '';
  }
  if (urlEvent === "") {
    errorUrl.innerHTML = 'Поле "Ссылка на покупку билета" не должно быть пустым!';
    return;
  } else {
    errorUrl.innerHTML = '';
  }
  if (clientName === "") {
    errorClientName.innerHTML = 'Поле "Имя" не должно быть пустым!';
    return;
  } else {
    errorClientName.innerHTML = '';
  }
  if (clientEmail === "") {
    errorClientEmail.innerHTML = 'Поле "Электронная почта" не должно быть пустым!';
    return;
  } else {
    errorClientEmail.innerHTML = '';
  }
  createEvent();
};
$(function () {
  $('.datepicker_event_start').datepicker({
    onSelect: function (dateText, inst) {
      startDateEvent = dateText;
    },
    minDate: new Date(),
    autoClose: true
  });
});

$(function () {
  $('.datepicker_event_end').datepicker({
    onSelect: function (dateText, inst) {
      endDateEvent = dateText;
    },
    minDate: new Date(),
    autoClose: true
  });
});
$('.datepicker_time').datepicker({
  timepicker: true,
  onlyTimepicker: true,
  classes: 'only-timepicker',
  onSelect: function (dateText, inst) {
    timeEvent = dateText;
  },
});