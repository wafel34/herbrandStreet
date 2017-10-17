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

    this.showConfirmation();
    this.send(config);
};


CONTACT.showConfirmation = function () {
    this.name.value = null;
    this.email.value = null;
    this.message.value = null;

    this.infoDiv.classList.remove('form-submitted--hidden');
    this.infoDiv.classList.add('form-submitted--visible');

    this.name.disabled = true;
    this.email.disabled = true;
    this.message.disabled = true;
    this.submit.disabled = true;


    this.button.addEventListener('click', function(){
        this.infoDiv.classList.remove('form-submitted--visible');
        this.infoDiv.classList.add('form-submitted--hidden');

        this.name.disabled = false;
        this.email.disabled = false;
        this.message.disabled = false;
        this.submit.disabled = false;
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
               alert(xhr.responseText);
           }
    };

    xhr.open('POST', '/');
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(data);
};
