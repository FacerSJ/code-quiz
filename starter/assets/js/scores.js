// Function to print hightscores in local storage (or set to empty array)
function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores by score property in descending order

    highscores.sort(function(a, b) {
        return b.sort - a.sort;
    });

    highscores.forEach(function (score) {
        // create li tag for each highscore
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + "-" + score.score;

        // display on page
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run function when page loads
printHighscores();