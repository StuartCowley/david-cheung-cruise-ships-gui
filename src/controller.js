class Controller {
    constructor(ship) {
        this.ship = ship;
        this.initialiseSea();
        if (ship.itinerary.ports.length > 0) {
            this.headUpDisplay();
        }
        document.querySelector('#sailbutton').addEventListener('click', () => {
            this.setSail();
        });
    }
    initialiseSea() {
        const backgrounds = ['./images/water0.png','./images/water1.png'];
        let backgroundIndex = 0;
        window.setInterval(() => {
            document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
            backgroundIndex += 1;
        }, 1000);
    }
    renderPorts(ports) {
        const portsElement = document.querySelector('#ports');
        portsElement.style.width = '0px';
        ports.forEach((port, index) => {
            this.renderOnePort(portsElement,port,index);
        })
    }
    renderOnePort(portsElement,port,index) {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
    }
    renderShip() {
        const ship = this.ship;
        if (ship.itinerary.ports.length > 0) {
            const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
            const shipElement = document.querySelector('#ship');
            shipElement.style.top = `${portElement.offsetTop + 32}px`;
            shipElement.style.left = `${portElement.offsetLeft - 32}px`;
        }
    }
    setSail() {
        const ship = this.ship
        if (ship.itinerary.ports.length === 0) {
            this.renderMessage('Welcome! Please add Ports first!');
            return 0;
        }
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
        let msg;
        if (!nextPortElement) {
            this.renderMessage('End of the itinerary!');
            return 0;
        } else {
            this.renderMessage(`Now departing ${ship.currentPort.name}`);
            document.getElementById("sailbutton").disabled = true;
        }
        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.setSail();
                ship.dock();
                this.renderMessage(`Now dock at ${ship.currentPort.name}`);
                clearInterval(sailInterval);
                this.headUpDisplay();
                document.getElementById("sailbutton").disabled = false;
            }
            shipElement.style.left = `${shipLeft + 1}px`;
        }, 20);
    }
    renderMessage(msg) {
        const viewElement = document.querySelector('#viewport');
        const msgElement = document.createElement('div');
        msgElement.id = 'message';
        msgElement.innerHTML = msg;
        viewElement.appendChild(msgElement);
        window.setTimeout(() => {
            viewElement.removeChild(msgElement);
        }, 2000);
    }
    headUpDisplay() {
        const ship = this.ship
        if (ship.itinerary.ports.length > 0 && ship.currentPort !== null) {
            const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const nextPortIndex = currentPortIndex + 1;
            let msgHD = `Current Port : ${ship.itinerary.ports[currentPortIndex].name}`;
            if (nextPortIndex < ship.itinerary.ports.length) {
                msgHD += `<br>Next Port : ${ship.itinerary.ports[nextPortIndex].name}`;
            }
            document.getElementById("headUpDisplay").innerHTML = msgHD;
        }
    }
    addNewPort() {
        const portName = document.getElementById("portName").value;
        const newPort = new Port(portName);
        itinerary.ports.push(newPort);
        ship.itinerary = itinerary;
        if (ship.currentPort === null) {
            ship.currentPort = itinerary.ports[0];
        }
        const portsElement = document.querySelector('#ports');
        const newIndex = itinerary.ports.length - 1;
        this.renderOnePort(portsElement,newPort,newIndex);
    }
}
