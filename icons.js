class IconSelect {

    // Option Defaults
    place = 'attached'; // 'attached', 'top', 'center', 'bottom'
    attachTo = '.icon-select'; // An element id or class
    attachPosition = 'bottom-middle'; // top-left, top-middle, top-right, bottom-left, bottom-middle, bottom-right, left, right
    chevronShow = true; // TODO unimplemented
    addIcons = null; // 'additional' or 'replace'
    displayType = 'hover'; // click, hover
    debug = false;


    // Icons 
    icons = [{
        classes: "fab fa-github",
        searchTerms: ['repository', 'code']
    }];
    selected = null; // Select icon object

    // Elements
    element = null;
    parent = null;

    // Positioning
    top = 0;
    left = 0;
    offset = 6; // in px
    mouseover = 16; // in px
    chevronTop = 0; // TODO unimplemented
    chevronLeft = 0; // TODO unimplemented
    chevronRotate = 0; // TODO unimplemented

    // Constructor
    constructor(settings = {}) {

        // Option Defaults
        this.place = (settings.place) ? settings.place : this.place;
        this.attachTo = (settings.attachTo) ? settings.attachTo : this.attachTo;
        this.attachPosition = (settings.attachPosition) ? settings.attachPosition : this.attachPosition;
        this.chevronShow = (settings.chevronShow) ? settings.chevronShow : this.chevronShow;
        this.addIcons = (settings.addIcons) ? settings.addIcons : this.addIcons;
        this.displayType = (settings.displayType) ? settings.displayType : this.displayType;
        this.debug = (settings.debug) ? settings.debug : this.debug;

        // If we're adding icons on to the class basics
        if (settings.addIcons == 'additional') {
            this.icons = this.icons.concat(settings.icons);
        } else if (settings.addIcons == 'replace') {
            this.icons = settings.icons;
        }

        // Positioning defaults
        this.offset = (settings.offset) ? settings.offset : this.offset;

        // Apply handlers
        this.bind();

    }

    // Creation
    createElement(parent) {

        if (this.debug) {
            console.log('Starting create element for parent :', parent);
        }

        // Set parent
        this.parent = parent;

        // Create element
        let html = '';
        let header = 'Icon Picker';
        let htmlClass = '';

        // If we're in a flex option, open the container and set class, if not, just class
        if (this.place == 'top' || this.place == 'center' || this.place == 'bottom') {
            htmlClass = 'icon-select-flex hide';
            html += '<div class="icon-select-container';
            if (this.place == 'top') {
                html += ' top';
            } else if (this.place == 'center') {
                html += ' center';
            } else if (this.place == 'bottom') {
                html += ' bottom';
            }
            html += '">';
        } else {
            html += '<div class="icon-select-mouseover hide">'
            htmlClass = 'icon-select-absolute';
        };

        // Create the picker and icon html
        html +=
            '<section class="' +
            htmlClass +
            '">' +
            '<header>' +
            header +
            '<input type="text" class="input icon-select-search" placeholder="Type to filter">' +
            '</header>' +
            '<div class="icon-select-icons">' +
            this.createIcons(this.icons) +
            '</div > </section>';

        // If we're in a flex option, close the container
        if (this.place == 'top' || this.place == 'center' || this.place == 'bottom') {
            html += '</div>';
        };


        // Attach/place element
        if (this.place == 'attached') {

            // Get parent's parent div and add html as sibling html
            this.parent.innerHTML = this.parent.innerHTML + html;

            // Set reference to element
            this.element = this.target(".icon-select-mouseover");

            // Set event handlers for new content
            this.iconClick();
            this.searchKeyDown();

            // Attach the element to it's parent
            this.attachToParent();

        } else if (this.place == 'inline') {

        } else if (this.place == 'top' || this.place == 'center' || this.place == 'bottom') {

            // Get parent's parent div and add html as sibling html
            this.parent.innerHTML = this.parent.innerHTML + html;

            // Set reference to element
            this.element = document.getElementsByClassName("icon-select-flex")[0];

            // Set event handlers for new content
            this.containerClick();
            this.iconClick();
            this.searchKeyDown();

        } else {

            console.log('this.place malformed');

        }

        // Show element
        this.toggle();

    }
    createIcons(icons) {
        let iconsString = '';

        icons.forEach(icon => {

            let iconHtml =
                '<span class="icon-select-icon" title="' +
                this.classText(icon.classes) +
                '">' +
                '<i class="' + icon.classes + '" ></i>' +
                '</span>';

            iconsString += iconHtml;

        });

        return iconsString;
    }
    getParent() {

    }

    // Formatting
    classText(classes) {
        let classText = '.';

        classes = classes.replace(' ', ' .');
        classText = classText.concat(classes);

        return classText;
    }
    targetName(name) {
        name = name.replace('#', '');
        return name.replace('.', '');
    }

    // Target Acquisition
    target(name) {
        return document.getElementsByClassName(this.targetName(name))[0];
    }
    targets(name) {
        return document.getElementsByClassName(this.targetName(name));
    }
    targetActivated(target) {
        if (this.element == null) {
            this.createElement(target);
        } else {
            this.toggle();
        }
    }

    // Visibility
    toggle() {
        if (!this.element.classList.contains("hide")) {
            this.remove();
        } else {
            this.element.classList.remove("hide");
        }
    }
    remove() {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
    }
    clickRemove() {
        var element = this.target(".icon-select-container");
        element.parentNode.removeChild(element);
    }

    // Positioning
    attachToParent() {

        // Positions absolutely positioned icon-select based on this.attachTo
        let parent = this.target(this.attachTo);
        let parent_bound = parent.getBoundingClientRect();

        let el = this.target("icon-select-mouseover");
        let el_bound = el.getBoundingClientRect();

        if (this.attachPosition == 'top-left') {

            this.top = parent_bound.top - el_bound.height - this.offset;
            this.left = parent_bound.left;

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'top-middle') {

            this.top = parent_bound.top - el_bound.height - this.offset;
            this.left = parent_bound.left + (parent_bound.width / 2) - (el_bound.width / 2);

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'top-right') {

            this.top = parent_bound.top - el_bound.height - this.offset;
            this.left = parent_bound.left + parent_bound.width - (el_bound.width);

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'bottom-left') {

            this.top = parent_bound.top + parent_bound.height + this.offset;
            this.left = parent_bound.left;

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'bottom-middle') {

            this.top = parent_bound.top + parent_bound.height + this.offset;
            this.left = parent_bound.left + (parent_bound.width / 2) - (el_bound.width / 2);

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'bottom-right') {

            this.top = parent_bound.top + parent_bound.height + this.offset;
            this.left = parent_bound.left + parent_bound.width - (el_bound.width);

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'left') {

            this.top = parent_bound.top + (parent_bound.height / 2) - (el_bound.height / 2); // check
            this.left = parent_bound.left - el_bound.width - this.margin;

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        } else if (this.attachPosition == 'right') {

            this.top = parent_bound.top + (parent_bound.height / 2) - (el_bound.height / 2);
            this.left = parent_bound.left + parent_bound.width + this.margin;

            if (this.displayType == 'hover') {
                this.top = this.top - this.mouseover;
                this.left = this.left - this.mouseover;
            }

        }

        if (this.debug) {
            console.log('left :', this.left, 'top :', this.top);
        }

        // Add a margin for mouseover if we're in hover mode
        let pos_string;

        if (this.displayType == 'hover') {
            pos_string = 'top: ' + this.top + 'px; left: ' + this.left + 'px; padding: ' + this.mouseover + 'px;';
        } else {
            pos_string = 'top: ' + this.top + 'px; left: ' + this.left + 'px;';
        }

        // Apply style
        this.element.style.cssText = pos_string;
    }
    getOffsetPosition() {
        // Not used currently
        // -------------

        let el = target(this.attachTo);

        return {
            top: el.offsetTop,
            left: el.offsetLeft
        };
    }

    // Icon Filtering
    filterIcons() {
        let filter = this.target('.icon-select-search').value.toString().toLowerCase();
        let filteredIcons = [];

        // Iterate through icons and filter
        if (filter !== "") {

            filteredIcons = this.icons.filter(icon => {

                if (icon.classes.includes(filter)) return true;

                icon.searchTerms.forEach(term => {
                    if (term.includes(filter)) return true;
                });

            });

            let display = (filteredIcons.length > 0) ? this.createIcons(filteredIcons) : '<div>No Icons Found</div>'

            this.target('.icon-select-icons').innerHTML = display;
        } else {
            this.target('.icon-select-icons').innerHTML = this.createIcons(this.icons);
        }


    }

    // Listeners
    searchKeyDown() {
        let searches = this.targets("icon-select-search");

        for (let search of searches) {
            search.addEventListener("keyup", event => {
                this.filterIcons();
            });
        }
    }
    attachToHover() {
        let elements = this.targets(this.attachTo);

        for (let element of elements) {
            element.addEventListener("mouseenter", event => {
                if (this.element == null) {
                    this.createElement(element);
                }
            });

            element.addEventListener("mouseleave", event => {
                if (element !== event.target) return;
                this.toggle();
            }, true);
        }
    }
    attachToClick() {
        let elements = this.targets(this.attachTo);

        for (let element of elements) {
            element.addEventListener("click", event => {
                this.targetActivated(element);
            });
        }
    }
    iconClick() {
        let icons = this.targets("icon-select-icon");

        for (let icon of icons) {
            icon.addEventListener("click", event => {
                this.selected = icon.getAttribute('title');
                this.toggle();

                if (this.debug) console.log('{IconSelect}.selected :', this.selected);
            });
        }

    }
    containerClick() {
        let containers = this.targets("icon-select-container");

        for (let container of containers) {
            container.addEventListener("click", event => {
                if (container !== event.target) return;
                this.clickRemove();
            });
        }

    }
    bind() {

        // Attach listeners based on displayType to parent
        if (this.displayType == 'hover') {
            this.attachToHover();
        } else if (this.displayType == 'click') {
            this.attachToClick();
        }
    }
};