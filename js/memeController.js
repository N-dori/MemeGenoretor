'use strict'
console.log('hi');

let gCanvas
let gCtx
let gisGalleryOpen=true

let isFirstLoad = true

function onInit() {
    gCanvas = document.querySelector('#my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderImgsToGallery()
    renderMeme(0)
}
function toggleGallery(){
    let elEditor=document.querySelector('.meme-editor')
    let elGallery=document.querySelector('.meme-gallery')
    if(gisGalleryOpen){
          elEditor.classList.add('display-none')
    elGallery.style.display='block'
    gisGalleryOpen=false
    }else{
        elEditor.classList.remove('display-none')
        elGallery.style.display='none'
        gisGalleryOpen=true
    }
  
}
function onSwitchTextLine() {
    let selectedLine = getSelectedLine()
    if (selectedLine === 0) updateSelectedLine(1)
    if (selectedLine === 1) updateSelectedLine(0)

}

function onChangeFont(font) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        let elTxtDisplay = document.querySelector('.display-txt.top')
        elTxtDisplay.style.fontFamily = font
    } else {
        let elTxtDisplay = document.querySelector('.display-txt.battom')
        elTxtDisplay.style.fontFamily = font
    }

}

function onAlignText(alignType) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        let elTxtDisplay = document.querySelector('.display-txt.top')
        elTxtDisplay.style.textAlign = alignType
    } else {
        let elTxtDisplay = document.querySelector('.display-txt.battom')
        elTxtDisplay.style.textAlign = alignType
    }
    setAlignText(alignType, slectedLine)
    console.log('alignType', alignType);
}

function onChangeFontSize(diff) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        let fontSize = changeFontSize(diff, slectedLine)
        let elTxtDisplay = document.querySelector('.display-txt.top')
        elTxtDisplay.style.fontSize = fontSize + 'px'
    } else {
        let fontSize = changeFontSize(diff, slectedLine)
        let elTxtDisplay = document.querySelector('.display-txt.battom')
        elTxtDisplay.style.fontSize = fontSize + 'px'
    }


}


function onchangecolor(type, color) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        let elText = document.querySelector('.display-txt.top')
        if (type === 'fill') elText.style.color = color + ''
        if (type === 'stroke') elText.style.webkitTextStroke = `1px`;
        setNewColor(color, slectedLine)
    } else {
        let elText = document.querySelector('.display-txt.battom')
        if (type === 'fill') elText.style.color = color + ''
        if (type === 'stroke') elText.style.webkitTextStroke = `1px`;
        setNewColor(color, slectedLine)
    }

}
function onSetLineTxt(txt) {
    //recive text from this.value
    setLineTxt(txt)
}

function renderText(value) {
    let elTxtDisplayTop = document.querySelector('.display-txt.top')
    let elTxtDisplayBattom = document.querySelector('.display-txt.battom')
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        elTxtDisplayTop.innerHTML = value
        elTxtDisplayTop.style.border = `1px solid orange`
        elTxtDisplayBattom.style.border = `none`
    } else {
        elTxtDisplayBattom.innerHTML = value
        elTxtDisplayBattom.style.border = `1px solid orange`
        elTxtDisplayTop.style.border = `none`
    }

}

function renderMeme(idx) {


    const meme = getMeme(idx)
    setCurrMeme(meme)

    console.log('meme', meme);

    const url = getUrl(idx)

    drawImgFromlocal(url)

}

function onImgSelect(idx) {
    renderMeme(idx - 1)
    toggleGallery()

}

function renderImgsToGallery() {
    const imgs = getImgs()
    let count = 1
    let count2 = 1
    // <img src="/img/1.jpg"></img>
    let elImgsContainer = document.querySelector('.meme-gallery .imgs-container')
    let strHtmls = imgs.map(img => `<div class="gallery-image-container" onclick="onImgSelect(${count2++})">
    <img  class="gallery-image" src="/img/${count++}.jpg"></img></div>\n`)

    elImgsContainer.innerHTML = strHtmls.join('')
}

function drawImgFromlocal(url) {
    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xEnd,yEnd
    }
}