const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(" .dropdown select");
const button=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");


window.addEventListener("load",()=>{
        updateexchangerate();
});



for(let select of dropdowns){
  for(currcode in countrylist){
    let newOption=document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;
    if(select.name==="from" && currcode==="USD"){
      newOption.selected="selected";
    }
    else if(select.name==="to" && currcode==="INR"){
      newOption.selected="selected";
    }
    select.append(newOption);
    
  }

  select.addEventListener("change", (evt)=>{
    updateflag(evt.target);

  });
 
}

 


const updateflag=(element)=>{
  let currcode=element.value;
  let countrycode=countrylist[currcode];
  let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
}


  

button.addEventListener("click",(evt)=>{
  evt.preventDefault();     //  form mai page refresh nahi hoga
 updateexchangerate();


});



updateexchangerate= async()=>{
  let amount=document.querySelector(".amount input");
  let amtval=amount.value;
  if(amtval==="" || amtval<1){
    amtval=1;
    amount.value="1";
  }
//console.log(fromcurr.value,tocurr.value);
const url=`${base_url}/${fromcurr.value.toLowerCase()}.json`;


let resposnse=await fetch(url);
let data=await resposnse.json();

let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

let finalamount=amtval*rate;

msg.innerText=`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`


}






