// Monkey patch in new function on String.prototype to format currency numbers
String.prototype.insertComma = function() {
  // Remove number past decimal.
  var arr  = this.split(".");
  var newStr = arr[0];

  // Insert commas at appropriate locations.
  if (newStr.length > 6) {
    return (newStr.slice(0,-6) + "," + newStr.slice(-6, -3) + "," + newStr.slice(-3));
  } else if (newStr.length > 3) {
    return (newStr.slice(0,-3) + "," + newStr.slice(-3));
  }else{
    return newStr.slice(0);
  }
};

function calculateCashflows() {

  function setGraphOptions(){
    this.options = {
      pieHole: 0.6,
      'legend':'none',
      backgroundColor: 'transparent',
      pieSliceTextStyle: {
      color: 'transparent',
      },
    };
  };

  function setUpUiEvents(){
    // Set up UI events.
    document.getElementById("home-price-slider").onchange = function (){updateDisplay()};
    document.getElementById("down-payment-slider").onchange = function (){updateDisplay()};
    document.getElementById("interest-rate-slider").onchange = function (){updateDisplay()};

  }

  function initializeResultsDisplays(){
    this.resultsArray = [];

    var r1 = new Result();
    r1.name = 'O+M';
    r1.fixedCost = 500;
    r1.fractionOfProjectSize = 0.05;

    var r2 = new Result();
    r2.name = 'Inverters';
    r2.fixedCost = 500;
    r2.fractionOfProjectSize = 0.04;

    var r3 = new Result();
    r3.name = 'Insurance';
    r3.fixedCost = 500;
    r3.fractionOfProjectSize = 0.03;

    var r4 = new Result();
    r4.name = 'Debt Service';
    r4.fixedCost = 500;
    r4.fractionOfProjectSize = 0.02;

    this.resultsArray.push(r1);
    this.resultsArray.push(r2);
    this.resultsArray.push(r3);
    this.resultsArray.push(r4);
  }

  function getValuesFromSliders(){
    this.homePrice = document.getElementById("home-price-slider").value;
    this.downPayment = document.getElementById("down-payment-slider").value;
    this.interestRate = Number(document.getElementById("interest-rate-slider").value);
  };

  function updateNumericResults() {
    // Set result field next to slider value
    var homePriceResultEl = document.getElementById("home-price-result");
    homePriceResultEl.innerHTML = this.homePrice.insertComma();

    var downPaymentResultEl = document.getElementById("down-payment-result");
    downPaymentResultEl.innerHTML = this.downPayment;

    var interestRateResultEl = document.getElementById("interest-rate-result");
    interestRateResultEl.innerHTML = this.interestRate;
  };

  function calculateMonthlyPayment(){
    // Breakout of monthly payment calculation
    var monthlyInterestRate = this.interestRate/12/100;
    var termInYears = 1;
    var loanAmount = this.homePrice - (this.downPayment/100)*this.homePrice;

    var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * termInYears));
    var denominator = Math.pow((1 + monthlyInterestRate), (12.0 * termInYears)) - 1.0;
    var numOverDenom = numerator/denominator;
    this.monthlyPayment = loanAmount * numOverDenom;
    this.monthlyPaymentStr = monthlyPayment.toFixed(0).insertComma();

  };

  function appendSubPaymentResultDomElements(result){
    r = result
    var div = document.createElement("div");
    div.className = 'result-cost';
    var cost = r.value.toFixed(0).insertComma();
    var name = r.name;
    div.innerHTML = "$" + cost + "<br>" + name;
    var parent = document.getElementsByClassName("numeric-outputs-centering-div")[0];


    parent.appendChild(div);
  }

  function removeOldDivs(){
    // Remove divs from previous display cycle
    var parent = document.getElementsByClassName("numeric-outputs-centering-div")[0];
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
  };

  function updateMonthlyPaymentResults(){
    var monthlyPaymentResult = document.getElementById("monthly-payment-result");
    monthlyPaymentResult.innerHTML = '$' + this.monthlyPaymentStr;

    // Create and display broken out subpayments
    for(var i = 0; i<this.resultsArray.length; i++){
      r = resultsArray[i];
      r.value = r.fixedCost + this.monthlyPayment * r.fractionOfProjectSize;
      appendSubPaymentResultDomElements(r);
    };
  };

  function parseDataForPieChart(){
    // Create pie chart labels and values
    var dataArray = [];
    // Add headers.
    dataArray.push(['Expense', 'Per Year']);

    for(var i = 0; i<this.resultsArray.length; i++){
      r = resultsArray[i];
      var dataElement = [r.name, r.value ]
      dataArray.push(dataElement);
    };

    this.data = google.visualization.arrayToDataTable(dataArray);
  };

  function updatePieChart(){
    this.chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    this.chart.draw(this.data, this.options);
  }

  // This is called when the user changes the input values on the UI.
  function updateDisplay() {
    getValuesFromSliders();
    updateNumericResults();
    removeOldDivs();
    calculateMonthlyPayment();
    updateMonthlyPaymentResults();
    parseDataForPieChart();
    updatePieChart();
  };

  // Run these after the html loads.
  setUpUiEvents();
  setGraphOptions();
  initializeResultsDisplays();
  updateDisplay();

};
