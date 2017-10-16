NAVIGATION = {
    checkbox: document.getElementById('menu-checkbox')
};

//if user left navigation and event source was Contact link, hide navigation
NAVIGATION.hideFocus = function(e) {
    var source = e.target || e.srcElement;
        if (source.hash === '#contact-header') {
            this.checkbox.checked = false;
        }
};

//if youser clicked on a link, hide navigation
NAVIGATION.hideClick = function(e) {
    var source = e.target || e.srcElement;
        if (source.href) {
            this.checkbox.checked = false;
        }
};

//close navigation if clicked outside menu
NAVIGATION.hideClickOut = function(e) {
    var source = e.target || e.srcElement;
    if (this.checkbox.checked) {
        if (source.className !== 'menu__label' && source.className !== 'menu__checkbox' ) {
            if (source.className !== 'menu-list') {
                this.checkbox.checked = false;
            }
        }
    }

    //if (this.checkbox.checked &&)
};
