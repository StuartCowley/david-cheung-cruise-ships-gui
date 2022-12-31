(function exportItinerary() {
  class Itinerary {
    constructor(portsArray) {
      this.ports = portsArray;
    }
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Itinerary;
  } else {
    window.Itinerary = Itinerary;
  }
})();
