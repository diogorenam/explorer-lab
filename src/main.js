import "./css/index.css";
import IMask, { MaskedPattern } from "imask";
const alterarcolors1 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const alterarcolors2 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
);

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"],
    
  };
  
  alterarcolors1.setAttribute("fill", colors[type][0]);
  alterarcolors2.setAttribute("fill", colors[type][1]);
}
setCardType("default");

const securityCode = document.querySelector("#security-code");
const securyCodePattern = {
  mask: "0000",
};
const securityCodeMasked = IMask(securityCode, securyCodePattern);

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // fomarta a data pegando o ano atual
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
};
const expireDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector("#card-number");

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      type: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-6-7]\d{0,2})\d{0,12}/,
      type: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      type: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundmask = dynamicMasked.compiledMasks.find(function(item){
      return number.match(item.regex)
    })
    
    return foundmask
  },
 
};
 const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

 const AddButton = document.querySelector("#add-card")
AddButton.addEventListener("click", () =>{
 
})

document.querySelector("form").addEventListener("submit", (event)=>{
  event.preventDefault()
})
//Pegando o nome do titular do cartão.
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
      const ccHolder = document.querySelector(".cc-holder .value")
         ccHolder.innerText = cardHolder.value.length === 0? "FULANO DA SILVA": cardHolder.value
    })


// Pegando o valor digitado no CVC 
securityCodeMasked.on("accept", ()=>{
  updateSecurityCode(securityCodeMasked.value);
})

function updateSecurityCode(code){
  const ccCode = document.querySelector(".cc-security .value")
    ccCode.innerText = code.length === 0 ? "123": code
}

//Pegando número digitado pelo usuario
cardNumberMasked.on("accept", () =>{
  const cardType = cardNumberMasked.masked.currentMask.type
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value);
})

function updateCardNumber(number){
  const ccNumber = document.querySelector(".cc-number")
    ccNumber.innerText = number.length == 0 ? "1234 5678 9012 3456" : number
}

//Pegando a data do cartão
expireDateMasked.on("accept", () =>{
  updateExpireDate(expireDateMasked.value)
})

function updateExpireDate(date){
  const ccDate = document.querySelector(".cc-expiration .value")
   ccDate.innerText = date.length === 0 ? "02/32" : date
}