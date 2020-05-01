var cols, rows;
let stepOneBtn = document.getElementById('step1next');
const step1 = document.getElementById('step1');
var startingMatrix, priceMatrix; // let user input values in it
var solutionMatrix;
const step2 = document.getElementById('step2');
var amount = document.getElementById('amount');
var price = document.getElementById('price');
var solutionAmount = document.getElementById('solutionAmount');
var solutionPrice = document.getElementById('solutionPrice');
let stepTwoBtn = document.getElementById('step2next');
var stocks,
	needs,
	L = 0;
const step3 = document.getElementById('step3');
const solutionL = document.getElementById('solutionL');

stepOneBtn.onclick = () => {
	rows = Number(document.getElementById('numberOfRows').value);
	cols = Number(document.getElementById('numberOfCols').value);
	createInputMatrix(rows, cols);
	showInputMatrix(rows, cols);
	step2.style.display = 'inline-block';
	stepTwoBtn.style.display = 'inline-block';
	//step1.style.display = 'none';
	//stepOneBtn.style.display = 'none';
};

stepTwoBtn.onclick = () => {
	readInputValues(rows, cols);
	checkBalance(rows, cols);
	solveProblem(rows, cols);
	showSolution(rows, cols);
};

/*------------------- FUNCTIONS -------------------*/

createInputMatrix = (r, c) => {
	startingMatrix = new Array(r);
	for (var i = 0; i < startingMatrix.length; i++) {
		startingMatrix[i] = new Array(c);
	}
	for (var i = 0; i < r; i++) {
		for (var j = 0; j < c; j++) {
			startingMatrix[i][j] = 0;
		}
	}

	priceMatrix = new Array(r - 1);
	for (var i = 0; i < priceMatrix.length; i++) {
		priceMatrix[i] = new Array(c - 1);
	}
	for (var i = 0; i < r - 1; i++) {
		for (var j = 0; j < c - 1; j++) {
			priceMatrix[i][j] = 0;
		}
	}
};
showInputMatrix = (r, c) => {
	let insertString = '';
	for (var i = 0; i < r; i++) {
		for (var j = 0; j < c; j++) {
			if (i == 0 && j == 0) {
				// can create some memorystealing on slow PCs or phones because the cycle will always decide
				insertString += `<input class='ma' readonly placeholder='a/b' id='elem-` + i + `-` + j + `'>`;
			} else if (i == 0 || j == 0) {
				insertString += `<input class='ma' id='elem-` + i + `-` + j + `'>`;
			} else {
				insertString += `<input readonly id='elem-` + i + `-` + j + `'>`;
			}
		}
		insertString += `<br>`;
	}
	amount.innerHTML = insertString;
	insertString = '';
	for (var i = 0; i < r - 1; i++) {
		for (var j = 0; j < c - 1; j++) {
			insertString += `<input id='price-` + i + `-` + j + `'>`;
		}
		insertString += `<br>`;
	}
	price.innerHTML = insertString;
	//console.log(startingMatrix);
};

readInputValues = (r, c) => {
	stocks = new Array(r - 1);
	needs = new Array(c - 1);
	for (var i = 0; i < r; i++) {
		for (var j = 0; j < c; j++) {
			let elemID = 'elem-' + i + `-` + j;
			startingMatrix[i][j] = Number(document.getElementById(elemID).value);
		}
	}
	for (var i = 0; i < r - 1; i++) {
		for (var j = 0; j < c - 1; j++) {
			let elemID = 'price-' + i + `-` + j;
			priceMatrix[i][j] = Number(document.getElementById(elemID).value);
		}
	}
	for (var i = 0; i < r - 1; i++) {
		stocks[i] = startingMatrix[i + 1][0];
	}
	for (var j = 0; j < c - 1; j++) {
		needs[j] = startingMatrix[0][j + 1];
	}
	//console.log(stocks);
	//console.log(shipments);
};

checkBalance = (r, c) => {
	let sumR = 0,
		sumC = 0;
	for (var i = 1; i < r; i++) {
		sumR += startingMatrix[i][0];
	}
	for (var j = 1; j < c; j++) {
		sumC += startingMatrix[0][j];
	}
	if (sumR != sumC) {
		if (sumR > sumC) {
			solutionMatrix = new Array(r);
			for (var i = 0; i < solutionMatrix.length; i++) {
				solutionMatrix[i] = new Array(c + 1);
			}
			for (var i = 0; i < r; i++) {
				for (var j = 0; j < c; j++) {
					solutionMatrix[i][j + 1] = 0;
				}
			}
			for (var i = 0; i < r; i++) {
				for (var j = 0; j < c; j++) {
					solutionMatrix[i][j] = startingMatrix[i][j];
				}
			}
			solutionMatrix[0][c] = sumR - sumC;
			needs[c - 1] = solutionMatrix[0][c];
			let oldPriceMatrix = priceMatrix;
			priceMatrix = new Array(r - 1);
			for (var i = 0; i < priceMatrix.length; i++) {
				priceMatrix[i] = new Array(c);
			}
			for (var i = 0; i < r - 1; i++) {
				for (var j = 0; j < c; j++) {
					priceMatrix[i][j] = 0;
				}
			}
			for (var i = 0; i < r - 1; i++) {
				for (var j = 0; j < c - 1; j++) {
					priceMatrix[i][j] = oldPriceMatrix[i][j];
				}
			}
			cols++;
		} else {
			solutionMatrix = new Array(r + 1);
			for (var i = 0; i < solutionMatrix.length; i++) {
				solutionMatrix[i] = new Array(c);
			}
			for (var i = 0; i < r; i++) {
				for (var j = 0; j < c; j++) {
					solutionMatrix[i + 1][j] = 0;
				}
			}
			for (var i = 0; i < r; i++) {
				for (var j = 0; j < c; j++) {
					solutionMatrix[i][j] = startingMatrix[i][j];
				}
			}
			solutionMatrix[r][0] = sumC - sumR;
			stocks[r - 1] = solutionMatrix[r][0];
			let oldPriceMatrix = priceMatrix;
			priceMatrix = new Array(r);
			for (var i = 0; i < priceMatrix.length; i++) {
				priceMatrix[i] = new Array(c - 1);
			}
			for (var i = 0; i < r; i++) {
				for (var j = 0; j < c - 1; j++) {
					priceMatrix[i][j] = 0;
				}
			}
			for (var i = 0; i < r - 1; i++) {
				for (var j = 0; j < c - 1; j++) {
					priceMatrix[i][j] = oldPriceMatrix[i][j];
				}
			}
			rows++;
		}
	} else {
		solutionMatrix = startingMatrix;
	}
	//console.log(solutionMatrix);
	//console.log(priceMatrix);
};

solveProblem = (r, c) => {
	for (var i = 0; i < r - 1; i++) {
		for (var j = 0; j < c - 1; j++) {
			if (solutionMatrix[j + 1] == 0) continue;
			var minVal = Math.min(stocks[i], needs[j]);
			solutionMatrix[i + 1][j + 1] = minVal;
			stocks[i] -= minVal;
			needs[j] -= minVal;
			if (stocks[i] == 0) break;
		}
	}
	//console.log(solutionMatrix);
	// Storing shippingMatrix at the array 'solutionMatrix' that already exists
	// Adding final cost Value
	L = 0;
	for (var i = 0; i < r - 1; i++) {
		for (var j = 0; j < c - 1; j++) {
			L += solutionMatrix[i + 1][j + 1] * priceMatrix[i][j];
		}
	}
};
// solutionMatrix must have i+1 or j+1 because I'm too lazy to define few arrays and storing all in one

showSolution = (r, c) => {
	let insertString = '';
	for (var i = 0; i < r; i++) {
		for (var j = 0; j < c; j++) {
			if (i == 0 && j == 0) {
				// can create some memorystealing on slow PCs or phones because the cycle will always decide
				insertString += `<input class='ma' readonly placeholder='a/b' id='elem-` + i + `-` + j + `'>`;
			} else if (i == 0 || j == 0) {
				insertString += `<input class='ma' readonly placeholder='` + solutionMatrix[i][j] + `'>`;
			} else {
				if (solutionMatrix[i][j] == 0) {
					insertString += `<input readonly placeholder=' —'>`;
				} else {
					insertString +=
						`<input class='activeSolution' readonly placeholder='` + solutionMatrix[i][j] + `'>`;
				}
			}
		}
		insertString += `<br>`;
	}
	solutionAmount.innerHTML = insertString;
	insertString = '';
	for (var i = 0; i < r - 1; i++) {
		for (var j = 0; j < c - 1; j++) {
			insertString += `<input readonly placeholder='` + priceMatrix[i][j] + `'>`;
		}
		insertString += `<br>`;
	}
	solutionPrice.innerHTML = insertString;
	insertString = `<h3>Мінімальне значення функції = ` + L;
	solutionL.innerHTML = insertString;
	step3.style.display = 'inline-block';
};
