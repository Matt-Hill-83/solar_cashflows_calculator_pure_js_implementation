WellsFargoAPI = (function() {
  function WellsFargoAPI() {
    this.rates = {
      rates: [ 
      {term: 10, rate: 4.125, cost: 1275.00},
      {term: 15, rate: 4.275, cost: 1375.00},
      {term: 20, rate: 4.391, cost: 1475.00},
      {term: 30, rate: 4.411, cost: 1575.00}
    ]};
  }
  WellsFargoAPI.prototype.getRatesAndCost = function() {
    return this.rates;
  };

  return WellsFargoAPI;
})();
