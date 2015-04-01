var LendaLender = function() {
  this.term = 0;
  this.rate = 0;
  this.payment = 0;
  this.fee = 0;
  this.savings = 0;

};

LendaLender.prototype.preProcess = function() {
  this.lendaRates = new LendaAPI();
  this.lendaData = this.lendaRates.rates;
  console.log(this.lendaData);
  return this.lendaData;

  // this.term = 0;
  // this.rate = 0;
  // this.cost = 0;
  // this.term = 0;
};


lenda = LendaLender();
lenda.preProcess();
wFargo = wFargoLender();
Quicken = QuickenLender();

lenderArray = [lenda, wFargo, Quicken];
outputArray = [];

//process data
for (var i = 0; i < lenderArray.length; i++){
  currentLender = lender.Array(i);

  var currentLender.preProcess();
  //var outputs produces table for html display
  var outputs = calcOutputs(currentLender);
  outputArray.push(outputs);
};

// display data
for (var i = 0; i < outputArray.length; i++){
  outputArray.displayData;
};




