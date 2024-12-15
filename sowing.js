let plateau = [2, 2, 2, 2, 2, 2];  // Plateau de jeu initial
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const currentPlayerElement = document.getElementById('currentPlayer');

// Fonction pour mettre à jour l'affichage du plateau
function updateBoard() {
    boardElement.innerHTML = '';  // Vider le tableau avant de le remplir
    plateau.forEach((graines, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = graines;  // Affiche le nombre de graines
        cell.dataset.index = index;

        // Si la case a des graines, elle devient cliquable
        if (graines > 0 && !isGameOver()) {
            cell.classList.add('active');
            cell.addEventListener('click', () => handleCellClick(index));
        }

        boardElement.appendChild(cell);  // Ajouter la cellule au plateau
    });
}

// Fonction de gestion du clic sur une case
function handleCellClick(index) {
    if (plateau[index] > 0 && currentPlayer === 'Sud' || currentPlayer === 'Nord') {
        messageElement.textContent = '';
        if (currentPlayer === 'Sud') {
            SudSeme(index);
        } else {
            NordSeme(index);
        }
        togglePlayer();  // Change le joueur
        updateBoard();  // Met à jour l'affichage du plateau
    }
}

// Fonction de semis pour Sud
function SudSeme(index) {
    let graines = plateau[index];
    plateau[index] = 0;  // La case est vidée
    let i = index;
    while (graines > 0) {
        i += 1;  // On passe à la case suivante
        if (i >= plateau.length) {
            messageElement.textContent = 'Sud a perdu (hors du plateau)';
            currentPlayerElement.textContent = 'Fin de la partie';
            endGame(); // Appeler la fonction pour arrêter le jeu et réinitialiser
            return;
        }
        plateau[i] += 1;  // On sème une graine dans la case
        graines -= 1;  // On réduit le nombre de graines à semer
    }
    if (plateau[i] === 1) {
        messageElement.textContent = 'Sud a perdu (fin dans une case avec une seule graine)';
        currentPlayerElement.textContent = 'Fin de la partie';
        endGame(); // Appeler la fonction pour arrêter le jeu et réinitialiser
    }
}

// Fonction de semis pour Nord
function NordSeme(index) {
    let graines = plateau[index];
    plateau[index] = 0;
    let i = index;
    while (graines > 0) {
        i -= 1;  // On passe à la case précédente
        if (i < 0) {
            messageElement.textContent = 'Nord a perdu (hors du plateau)';
            currentPlayerElement.textContent = 'Fin de la partie';
            endGame(); // Appeler la fonction pour arrêter le jeu et réinitialiser
            return;
        }
        plateau[i] += 1;  // On sème une graine dans la case
        graines -= 1;
    }
    if (plateau[i] === 1) {
        messageElement.textContent = 'Nord a perdu (fin dans une case avec une seule graine)';
        currentPlayerElement.textContent = 'Fin de la partie';
        endGame(); // Appeler la fonction pour arrêter le jeu et réinitialiser
    }
}

// Fonction pour changer de joueur
let currentPlayer = 'Sud';  // Sud commence
function togglePlayer() {
    currentPlayer = currentPlayer === 'Sud' ? 'Nord' : 'Sud';
    currentPlayerElement.textContent = `C'est au tour de ${currentPlayer}`;
}

// Fonction pour vérifier si le jeu est terminé
function isGameOver() {
    return messageElement.textContent !== '';
}

// Fonction pour réinitialiser le jeu après une fin de partie
function endGame() {
    setTimeout(() => {
        plateau = [2, 2, 2, 2, 2, 2];  // Réinitialiser le plateau
        currentPlayer = 'Sud';  // Sud recommence
        messageElement.textContent = '';
        currentPlayerElement.textContent = 'C\'est au tour de Sud';
        updateBoard();
    }, 2000);  // Attendre 2 secondes avant de réinitialiser le jeu
}

// Initialiser le jeu
function startGame() {
    plateau = [2, 2, 2, 2, 2, 2];  // Réinitialiser le plateau
    currentPlayer = 'Sud';  // Sud commence
    messageElement.textContent = '';
    currentPlayerElement.textContent = 'C\'est au tour de Sud';
    updateBoard();
}

startGame();  // Initialiser le jeu au chargement de la page
