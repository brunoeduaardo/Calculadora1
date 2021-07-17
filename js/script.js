'use strict';

const display = document.getElementById('display'); // seleciona a div "display" pelo ID, usando o seletor "getElementById"
const numeros = document.querySelectorAll('[id*=tecla]'); // seleciona os botões de número, através do seletor "querySelectorAll", usando um método para selecionar os ID's que contém a palavra "tecla"
const operadores = document.querySelectorAll('[id*=operador]'); // seleciona os botões de número, através do seletor "querySelectorAll", usando um método para selecionar os ID's que contém a palavra "operador"

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;


const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }
        else if(operador == "-"){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }
        else if(operador == "*"){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }
        else if(operador == "/"){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => { // variável responsável por adicionar os números no display
    if (novoNumero){
        display.textContent = texto;
        novoNumero = false;
    }
    else{display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); // adiciona o evento de atualizarDisplay, inserindo um número ao clicar nele
numeros.forEach(numero => numero.addEventListener('click',inserirNumero)); // adiciona o evento de click nos botões, para podermos ter um evento (ação) após clicar nos mesmos

const selecionarOperador = (evento) => {
    if(!novoNumero){
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent);
    console.log(operador);
    }
}
operadores.forEach(operador => operador.addEventListener('click',selecionarOperador));



