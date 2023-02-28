function refreshLoadList() { //Refresh load list
    var loadList = document.getElementById("loadName");
    var options;

    for (var i = 0; i < localStorage.length; i++) { //Loop through local storage to get all notes
        var storageKey = localStorage.key(i);

        options += `<option value="${storageKey}">${storageKey}</option>`; //Add notes to load list
    }
    loadList.innerHTML = options;
}

function saveNote() { //Save note to local storage
    var notes = document.forms["noteForm"]["notes"].value;
    var saveName = document.forms["noteForm"]["saveName"].value;

    if (localStorage.getItem(saveName)) { //If note name already exists
        if (confirm("A save already exists with this name.\nAre you sure you want to overwrite it?")) {
            localStorage.setItem(saveName, notes); //Add note to local storage

            alert("Note saved!");
        } else {
            alert("Note not saved!");
        }
    } else {
        localStorage.setItem(saveName, notes); //Add note to local storage

        alert("Note saved!");
    }

    refreshLoadList(); //Refresh load list to display new notes
}

function loadNote() { //Load note from local storage
    var loadName = document.forms["noteForm"]["loadName"].value;
    
    document.forms["noteForm"]["saveName"].value = loadName;
    document.forms["noteForm"]["notes"].value = localStorage.getItem(loadName); //Get note from local storage
}