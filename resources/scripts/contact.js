var CONTACT = {
    name: document.getElementById('personName'),
    email: document.getElementById('personEmail'),
    message: document.getElementById('personMessage'),
    submit: document.getElementById('form__submit-button'),
    button: document.getElementById('close-confirmation-button'),
    infoDiv:  document.getElementById('form-submitted')
};

CONTACT.validate = function(e) {
    e.preventDefault();
    var config = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    this.send(config);
};


CONTACT.showConfirmation = function () {
    this.name.value = null;
    this.email.value = null;
    this.message.value = null;

    this.infoDiv.classList.remove('form-submitted--hidden');
    this.infoDiv.classList.add('form-submitted--visible');

    this.button.addEventListener('blur', function(e){
        if (e.keyCode !== 13) {
            this.button.focus();
        }
    }.bind(this), false);


    this.button.addEventListener('click', function(){
        this.infoDiv.classList.remove('form-submitted--visible');
        this.infoDiv.classList.add('form-submitted--hidden');


    }.bind(this), false);

    setTimeout(function(){
        this.button.focus();
    }.bind(this), 300);
};

CONTACT.send = function(config) {

    var data = JSON.stringify(config);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200)
           {
               this.showConfirmation();
           } else if (xhr.readyState === 4 && xhr.status !== 200){
               alert('Ooops, there was and error: ' + xhr.responseText +'\nPlease try again, or email us manually at herbrandapartment@gmail.com\nThank you.');
           }
    }.bind(this);

    xhr.open('POST', '/');
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(data);
};
