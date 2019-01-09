// add event listener to button:

let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener('click', calculate);
let endProfit = document.getElementById('finalResult');
let storeYes = document.getElementById('storeRadioYes');
let storeNo = document.getElementById('storeRadioNo');

let salePrice;
let customerShipping;
let purchasePrice;
let shippingCost;
let eBayFees;
let payPalFees;
let netProfit;

let income;
let expenses;

function calculate () {
	calculateButton.removeEventListener('click', calculate);
	// salePrice + customerShipping - purchasePrice
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


	eBayFees = (salePrice + customerShipping) * 0.10;
	// If they have an eBay store, apply 0.85% discount to fees
	if (storeYes.checked) {
		eBayFees = (salePrice + customerShipping) * 0.0915;
	}
	eBayFees = parseFloat(eBayFees);
	eBayFees = eBayFees.toFixed(2);
	payPalFees = (salePrice + customerShipping) * 0.029 + 0.30;
	payPalFees = parseFloat(payPalFees);
	payPalFees = payPalFees.toFixed(2);

	netProfit = salePrice + customerShipping - purchasePrice - shippingCost - eBayFees - payPalFees;
	netProfit = parseFloat(netProfit).toFixed(2);

	income = salePrice + customerShipping;
	income = parseFloat(income).toFixed(2);
	expenses = purchasePrice + shippingCost + parseFloat(eBayFees) + parseFloat(payPalFees);
	expenses = parseFloat(expenses).toFixed(2);


	// display as new div...	
	endProfit.insertAdjacentHTML('beforeend', `<span id="finalDollars"> $${netProfit} </span>`);
	setTimeout(function() {
		endProfit.classList.remove("displayNone");
		endProfit.classList.add("rows");
	}, 500);
	endProfit.insertAdjacentHTML('beforeend', `<br /> <p id="detailLink"> Show Details + </p> <br />`);
	let detailLink = document.getElementById('detailLink');
	detailLink.addEventListener('click', showDetails);
}


function showDetails () {
	endProfit.insertAdjacentHTML('afterend',
	`<div id="details" class="displayNone">
			<p> Income: $${income} </p>
			<ul>
				<li> Sale Price: $${salePrice} </li>
				<li> Shipping Paid by Customer: $${customerShipping} </li>
			</ul>
			<p> Expenses: $${expenses} </p>
			<ul> 
				<li> Item cost: $${purchasePrice} </li>
				<li> Shipping to Customer: $${shippingCost} </li>
				<li> eBay Fees: $${eBayFees} </li>
				<li> PayPal Fees: $${payPalFees} </li>
			</ul>
		</div>`);
	let detailsDiv = document.getElementById('details');
	detailsDiv.classList.remove('displayNone');
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