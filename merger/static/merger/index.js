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
        div.classList.add("file-row");
        var label = document.createElement("label");
        label.setAttribute("for", inputId);
        var text = document.createTextNode("Select file");
        label.appendChild(text);
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("id", inputId);
        input.setAttribute("accept", ".pdf");
        input.addEventListener("change", addNextInput);
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-circle-minus");
        icon.addEventListener("click", deleteRow)
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(icon);
        div.style.order = uploadsAmount;
        parent.appendChild(div);
    }
}

function deleteRow() {
    var row = this.parentElement;
    row.parentElement.removeChild(row);
}