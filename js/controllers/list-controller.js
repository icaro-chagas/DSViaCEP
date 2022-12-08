
function State() {
    this.listSection = null;
}

export function init() {
    State.listSection = document.querySelector("#list-section");
    console.log(State.listSection);
}

export function addCard(address) {
    const card = createCard(address);
    State.listSection.appendChild(card);
}

function createCard(address) {
    const div = document.createElement('div')
    div.classList.add("card-list-item")

    /*const h3 = document.createElement("h3");
    h3.innerHTML = address.city;

    const p1 = document.createElement("p");
    p1.classList.add("address-line")
    p1.innerHTML = `${address.street}, ${address.number}`

    const p2 = document.createElement("p");
    p2.classList.add("address-line")
    p1.innerHTML = address.cep;

    div.appendChild(h3);
    div.appendChild(p1);
    div.appendChild(p2);*/

    div.innerHTML = `
    <h3>${address.city}</h3>
    <p class="address-line">${address.street}, ${address.number}</p>
    <p class="address-cep">${address.cep}</p>
    `

    console.log(div)

    return div;
}