
//elemento griglia 
const gridElement = document.querySelector('.grid');

//bottone avvio partita
const elementButton = document.getElementById('button_custom');

//messaggio game over
const gameOverDiv = document.querySelector('.gameover_alert');

//funzione al click del bottone
elementButton.addEventListener('click', function () {

    const inputChoice = parseInt(document.querySelector('select').value);

    if (inputChoice === 1) {
        createGrid('easy');
        selectElements('easy', '.cell', 16);
        //console.log(createBombsArray('easy', 16));
    } else if (inputChoice === 2) {
        createGrid('medium');
        selectElements('medium', '.cell', 16);
    } else if (inputChoice === 3) {
        createGrid('difficult');
        selectElements('difficult', '.cell', 16);
    }

})






//funzione crea griglia
/**
 * crea griglia in base alla difficoltà inserita
 * @param {string} difficultyChoice seleziona difficoltà
 */
function createGrid(difficultyChoice) {
    //pulisco eventuale griglia già esistente
    gridElement.innerHTML = "";

    //levo messagio game over
    gameOverDiv.classList.add('d_none');

    let cellsNumber;

    let classToAdd;

    if (difficultyChoice === 'easy') {
        classToAdd = 'width_10';
        cellsNumber = 100;
    } else if (difficultyChoice === 'medium') {
        classToAdd = 'width_9';
        cellsNumber = 81;
    } else if (difficultyChoice === 'difficult') {
        classToAdd = 'width_7';
        cellsNumber = 49;
    } else {
        //prova
        cellElement.classList.add('width_7');
        cellsNumber = 7;
    }

    //stampo in grid i miei elementi
    for (let i = 1; i <= cellsNumber; i++) {

        //elemento cella
        const cellElement = document.createElement('div');

        //aggiungo classe css
        cellElement.classList.add('cell');
        cellElement.classList.add(classToAdd);


        //aggiungo numero celle
        cellElement.innerHTML = i;

        //inserisco elemento cella in griglia
        gridElement.append(cellElement);
    }

}


/**
 * crea elementi cella reattivi
 * @param {string} difficultyChoice livello di difficoltà da dichiarare
 * @param {string} divClass selezionare il tipo di elemento che riceverà la proprietà
 * @param {number} bombsNumber numero di bombe nel gioco
 */
function selectElements(difficultyChoice, divClass, bombsNumber) {

    //seleziono i div creati classe selezionata
    const cells = document.querySelectorAll(divClass);

    //creo array bombe
    const bombsArray = createBombsArray(difficultyChoice, bombsNumber);

    console.log('le bombe sono nelle caselle:');
    console.log(bombsArray);

    //console.log(cells.length);
    //console.log(cells);

    //contatore punti
    let pointCounter = 0;

    //condizione affinche il gioco continui
    let isGameOver = false;



    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];

        //console.log(cell);

        //celle reattive al click
        cell.addEventListener('click', function () {

            //this.condition = false;

            //se la cella corrisponde a una bomba si colora e game over
            if (bombsArray.includes(parseInt(this.innerText)) && isGameOver === false) {
                console.log('hai preso una bomba sry');
                this.innerHTML = '<i class="fa-solid fa-bomb"></i>';
                this.classList.add('bg_bomb');

                isGameOver = true;

                //console.log(this.condition);

                //coloro le altre bombe dato che il gioco è finito
                for (let j = 0; j < cells.length; j++) {
                    if (bombsArray.includes(parseInt(cells[j].innerText))) {
                        cells[j].innerHTML = '<i class="fa-solid fa-bomb"></i>';
                        cells[j].classList.add('bg_bomb');
                    }
                }

                //alert(`Game over! Hai totalizzato ${pointCounter} punti`);
                gameOverDiv.classList.remove('d_none');
                gameOverDiv.innerHTML = `<h2>Hai perso sry. Hai totalizzato ${pointCounter}/${cells.length - bombsNumber} punti</h2>`

            }
            //se la cella non è gia stata cliccata e non è una bomba succede questo (solo se il gioco non è finito)
            else if (!bombsArray.includes(parseInt(this.innerText)) && isGameOver === false && this.condition !== false) {
                //this.innerHTML = "";
                this.classList.add('bg_safe');
                pointCounter = pointCounter + 1;
                console.log(`Bomba evitata, sei a ${pointCounter} punti`);

                //console.log(this.condition);
                this.condition = false;
                //console.log(this);

                if (pointCounter === (cells.length - bombsNumber)) {
                    gameOverDiv.classList.remove('d_none');
                    gameOverDiv.innerHTML = `<h2>HAI VINTO! Hai totalizzato ${pointCounter}/${cells.length - bombsNumber} punti</h2>`;
                    isGameOver = true;

                         //coloro le altre bombe dato che il gioco è finito
                    for (let j = 0; j < cells.length; j++) {
                        if (bombsArray.includes(parseInt(cells[j].innerText))) {
                            cells[j].innerHTML = '<i class="fa-solid fa-bomb"></i>';
                            cells[j].classList.add('bg_bomb');
                        }
                    }
                }

            } 
        })
    }
}


/**
 * crea un array con gli indici delle bombe
 * @param {string} difficultyChoice difficoltà del gioco da dichiarare
 * @param {number} bombsNumber numero di bombe da creare
 * @returns array con indice delle bombe ordinato
 */
function createBombsArray(difficultyChoice, bombsNumber) {

    //dichiaro array output
    let outputArray = [];

    //dichiaro numero di celle
    let cellsNumber;

    //inizializzo numero di celle
    if (difficultyChoice === 'easy') {
        cellsNumber = 100;
    } else if (difficultyChoice === 'medium') {
        cellsNumber = 81;
    } else if (difficultyChoice === 'difficult') {
        cellsNumber = 49;
    }

    //inizializzo array bombe
    while (outputArray.length < bombsNumber) {
        const arrayItem = getRndInteger(1, cellsNumber)

        if (!outputArray.includes(arrayItem)) {
            outputArray.push(arrayItem);
        }
    }

    outputArray.sort(function (a, b) { return a - b });

    return outputArray;
}


/**
 * restituisce un numero intero casuale tra un monimo e massimo specificato in input
 * @param {number} min minimo valore
 * @param {*} max massimo valore
 * @returns numero casuale
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



