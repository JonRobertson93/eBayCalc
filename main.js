// add event listener to button:

let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener('click', calculate);
let endProfit = document.getElementById('finalResult');
let storeYes = document.getElementById('storeRadioYes');
let storeNo = document.getElementById('storeRadioNo');

function calculate () {
	// salePrice + customerShipping - purchasePrice
	let salePrice = document.getElementsByName("salePrice")[0].value;
	if (!salePrice) {
		salePrice = 0.00;
	}
	let customerShipping = document.getElementsByName("customerShipping")[0].value;
	if (!customerShipping) {
		customerShipping = 0.00;
	}
	let purchasePrice = document.getElementsByName("purchasePrice")[0].value;
	if (!purchasePrice) {
		purchasePrice = 0.00;
	}
	let shippingCost = document.getElementsByName("shippingCost")[0].value;
	if (!shippingCost) {
		shippingCost = 0.00;
	}
	// convert to floats/ints
	salePrice = parseFloat(salePrice);
	customerShipping = parseFloat(customerShipping);
	purchasePrice = parseFloat(purchasePrice);
	shippingCost = parseFloat(shippingCost);


	let eBayFees = (salePrice + customerShipping) * 0.10;
	// If they have an eBay store, apply 0.85% discount to fees
	if (storeYes.checked) {
		eBayFees = (salePrice + customerShipping) * 0.0915;
	}
	let payPalFees = (salePrice + customerShipping) * 0.029 + 0.30;

	let netProfit = salePrice + customerShipping - purchasePrice - shippingCost - eBayFees - payPalFees;
	netProfit = netProfit.toFixed(2);


	// display as new div...	
	endProfit.insertAdjacentHTML('beforeend', `<span id="finalDollars"> $${netProfit} </span>`);
	setTimeout(function() {
		endProfit.classList.remove("displayNone");
		endProfit.classList.add("rows");
	}, 500);
	
}