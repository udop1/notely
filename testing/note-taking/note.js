function refreshLoadList() {
    var loadList = document.getElementById("loadName");
    var options;

    for (var i = 0; i < localStorage.length; i++) {
        var storageKey = localStorage.key(i);

        options += `<option value="${storageKey}">${storageKey}</option>`;
    }
    loadList.innerHTML = options;
}

function saveNote() {
    var notes = document.forms["noteForm"]["notes"].value;
    var saveName = document.forms["noteForm"]["saveName"].value;

    if (localStorage.getItem(saveName)) { //If already exists
        if (confirm("A save already exists with this name.\nAre you sure you want to overwrite it?")) {
            localStorage.setItem(saveName, notes);

            alert("Note saved!");
        } else {
            alert("Note not saved!");
        }
    } else {
        localStorage.setItem(saveName, notes);

        alert("Note saved!");
    }

    refreshLoadList();
}

function loadNote() {
    var loadName = document.forms["noteForm"]["loadName"].value;
    
    document.forms["noteForm"]["saveName"].value = loadName;
    document.forms["noteForm"]["notes"].value = localStorage.getItem(loadName);
}