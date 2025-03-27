// Captura todos os inputs radio
let radios = document.querySelectorAll('input[name="option"]');
let customInput = document.querySelector(".container__custom-input");
let customLabel = document.querySelector(".container__button--custom");
let numberInputs = document.querySelectorAll('.container__value');
let spans = document.querySelectorAll('.container__span')
let bill = document.querySelector('.container__value--bill');
let people = document.querySelector('.container__value--people');
let selecionado = null;
let valorSelecionado = null;
const resetBtn = document.querySelector(".result__btn--button");
let containerTipAmount = document.querySelector(".results-content__result--tip")
 let containerTotalAmount = document.querySelector(".results-content__result--total")


function atualizarValor() {
    radios.forEach(radio => {
        radio.parentElement.classList.remove("container__button--selected");
    });
    customLabel.classList.remove(".container__button--border");
    selecionado = document.querySelector('input[name="option"]:checked');


    if (selecionado) { 
        valorSelecionado = parseFloat(selecionado.value);
        console.log("Valor selecionado:", valorSelecionado);
        selecionado.parentElement.classList.add("container__button--selected");
        customInput.value = "";
    }
    
}

function habilitarReset(){
    if((bill.value !== 0 || "") || (people.value !== 0 || "") || (valorSelecionado !== null)){
        
        resetBtn.disabled = false;

    }
    else{
        resetBtn.disabled = true;
    }
}
function resetar(){
    bill.value = "";
    people.value = "";
    selecionado = null;
    valorSelecionado = null;
    customInput.value = "";
    bill.parentElement.querySelector('.container__caption').querySelector(".container__span").classList.remove("container__span--visible"); 
    people.parentElement.querySelector('.container__caption').querySelector(".container__span").classList.remove("container__span--visible"); 
    customLabel.classList.remove("container__button--border")
    radios.forEach(radio => {
        radio.removeAttribute('checked');
        radio.parentElement.classList.remove("container__button--selected");
    });
    containerTipAmount.innerHTML = "$0.00";
    containerTotalAmount.innerHTML = "$0.00";
    resetBtn.disabled = true;
}

function verificarNumber() {
    if (Number(this.value) === 0 && this.value !== "") {
        // ✅ Verifica se o elemento existe antes de tentar acessar
        this.parentElement.querySelector('.container__caption')?.querySelector(".container__span")?.classList.add("container__span--visible");
    } else {
        this.parentElement.querySelector('.container__caption')?.querySelector(".container__span")?.classList.remove("container__span--visible");
    }
}

function calcular(){
 let valorBill = parseFloat(bill.value);  
 let valorPeople = parseFloat(people.value);
 if(
    !isNaN(valorBill) && !isNaN(valorPeople) && valorBill > 0 && valorPeople > 0 && !isNaN(valorSelecionado)
 ){
 let resultadoTotal = valorBill + (valorBill * valorSelecionado);
 let tipamountperson = (valorBill * valorSelecionado) / valorPeople;
 let totalamountperson = resultadoTotal / valorPeople;
 containerTipAmount.textContent = "$" + tipamountperson.toFixed(2);
 containerTotalAmount.textContent = "$" + totalamountperson.toFixed(2);}
 else {
    containerTipAmount.textContent = "$0.00";
    containerTotalAmount.textContent = "$0.00";
 }
}
function removerZerosEsquerda(input) {
    if (!input.value.endsWith(".")){
    input.value = input.value.replace(/^0+(?=\d)/, '');
}}

function validarInput(event) {
    console.log("Tecla:", event.key, "| Valor atual:", event.target.value);
    if (
        event.key === 'Backspace' || 
        event.key === 'Delete' || 
        event.key === 'ArrowLeft' || 
        event.key === 'ArrowRight'
    ) {
        return;
    }

    // ✅ Regex atualizado para permitir apenas um ponto decimal e números válidos
   if (!/^\d*(\.\d*)?$/.test(event.target.value + event.key)) {
        event.preventDefault(); // Bloqueia valor inválido

}
}




numberInputs.forEach(numberInput => {
    numberInput.addEventListener("input", function() {
        verificarNumber.call(this);
        habilitarReset();
            calcular();
            removerZerosEsquerda(this);
         
    });
}); 

// Adiciona evento para cada radio button
radios.forEach(radio => {
    radio.addEventListener("change", () => { atualizarValor();
         habilitarReset();
            calcular();
        
        });
});

customInput.addEventListener("focus", function() {
    radios.forEach(radio => {
        radio.checked = false;
        radio.parentElement.classList.remove("container__button--selected");
    });
    customLabel.classList.add("container__button--border");
    valorSelecionado = 0;
    selecionado = customInput
});
customInput.addEventListener("input", function() {
    console.log(customInput.value);
    if(customInput.value !== ""){
    valorSelecionado = parseFloat(customInput.value) / 100;}
    else{
        valorSelecionado = 0;
    }
    habilitarReset()
        calcular();
        removerZerosEsquerda(this);
    
}
)




document.addEventListener("wheel", function(event) {
    if (document.activeElement.type === "number") {
        event.preventDefault();
    }
    
}, { passive: false });

[...numberInputs, customInput].forEach(input => {
    input.addEventListener("keydown", validarInput); // ✅ Usa regex atualizado
    input.addEventListener("input", function() {
        verificarNumber.call(this);
        habilitarReset();
        calcular();
        removerZerosEsquerda(this);
    });
});

