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
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
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
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }
    else{display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); // adiciona o evento de atualizarDisplay, inserindo um número ao clicar nele
numeros.forEach(numero => numero.addEventListener('click',inserirNumero)); // adiciona o evento de click nos botões, para podermos ter um evento (ação) após clicar nos mesmos

const selecionarOperador = (evento) => {
    if(!novoNumero){
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    console.log(operador);
    }
}
operadores.forEach(operador => operador.addEventListener('click',selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);

}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }
        else{
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);


const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'operadorDivisao',
    '*' : 'operadorMultiplicacao',
    '+' : 'operadorSoma',
    '-' : 'operadorSubtracao',
    ',' : 'decimal',
    'Enter' : 'igual',
    'Delete' : 'limparCalculo',
    'Backspace' : 'backspace',
    'C' : 'limparDisplay',
    }

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown', mapearTeclado);