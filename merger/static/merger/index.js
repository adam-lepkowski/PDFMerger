var input = document.querySelector(".file-input");

input.addEventListener("change", addNextInput);
input.addEventListener("invalid", displayError);


/**
 * Get file name from file input and create another file-row.
 * @this - file input instance
 */
function addNextInput() {
    var value = this.value;
    var label = this.previousElementSibling;
    var value = value.split("\\")[value.split("\\").length - 1];
    if (value != "") {
        label.textContent = value.split("\\")[value.split("\\").length - 1];
        var parent = this.parentElement.parentElement;
        createInputDiv(parent);
    } else {
        label.textContent = "Select file";
    }
}

/**
 * Preset a delete icon and append it to given file-row
 * @param row - file-row div
 */
function appendDeleteIcon(row) {
    var icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-circle-minus");
    icon.addEventListener("click", deleteRow)
    row.appendChild(icon);
}

/**
 * Create upIcon and downIcon representing an up and down arrow to change
 * file-row position in parent div.
 * @returns - upIcon and downIcon
 */
function createDirectionIcons() {
    var upIcon = document.createElement("i");
    var downIcon = document.createElement("i");
    upIcon.classList.add("fa-solid", "fa-circle-up", "nav-button");
    upIcon.direction = "up";
    upIcon.addEventListener("click", swapPosition);
    downIcon.classList.add("fa-solid", "fa-circle-down", "nav-button");
    downIcon.direction = "down";
    downIcon.addEventListener("click", swapPosition);
    return [upIcon, downIcon];
}


/**
 * Create a new "file-row" and append it to containing div.
 * @param parent - parent div of class ".rows"
 */
function createInputDiv(parent) {
    var uploadsAmount = document.querySelectorAll(".file-row").length;
    if (uploadsAmount < 5) {
        var inputId = "file-upload" + uploadsAmount.toString();
        var div = document.createElement("div");
        var navDiv = document.createElement("div");
        var directionIcons = createDirectionIcons();
        var upIcon = directionIcons[0];
        var downIcon = directionIcons[1];
        var label = document.createElement("label");
        var text = document.createTextNode("Select file");
        var input = document.createElement("input");
        div.classList.add("file-row");
        navDiv.classList.add("nav-div");
        label.setAttribute("for", inputId);
        label.appendChild(text);
        input.setAttribute("type", "file");
        input.setAttribute("id", inputId);
        input.setAttribute("accept", ".pdf");
        input.setAttribute("name", inputId);
        input.classList.add("file-input");
        input.addEventListener("change", addNextInput);
        navDiv.appendChild(upIcon);
        div.appendChild(navDiv);
        div.appendChild(label);
        div.appendChild(input);
        appendDeleteIcon(div);
        parent.appendChild(div);
        div.previousElementSibling.firstElementChild.appendChild(downIcon);
        resetRequired();
    }
}

/**
 * Delete "file-row".
 * @this - minus icon in "file-row"
 */
function deleteRow() {
    var row = this.parentElement;
    var parent = row.parentElement;
    row.parentElement.removeChild(row);
    var rows = document.querySelectorAll(".file-row");
    if (rows.length == 1) {
        createInputDiv(parent);
    }
    resetNavButtons();
    resetRequired();
}

/**
 * Remove existing and create new up and down icons in all file-row divs.
 */
function resetNavButtons() {
    var buttons = document.querySelectorAll(".nav-button");
    for (i = 0; buttons.length > i; i++) {
        buttons[i].parentElement.removeChild(buttons[i]);
    }

    var rows = document.querySelectorAll(".nav-div");
    if (rows.length > 1) {
        var icons = createDirectionIcons();
        var upIcon = icons[0];
        var downIcon = icons[1];
        rows[0].appendChild(downIcon);
        rows[rows.length - 1].appendChild(upIcon);
        if (rows.length > 2) {
            for (i = 1; rows.length - 1 > i; i++) {
                var icons = createDirectionIcons();
                var upIcon = icons[0];
                var downIcon = icons[1];
                rows[i].appendChild(upIcon);
                rows[i].appendChild(downIcon);

            }
        }
    }
}

/**
 * Move file-row up or down.
 * @this - file-row up or down icon.
 */
function swapPosition() {
    var currentRow = this.parentElement.parentElement;
    var parent = currentRow.parentElement;
    if (this.direction == "up") {
        var nextRow = currentRow.previousElementSibling;
        parent.insertBefore(currentRow, nextRow);
    } else {
        var nextRow = currentRow.nextElementSibling;
        parent.insertBefore(nextRow, currentRow);
    }
    resetNavButtons();
    resetDeleteButtons();
    resetRequired();
}

/**
 * Remove all delete buttons and set up new for all rows except for the first
 * one.
 */
function resetDeleteButtons() {
    var buttons = document.querySelectorAll(".fa-circle-minus");
    for (i = 0; buttons.length > i; i++) {
        buttons[i].parentElement.removeChild(buttons[i]);
    }

    var rows = document.querySelectorAll(".file-row");
    for (i = 1; rows.length > i; i++) {
        appendDeleteIcon(rows[i]);
    }
}

/**
 * Reset required file-row inputs so that minimum two files are sent to 
 * be merged.
 */
function resetRequired() {
    var inputs = document.querySelectorAll(".file-input");
    if (inputs.length > 1) {
        for (i = 0; inputs.length > i; i++) {
            if (i < 2) {
                inputs[i].required = true;
                inputs[i].addEventListener("invalid", displayError)
            } else {
                inputs[i].required = false;
                inputs[i].removeEventListener("invalid", displayError)
            }
        }
    } else {
        inputs[0].required = true;
        inputs[0].addEventListener("invalid", displayError)
    }
}

function displayError() {
    var msg = document.querySelector(".error-msg");
    msg.classList.remove("hidden");
}