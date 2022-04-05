
//elemento griglia 
const gridElement = document.querySelector('.grid');

//bottone avvio partita
const elementButton = document.getElementById('button_custom');

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
function createGrid(difficultyChoice) {
    //pulisco eventuale griglia già esistente
    gridElement.innerHTML = "";

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


function selectElements(difficultyChoice, divClass, bombsNumber) {

    const cells = document.querySelectorAll(divClass);

    const bombsArray = createBombsArray(difficultyChoice, bombsNumber);

    console.log(bombsArray);

    //console.log(cells.length);
    //console.log(cells);

    let pointCounter = 0;

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];

        //console.log(cell);

        

        cell.addEventListener('click', function () {

            if (bombsArray.includes(parseInt(this.innerText))) {
                console.log('hai preso una bomba');
                this.innerHTML = '<i class="fa-solid fa-bomb"></i>';
                this.classList.toggle('bg_bomb');
                alert(`Game over! Hai totalizzato ${pointCounter} punti`);
                
            } else {
                this.innerHTML = "";
                this.classList.toggle('bg_safe');
                pointCounter = pointCounter + 1;
                console.log(`Bomba evitata, sei a ${pointCounter} punti`);
            }

            console.log(this, i);
            console.log(this.innerText);
            
      
          })
    }
}

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

    return outputArray;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}




//funzione al click
/* elementForm.addEventListener('submit', function (event) {
    // Stop page reloading
    event.preventDefault()

    const inputChoice = parseInt(document.querySelector('select').value);

    if (inputChoice === 1) {
        createGrid('easy');
        selectElements('.cell');

    } else if (inputChoice === 2) {
        createGrid('medium');
        selectElements('.cell');

    } else if (inputChoice === 3) {
        createGrid('difficult');
        selectElements('.cell');

    }

}) */