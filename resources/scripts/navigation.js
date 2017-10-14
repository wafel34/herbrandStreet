NAVIGATION = {
    checkbox: document.getElementById('menu-checkbox')
}

//if user left navigation and event source was Contact link, hide navigation
NAVIGATION.hideFocus = function(e) {
    if (!e.srcElement) {
        if (e.target.hash === '#contact-header') {
            this.checkbox.checked = false;
        }
    } else {
        if (e.srcElement.hash === '#contact-header') {
            this.checkbox.checked = false;
        }
    }
};

//if youser clicked on a link, hide navigation
NAVIGATION.hideClick = function(e) {
    if (!e.srcElement) {
        if (e.target.href) {
            this.checkbox.checked = false;
        }
    } else {
        if (e.srcElement.href) {
            this.checkbox.checked = false;
        }
    }
};

//close navigation if clicked outside menu
NAVIGATION.hideClickOut = function(e) {
    if (this.checkbox.checked) {
        if (!e.srcElement) {
            if (e.target.className !== 'menu__label' && e.target.className !== 'menu__checkbox' ) {
                if (e.target.className !== 'menu-list') {
                    this.checkbox.checked = false;
                }
            }
        } else {
            if (e.srcElement.className !== 'menu__label' && e.srcElement.className !== 'menu__checkbox' ) {
                if (e.srcElement.className !== 'menu-list') {
                    this.checkbox.checked = false;
                }
            }
        }
    }

    //if (this.checkbox.checked &&)
};
