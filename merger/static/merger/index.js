var input = document.querySelector(".file-input");

input.addEventListener("change", addNextInput);

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

function createInputDiv(parent) {
    var uploadsAmount = document.querySelectorAll("input").length;
    if (uploadsAmount < 5) {
        var inputId = "file-upload" + uploadsAmount.toString();
        var div = document.createElement("div");
        var navDiv = document.createElement("div");
        var upIcon = document.createElement("i");
        var downIcon = document.createElement("i");
        var label = document.createElement("label");
        var text = document.createTextNode("Select file");
        var input = document.createElement("input");
        var icon = document.createElement("i");
        div.classList.add("file-row");
        navDiv.classList.add("nav-div");
        upIcon.classList.add("fa-solid", "fa-circle-plus", "nav-button");
        upIcon.direction = "up";
        upIcon.addEventListener("click", swapPosition);
        downIcon.classList.add("fa-solid", "fa-circle-minus", "nav-button");
        downIcon.direction = "down";
        downIcon.addEventListener("click", swapPosition);
        label.setAttribute("for", inputId);
        label.appendChild(text);
        input.setAttribute("type", "file");
        input.setAttribute("id", inputId);
        input.setAttribute("accept", ".pdf");
        input.addEventListener("change", addNextInput);
        icon.classList.add("fa-solid", "fa-circle-minus");
        icon.addEventListener("click", deleteRow)
        navDiv.appendChild(upIcon);
        div.appendChild(navDiv);
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(icon);
        parent.appendChild(div);
        div.previousElementSibling.firstElementChild.appendChild(downIcon);
    }
}

function deleteRow() {
    var row = this.parentElement;
    row.parentElement.removeChild(row);
    resetNavButtons();
}

function resetNavButtons() {
    var buttons = document.querySelectorAll(".nav-button");
    for (i = 0; buttons.length > i; i++) {
        buttons[i].parentElement.removeChild(buttons[i]);
    }

    var rows = document.querySelectorAll(".nav-div");
    if (rows.length > 1) {
        var upIcon = document.createElement("i");
        var downIcon = document.createElement("i");
        upIcon.classList.add("fa-solid", "fa-circle-plus", "nav-button");
        downIcon.classList.add("fa-solid", "fa-circle-minus", "nav-button");
        rows[0].appendChild(downIcon);
        rows[rows.length - 1].appendChild(upIcon);
        if (rows.length > 2) {
            for (i = 1; rows.length - 1 > i; i++) {
                var upIcon = document.createElement("i");
                var downIcon = document.createElement("i");
                upIcon.classList.add("fa-solid", "fa-circle-plus", "nav-button");
                upIcon.direction = "up";
                upIcon.addEventListener("click", swapPosition);
                downIcon.classList.add("fa-solid", "fa-circle-minus", "nav-button");
                downIcon.direction = "down";
                downIcon.addEventListener("click", swapPosition);
                rows[i].appendChild(upIcon);
                rows[i].appendChild(downIcon);

            }
        }
    }
}

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
}