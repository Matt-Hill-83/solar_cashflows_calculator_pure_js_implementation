LendaAPI = (function() {
  function LendaAPI() {
    this.cost = 0.0;
    this.rates = [ 
      {term: 10, rate: 3.900},
      {term: 15, rate: 4.000},
      {term: 20, rate: 4.100},
      {term: 30, rate: 4.200}
    ];
  }
  LendaAPI.prototype.getRateAndCostForTerm = function(term) {
    response = this.rates.filter(function(rate) { return rate.term === term })[0];
    response['cost'] = this.cost;
    return response;
  };

  return LendaAPI;
})();

