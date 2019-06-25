// Declaring DOM elements
let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener('click', calculate);
let endProfit = document.getElementById('finalResult');
let storeYes = document.getElementById('storeRadioYes');
let storeNo = document.getElementById('storeRadioNo');
let dropdown = document.getElementById('categoryDropdown');

// Variable declarations & definitions
let salePrice = 0;
let customerShipping = 0;
let purchasePrice = 0;
let shippingCost = 0;
let eBayFees = 0;
let payPalFees = 0;
let netProfit = 0;
let income = 0;
let expenses = 0;

function calculate () {
	calculateButton.addEventListener('click', startOver);
	salePrice = document.getElementsByName("salePrice")[0].value;
	if (!salePrice) {
		salePrice = 0.00;
	}
	customerShipping = document.getElementsByName("customerShipping")[0].value;
	if (!customerShipping) {
		customerShipping = 0.00;
	}
	purchasePrice = document.getElementsByName("purchasePrice")[0].value;
	if (!purchasePrice) {
		purchasePrice = 0.00;
	}
	shippingCost = document.getElementsByName("shippingCost")[0].value;
	if (!shippingCost) {
		shippingCost = 0.00;
	}
	// convert to floats/ints
	salePrice = parseFloat(salePrice);
	customerShipping = parseFloat(customerShipping);
	purchasePrice = parseFloat(purchasePrice);
	shippingCost = parseFloat(shippingCost);

	income = salePrice + customerShipping;
	income = parseFloat(income);
	income = income.toFixed(2);

	eBayFeesCalc();
	payPalFees = (salePrice + customerShipping) * 0.029 + 0.30;
	if (salePrice + customerShipping <= 0) {
		payPalFees = 0;
	}
	payPalFees = parseFloat(payPalFees);
	payPalFees = payPalFees.toFixed(2);

	netProfit = salePrice + customerShipping - purchasePrice - shippingCost - eBayFees - payPalFees;
	netProfit = parseFloat(netProfit).toFixed(2);


	expenses = purchasePrice + shippingCost + parseFloat(eBayFees) + parseFloat(payPalFees);
	expenses = parseFloat(expenses).toFixed(2);

	// display as new div...	
	endProfit.insertAdjacentHTML('beforeend', `<span id="finalDollars"> $${netProfit} </span>`);
	setTimeout(function() {
		endProfit.classList.remove("displayNone");
		endProfit.classList.add("rows");
		formatNetProfit(netProfit); // red or green
		window.scrollBy(0, 250);
	}, 500);
	endProfit.insertAdjacentHTML('beforeend',  `<p id="detailLink"> Show Details + </p>`);
	
	// Was running too soon without timeout
	setTimeout(function() {
		let detailLink = document.getElementById('detailLink');
		detailLink.addEventListener('click', showDetails);
	}, 500);


}


function formatNetProfit(netProfit) {
	let finalDollars = document.getElementById('finalDollars');
	if (netProfit > 0) {
		finalDollars.classList.add('greenText');
	}
	else if (netProfit < 0) {
		finalDollars.classList.add('redText');
	}
}


function showDetails () {
	endProfit.insertAdjacentHTML('afterend',
	`<div id="details" class="displayNone">
			<p class="boldText"> Gross Profit: <span class="greenText">$${income}</span> </p>
			<ul>
				<li> <span class="boldText"> Sale Price:</span> $${salePrice} </li>
				<li> <span class="boldText">Shipping(charged):</span> $${customerShipping} </li>
			</ul>
			<p class="boldText"> Expenses: <span class="redText">$${expenses}</span> </p>
			<ul> 
				<li> <span class="boldText">Item cost:</span> $${purchasePrice} </li>
				<li> <span class="boldText">Shipping(cost):</span> $${shippingCost} </li>
				<li> <span class="boldText">eBay Fees:</span> $${eBayFees} </li>
				<li> <span class="boldText">PayPal Fees:</span> $${payPalFees} </li>
			</ul>
		</div>`);
	let detailsDiv = document.getElementById('details');
	detailsDiv.classList.remove('displayNone');

		//scroll down page
	window.scrollBy(0, 320);	

	let detailLink = document.getElementById('detailLink');
	detailLink.innerHTML = "Hide Details -";
	//remove listener to show details
	detailLink.removeEventListener('click', showDetails);
	//add listener to hide details
	detailLink.addEventListener('click', hideDetails);


}

function hideDetails () {
	let detailsDiv = document.getElementById('details');
	detailsDiv.classList.add('displayNone');
	let detailLink = document.getElementById('detailLink');
	detailLink.innerHTML = "Show Details +";
	//remove listener to hide details
	detailLink.removeEventListener('click', hideDetails);
	//add listener to show details
	detailLink.addEventListener('click', showDetails);
}

//TODO - Parse float and round function! Use on a LOT here!


function eBayFeesCalc() {
	// books, media, dvds for individual OR store
	if (dropdown.selectedIndex == 1) {
		eBayFees = income * 0.12;
	}
	// Everything else for store
	else if (dropdown.selectedIndex == 0 && storeYes.checked) {
		eBayFees = income * 0.0915;
	}
	// Cameras, drones, money, phones for store
	else if ((dropdown.selectedIndex == 2 || dropdown.selectedIndex == 3 || dropdown.selectedIndex == 4) && storeYes.checked) {
		eBayFees = income * 0.0615;
	}
	// Computers, parts, video games for store
	else if ((dropdown.selectedIndex == 5 || dropdown.selectedIndex == 6 || dropdown.selectedIndex == 7 || dropdown.selectedIndex == 8) && storeYes.checked) {
		eBayFees = income * 0.04;
	}
	// no store selected...assume 10% fees
	else {
		eBayFees = income * 0.10;
	}
	// get float at the end
	eBayFees = parseFloat(eBayFees);
	eBayFees = eBayFees.toFixed(2);
}

function startOver() {
	// if this div exists...
	if (document.getElementById("details")) {
		document.getElementById("details").outerHTML = "";
	} 
	// add display none to the div
	if (!endProfit.classList.contains('displayNone')) { 
		endProfit.classList.add('displayNone'); 
	}
	if (document.getElementById('detailLink')) {
		let detailLink = document.getElementById('detailLink');
		detailLink.outerHTML = "";
	}
	if (document.getElementById('finalDollars')) {
    	document.getElementById('finalDollars').outerHTML = "";
	}
}

