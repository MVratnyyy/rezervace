document.addEventListener('DOMContentLoaded', function () {
    // Načtení rezervací z local storage
    let reservations = JSON.parse(localStorage.getItem('reservations')) || {};

    // Funkce pro aktualizaci seznamu rezervací
    function updateMyReservations() {
        const myReservationsList = document.getElementById('myReservations');
        myReservationsList.innerHTML = '';

        for (const key in reservations) {
            if (reservations[key]) {
                const listItem = document.createElement('li');
                listItem.textContent = key;
                myReservationsList.appendChild(listItem);
            }
        }
    }

    // Funkce pro aktualizaci nabídky editace rezervace
    function updateEditOptions() {
        const timeSelect = document.getElementById('editTime');
        timeSelect.innerHTML = '';

        for (const key in reservations) {
            if (reservations[key]) {
                const timeOption = document.createElement('option');
                timeOption.value = key.split(' ')[1];
                timeOption.textContent = key.split(' ')[1];
                timeSelect.appendChild(timeOption);
            }
        }
    }

    // Inicializace seznamu rezervací a nabídky editace
    updateMyReservations();
    updateEditOptions();

    // Obsluha tlačítka pro potvrzení rezervace
    document.getElementById('reserveBtn').addEventListener('click', function () {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const key = `${date} ${time}`;

        // Kontrola, zda termín není již rezervovaný
        if (!reservations[key]) {
            // Uložení rezervace do local storage
            reservations[key] = true;
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Odebrání rezervované hodiny z nabídky
            removeTimeOption(time);

            // Aktualizace seznamu rezervací
            updateMyReservations();

            alert('Rezervace úspěšně potvrzena!');
        } else {
            alert('Termín je již rezervovaný. Vyberte prosím jiný termín.');
        }
    });

    // Obsluha tlačítka pro editaci rezervace
    document.getElementById('editBtn').addEventListener('click', function () {
        const editDate = document.getElementById('editDate').value;
        const editTime = document.getElementById('editTime').value;

        const editKey = `${editDate} ${editTime}`;

        // Kontrola, zda termín není již rezervovaný
        if (!reservations[editKey]) {
            // Odebrání původní rezervace z nabídky
            removeTimeOption(editTime);

            // Upravení rezervace v local storage
            reservations[editKey] = true;
            localStorage.setItem('reservations', JSON.stringify(reservations));

            // Aktualizace seznamu rezervací
            updateMyReservations();
            updateEditOptions();

            alert('Rezervace úspěšně upravena!');
        } else {
            alert('Termín je již rezervovaný. Vyberte prosím jiný termín pro úpravu.');
        }
    });
});
