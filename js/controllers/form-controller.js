import Address from "../models/address.js";
import * as addressService from "../services/address-service.js"

function State() {
    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();

export function init() {
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener("change", handleInputNumberChange);
    state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
    state.btnClear.addEventListener("click", handleBtnClearClick);
    state.btnSave.addEventListener("click", handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange)

}

function handleInputNumberKeyup(event) {
    state.address.number = event.target.value;
}

async function handleInputCepChange(event) {
    const cep = event.target.value;

    try {
        const address = await addressService.findByCep(cep)
        
        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        state.address = address;
    
        setFormerError("cep", "")
        state.inputNumber.focus();
    }
    catch (e) {
        state.inputCity.value = "";
        state.inputStreet.value = "";
        setFormerError("cep", "Informe um CEP válido")
    }
}

function handleInputNumberChange(event) {
    if (event.target.value == "") {
        setFormerError("number", "Campo requerido!");
    } else {
        setFormerError("number", "");
    }
}

function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

async function handleBtnSaveClick(event) {
    
    event.preventDefault()
    console.log(event.target);
}

function setFormerError(key, value) {
    const element = document.querySelector(`[data-error=${key}]`);
    element.innerHTML = value;
}

function clearForm() {
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormerError("cep", "");
    setFormerError("number", "");

    state.inputCep.focus();
}
