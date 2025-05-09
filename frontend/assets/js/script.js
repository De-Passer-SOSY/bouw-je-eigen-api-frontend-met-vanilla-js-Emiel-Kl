"use strict";


document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("De pagina is volledig geladen");
    fetchData();
}

async function fetchData() {
    try {
        let response = await fetch("http://localhost:3333/chessChampions");
        let chessChampions = await response.json();
        console.log(chessChampions);

        let listElement = document.getElementById("champions-list");

        for (let champion of chessChampions) {
            let listItem = document.createElement("li");

            listItem.textContent = `${champion.naam} - ${champion.nationaliteit} (${champion.jaar})`;
            listElement.appendChild(listItem);
        }
    } catch (error) {
        console.error("Fout bij het ophalen van kampioenen:", error);
    }
}