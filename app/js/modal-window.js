
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
var tagsElement = "";
var tagsEvent = [];
var cityEvent = "";
var addressEvent = "";
var descEvent = "";
var imgEvent = "";
// let organizerEvent = document.querySelector("#modal_organizer").value;
var urlEvent = "";
var clientName = "";
var clientEmail = "";
var clientTel = "";

// END INPUTS VARIABLE
getCategories();
getTags();
getCities();

createEventBtn.addEventListener("click", function() {
    modal.style.display = "block";
});
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});
closeModalModeration.addEventListener("click", function() {
  modalModeration.style.display = "none";
  document.location.href = "/";
});
closeModalError.addEventListener("click", function() {
  modalModerationError.style.display = "none";
  document.location.href = "/";
});
submitCreateEvent.addEventListener("click", function() {
  getModalInputs();
});
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

function getCategories() {
    axios.get('https://eventafisha.com/api/v1/categories')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], "modal_category");
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
function getTags() {
    axios.get('https://eventafisha.com/api/v1/tags')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], "modal_tags");
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
function getCities() {
    axios.get('https://eventafisha.com/api/v1/cities')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], "modal_city");
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
function createEvent() {
  axios.post('https://eventafisha.com/api/v1/events', {
        title: nameEvent,
        start_date: startDateEvent,
        end_date: endDateEvent,
        time: timeEvent,
        address: addressEvent,
        cost: priceEvent,
        city_id: cityEvent,
        category_id: categoryEvent,
        tags: tagsEvent, //array
        // organizer_id: organizerEvent,
        buy_link: urlEvent,
        desc: descEvent,
        image: imgEvent, //file
        organizer_fio: clientName,
        organizer_phone: clientTel,
        organizer_email: clientEmail
     })
     .then(function (response) {
        console.log(response);
        modal.style.display = "none";
        modalModeration.style.display = "block";
     })
     .catch(function (error) {
        console.log(error);
        modalModerationError.style.display = "block";
     });
};
function addOptionSelect(item, elementSelect) {
    let selectCategory = document.getElementById(elementSelect);
    let option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.title;
    selectCategory.add(option);
  }
function getBase64() {
   let file = document.querySelector("#modal_img").files[0];
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
    //  console.log(reader.result);
     imgBase64 = reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
};
function getModalInputs() {
  nameEvent = document.querySelector("#modal_event_name").value;
  startDateEvent = document.querySelector("#modal_start_date").value;
  endDateEvent = document.querySelector("#modal_end_date").value;
  timeEvent = document.querySelector("#modal_time").value;
  priceEvent = document.querySelector("#modal_price").value;
  categoryEvent = document.querySelector("#modal_category").value;
  tagsElement = document.querySelector("#modal_tags");
  cityEvent = document.querySelector("#modal_city").value;
  addressEvent = document.querySelector("#modal_address").value;
  descEvent = document.querySelector("#modal_description").value;
  imgEvent = imgBase64;
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
function inputsValidation() {
  let errorTitle = document.querySelector("#error_title");
  let errorStartDate = document.querySelector("#error_start_date");
  let errorPrice = document.querySelector("#error_price");
  let errorCategory = document.querySelector("#error_category");
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
  if(validateDate(new Date(startDateEvent).toLocaleDateString())) {
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
