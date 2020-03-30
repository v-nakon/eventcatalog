var modalReport = document.querySelector(".container_modal_report");
var closeModalReport = document.querySelector(".close_modal_report");
var btnCreateReport = document.querySelector(".btn_report_error");


btnCreateReport.addEventListener("click", function () {
    modalReport.style.display = "block";
});
closeModalReport.addEventListener("click", function () {
    modalReport.style.display = "none";
});

var emailOrganaizer = document.querySelector("#modal_report_email").value;
var isOrganaizer = document.querySelector("#modal_is_organizer").checked;
var textOrganaizer = document.querySelector("#modal_report_description").value;

document.querySelector("#submit_sent_report").addEventListener("click", function () {
    emailOrganaizer = document.querySelector("#modal_report_email").value;
    isOrganaizer = document.querySelector("#modal_is_organizer").checked;
    textOrganaizer = document.querySelector("#modal_report_description").value;
    let checkEmail = validationEmail(emailOrganaizer);
    let checkText = validationInputText(textOrganaizer);
    if (checkEmail && checkText) {
        sentReport(emailOrganaizer, isOrganaizer, textOrganaizer);
    }
});
function validationEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errorMailReport = document.querySelector("#error_report_email");
    if (!re.test(email)) {
        errorMailReport.innerHTML = 'Введите валидный E-mail!';
        return false;
    } else {
        errorMailReport.innerHTML = '';
        return true;
    }
}
function validationInputText(text) {
    let errorDescReport = document.querySelector("#error_report_description");
    if (text === "") {
        errorDescReport.innerHTML = 'Поле "Сообщение об ошибке" не должно быть пустым!';
        return false;
    } else {
        errorDescReport.innerHTML = '';
        return true;
    }
}
function sentReport(emailOrganaizer, isOrganaizer, textOrganaizer) {
    axios.post("https://eventafisha.com/api/v1/error-message", {
        email: emailOrganaizer,
        comment: textOrganaizer,
        is_organizer: isOrganaizer
    })
        .then(function (response) {
            document.querySelector(".report_success").style.display = "block";
            setTimeout(closeReport, 4000);
        })
        .catch(function (error) {
            document.querySelector(".report_error").style.display = "block";
            setTimeout(closeReport, 4000);
        });
}
function closeReport() {
    modalReport.style.display = "none";
    document.querySelector(".report_success").style.display = "none";
    document.querySelector(".report_error").style.display = "none";
    document.querySelector("#modal_report_email").value = "";
    document.querySelector("#modal_is_organizer").checked = false;
    document.querySelector("#modal_report_description").value = "";
}