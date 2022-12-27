const itinerary = new Itinerary([]);
const ship = new Ship(itinerary);
const controller = new Controller(ship);
controller.renderPorts(itinerary.ports);
controller.renderShip();

const formElem = document.querySelector('form');
formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // construct a FormData object, which fires the formdata event
    new FormData(formElem);
});
formElem.addEventListener('formdata', (e) => {
    // Get the form data from the event object
    const data = e.formData;
    for (const value of data.values()) {
        if (value === '') {
            controller.renderMessage('Please add Port Name!');
            return 0;
        }
        if (itinerary.ports.length > 0 && value === itinerary.ports[itinerary.ports.length - 1].name) {
            controller.renderMessage('Port Name is same to End of itinerary!');
            return 0;
        }
        controller.addNewPort();
        controller.headUpDisplay();
        document.getElementById("portName").value = '';
        if (ship.itinerary.ports.length === 1) {
            controller.renderShip();
            ship.dock();
            controller.renderMessage(`Now dock at ${ship.currentPort.name}`);
        }
    }
});




