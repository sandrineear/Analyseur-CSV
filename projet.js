var tab = Array();
var nom_col;
var row_size;
var column_size;
var input;

function CSV() {
    this.tab = Array();
    this.nom_col = Array();
}

CSV.prototype.CSVFile = function(event) {
    var reader = new FileReader();
    reader.onload = function() {
        // Vérifie si le fichier est vide 
        if (document.getElementById('file').files[0].size === 0) {
            alert("Fichier vide");
        }
        text2.innerText = reader.result;

        row = reader.result.split('\r\n');
        row_size = row.length;

        for (var i = 0; i < row.length; i++) {
			// Si un fichier est séparé par des ; on remplace par row[i].split(';');
            column = row[i].split(',');
            tab.push(column);
            for (var j = 0; j < column.length; j++) {
                if (column[j] > 0) {
                    column_size = column.length;
                }
            }
        }
        // Affiche les noms des colonnes disponibles
        nom_col = row[0].split(',');
        for (var a = 0; a < column_size; a++) {
            text1.innerText = text1.innerText + "Colonne " + a + " : " + nom_col[a] + "\n";
        }

        return tab;
    };
    reader.readAsText(event.target.files[0]);
};

function getValue() {
    // Sélectionne l'élément input et récupérer sa valeur
    input = document.getElementById("input").value;
    if (input < 0 || input >= column_size) {
        alert("Veuillez rentrer une colonne valide pour le fichier");
    } else {
        console.log(input);
        return input;
    }
}

function getErreur(a, col) {
    if (isNaN(tab[a][col]) || tab[a][col] === "") {
        tab[a][col] = 0;
    }
}

function sum(col) {
    var sum = 0;
    for (var a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            sum = sum + parseFloat(tab[a][col]);
        }
    }
    text2.innerText = "La somme totale des valeurs de la colonne " + col + " est: " + sum;
    return sum;
}

function mean(col) {
    var sum = 0;
    var nbVal = 0;
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            sum = sum + parseFloat(tab[a][col]);
            nbVal++;
        }
    }
    var mean = sum / nbVal;
    text2.innerText = "La moyenne des valeurs de la colonne " + col + " est: " + mean;
    return mean;
}

// Récupérer le nombre de valeurs numérique de la colonne col pour le calcul de la médiane
function getNb(col) {
    var count = 0;
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            count++;
        }
    }
    return count;
}

function mediane(col) {
    var c = getNb(col);
    var mediane = 0;
    var temp = new Array();
    var i = 0;

    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            temp[i] = parseFloat(tab[a][col]);
            i++;
        }
    }

    temp.sort(function(a, b) {
        return a - b;
    });

    if (c % 2 === 0) {
        // pair
        mediane = (temp[c / 2 - 1] + temp[c / 2]) / 2;
    } else {
        // impair
        mediane = temp[(c - 1) / 2];
    }
    text2.innerText = "La mediane de la colonne " + col + " est: " + mediane;
    return mediane;
}

function min(col) {
    for (var a = 0; a < row_size; a++) {
        getErreur(a, col);
    }
    var min = tab[1][col];

    for (a = 0; a < row_size; a++) {

        if (tab[a][col] > 0) {
            if (min > parseFloat(tab[a][col])) {
                min = parseFloat(tab[a][col]);
            }
        }
    }
    text2.innerText = "La valeur min de la colonne " + col + " est : " + min;
    return min;
}

function max(col) {
    var max = tab[1][col];
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            if (max < parseFloat(tab[a][col])) {
                max = parseFloat(tab[a][col]);
            }
        }
    }
    text2.innerText = "La valeur max de la colonne " + col + " est: " + max;
    return max;
}

function decimal(col) {
    var d = new Array();
    text2.innerText = "Décimal";
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            d[a] = parseFloat(tab[a][col]);
            text2.innerText = text2.innerText + ' ' + d[a] + '\n';
        }
    }
}

function binary(col) {
    var binary = new Array();
    text2.innerText = "Binaire";
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            binary[a] = parseFloat(tab[a][col] - 0).toString(2);
            text2.innerText = text2.innerText + ' ' + binary[a] + '\n';
        }
    }
}

function octal(col) {
    var o = new Array();
    text2.innerText = "Octal";
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            o[a] = parseFloat(tab[a][col] - 0).toString(8);
            text2.innerText = text2.innerText + ' ' + o[a] + '\n';
        }
    }
}

function hexadecimal(col) {
    var hexa = new Array();
    text2.innerText = "Héxadécimal";
    for (a = 0; a < row_size; a++) {
        getErreur(a, col);
        if (tab[a][col] > 0) {
            hexa[a] = parseFloat(tab[a][col] - 0).toString(16);
            text2.innerText = text2.innerText + ' ' + hexa[a] + '\n';
        }
    }
}

var test = new CSV();