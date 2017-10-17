var CONTACT = {
    name: document.getElementById('personName'),
    email: document.getElementById('personEmail'),
    message: document.getElementById('personMessage'),
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
