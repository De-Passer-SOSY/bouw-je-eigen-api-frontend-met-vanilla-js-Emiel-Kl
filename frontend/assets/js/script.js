
//------------
"use strict";
document.addEventListener('DOMContentLoaded', init);

function init() {
    fetchChampions();

    // Formulier en knop selecteren
    const form = document.getElementById('champion-form');
    const formWrapper = document.getElementById('form-wrapper');
    const openFormBtn = document.getElementById('open-form');

    // Klik op "Nieuwe Afwezigheid" toont het formulier
    openFormBtn.addEventListener('click', () => {
        formWrapper.classList.remove('hidden');               // Formulier zichtbaar maken
        form.scrollIntoView({ behavior: 'smooth' });          // Automatisch scrollen naar het formulier
        resetForm();                                          // Leeg maken voor nieuw item
    });

    // Formulierverzending afhandelen
    form.addEventListener('submit', handleFormSubmit);
}

// Haal afwezigheden op van de backend en sorteer op datum aflopend
function fetchChampions() {
    fetch('http://localhost:3333/chessChampions')
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort((a, b) => b.jaar - a.jaar);
            renderChampions(sorted);
        })
        .catch(() => showAlert('❌ Kon kampioenen niet laden.', 'error'));
}

// Vul de tabel en koppel knoppen
function renderChampions(wereldkampioenen) {
    const list = document.getElementById('champion-list');
    list.innerHTML = '';

    wereldkampioenen.forEach(champion => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${champion.naam}</td>
      <td>${champion.nationaliteit}</td>
      <td>${champion.jaar}</td>
      <td>
        <button class="edit-btn" data-id="${champion.id}">✏️ Wijzig</button>
        <button class="delete-btn" data-id="${champion.id}">🗑️ Verwijder</button>
      </td>
    `;

        // Voeg event listeners toe aan knoppen
        row.querySelector('.edit-btn').addEventListener('click', () => editChampion(champion.id));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteChampion(champion.id));

        list.appendChild(row);
    });
}

// Formulier verzenden → toevoegen of bijwerken
function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('champion-id').value;
    const champion = {
        naam: document.getElementById('naam').value,
        nationaliteit: document.getElementById('nationaliteit').value,
        jaar: document.getElementById('jaar').value,
    };

    const method = id ? 'PUT' : 'POST';
    const url = id
        ? `http://localhost:3333/updateChessChampion/${id}`
        : 'http://localhost:3333/newChessChampion';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(champion)
    })
        .then(() => {
            showAlert(id ? '✏️ Kampioen bijgewerkt!' : '✅ Kampioen toegevoegd!', 'success');
            resetForm();
            fetchChampions();
            document.getElementById('form-wrapper').classList.add('hidden'); // Verberg formulier
        })
        .catch(() => showAlert('❌ Er ging iets mis.', 'error'));
}

// Vult het formulier met de bestaande gegevens van een afwezigheid
function editChampion(id) {
    fetch(`http://localhost:3333/chessChampion/${id}`)
        .then(res => res.json())
        .then(champion => {
            document.getElementById('champion-id').value = champion.id;
            
            document.getElementById('naam').value = champion.naam;
            document.getElementById('nationaliteit').value = champion.nationaliteit;
            document.getElementById('jaar').value = champion.jaar;

            document.getElementById('form-wrapper').classList.remove('hidden');
            document.getElementById('champion-form').scrollIntoView({ behavior: 'smooth' });
        });
}

// Verwijder een afwezigheid
function deleteChampion(id) {
    fetch(`http://localhost:3333/deleteChessChampion/${id}`, { method: 'DELETE' })
        .then(() => {
            showAlert('🗑️ Kampioen verwijderd.', 'success');
            fetchChampions();
        })
        .catch(() => showAlert('❌ Verwijderen mislukt.', 'error'));
}

// Reset het formulier en ID-veld
function resetForm() {
    document.getElementById('champion-id').value = '';
    document.getElementById('champion-form').reset();
}

// Toon melding bovenaan
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById("alert");
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.classList.remove('hidden');
    setTimeout(() => alertBox.classList.add('hidden'), 3000);
}




