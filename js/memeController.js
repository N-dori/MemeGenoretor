'use strict'
console.log('hi');

let gCanvas
let gCtx

let isFirstLoad=true

function onInit(){
    gCanvas = document.querySelector('#my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderImgsToGallery()
    renderMeme(0)
}
function onAlignText(alignType){
    let elText=document.querySelector(`.display-txt-top`)
    setAlignText(alignType)
    console.log('alignType',alignType);
    
    if(alignType==='l') elText.style.textAlign='left'
    if(alignType==='c') elText.style.textAlign='center'
    if(alignType==='r') elText.style.textAlign='right'
}

function onChangeFontSize(diff){
    let fontSize=changeFontSize(diff)
    let elTxtDisplay=document.querySelector('.display-txt-top')
   elTxtDisplay.style.fontSize=fontSize+'px'
   
}


function onchangecolor(type,color){
   let elText=document.querySelector(`.display-txt-top`)
    if(type==='fill')elText.style.color=color +''   
    if(type==='stroke')elText.style.webkitTextStroke= `1px`;
    setNewColor(color)
}
function onSetLineTxt(txt){
    //recive text from this.value
    setLineTxt(txt)
}

function renderText(value){
    let elTxtDisplay=document.querySelector('.display-txt-top')
    elTxtDisplay.innerHTML=value
}

function  renderMeme(idx){

    
    const meme=getMeme(idx)
    setCurrMeme(meme)
 
    console.log('meme',meme);
  
    const url=getUrl(idx)
    
    drawImgFromlocal(url)

}

function onImgSelect(idx){
    renderMeme(idx-1)
}

function renderImgsToGallery(){
    const imgs=getImgs()
    let count=1
    let count2=1
    // <img src="/img/1.jpg"></img>
    let elImgsContainer=document.querySelector('.meme-gallery .imgs-container')
    let strHtmls=imgs.map(img=>`<div class="gallery-image-container" onclick="onImgSelect(${count2++})">
    <img  class="gallery-image" src="/img/${count++}.jpg"></img></div>\n`)
    
    elImgsContainer.innerHTML=strHtmls.join('')
}   

function drawImgFromlocal(url) {
    const img = new Image()    
    img.src = url
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xEnd,yEnd
    }
  }