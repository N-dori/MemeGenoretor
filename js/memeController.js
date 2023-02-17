'use strict'

let gElcanvas
let gCtx
let gisGalleryOpen = true
let isFirstLoad = true
let isMenuOpen=true

function onInit() {
    gElcanvas = document.querySelector('#my-canvas')
    gCtx = gElcanvas.getContext('2d')

    document.querySelector('.meme-editor').classList.add('display-none')
    renderImgsToGallery()
    renderEmojis()
    // resizeCanvas()
    //  renderMeme()
}
function toggleMenu(){
    let elscreen=document.querySelector('.main-screen')
    let elNavBar=document.querySelector('.nav-bar')
    if(isMenuOpen){
     elscreen.style.display='block'
     elNavBar.style.translate='0%'
     isMenuOpen=false
   }
   else{
    elNavBar.style.translate='100%'
    elscreen.style.display='none'
    isMenuOpen=true
   } 
}
function onChangePage(diff) {
    console.log('diff', diff);

    ChangePage(diff)
    renderEmojis()
}

function renderEmojis() {
    const elEmojysContainer = document.querySelector('.emojy-container')
    const emojys = getEmojys()
    elEmojysContainer.innerHTML = emojys

}

function toggleGallery(first) {
    if(first){
        if(isFirstLoad)return
    else isFirstLoad=false
}
isFirstLoad=false
    let elEditor = document.querySelector('.meme-editor')
    let elGallery = document.querySelector('.meme-gallery')
    if (gisGalleryOpen) {
        elEditor.classList.remove('display-none')
        elGallery.classList.add('display-none')
        gisGalleryOpen = false
    } else {
        elEditor.classList.add('display-none')
        elGallery.classList.remove('display-none')
        gisGalleryOpen = true
    }

}

function onAddTextLine() {
    addTextLine()
}

function onSwitchTextLine() {
    let selectedLine = getSelectedLine()
    if (selectedLine === 0){} updateSelectedLine(1)
    if (selectedLine === 1) updateSelectedLine(0)
}

function onChangeFont(font) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        updateFontFamily(font, slectedLine)
        renderMeme()
    } else {
        updateFontFamily(font, slectedLine)
        renderMeme()

    }

}

function onRemoveTextLine() {
    let slectedLine = getSelectedLine()
    removeTextLine(slectedLine)
    renderMeme()
}

function onAlignText(alignType) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        setAlignment(alignType, slectedLine)
        renderMeme()
    } else {
        setAlignment(alignType, slectedLine)
        renderMeme()
    }

}

function onChangeFontSize(diff) {
    let slectedLine = getSelectedLine()
    if (slectedLine === 0) {
        changeFontSize(diff, slectedLine)
        renderMeme()

    } else {
        changeFontSize(diff, slectedLine)
        renderMeme()
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




function renderMeme() {
    let lines = getLines()
    const img = new Image()
    const src = getUrl()
    img.src = src
   
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElcanvas.width, gElcanvas.height) //img,x,y,xEnd,yEnd
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            drawText(line)
            if (line.txt) drawRect(line)
        }
    }
}

function onImgSelect(idx) {
    setMemeSelectedImgId(idx)
    toggleGallery()
    renderMeme()


}
function onDrawText(text) {
    updateText(text)
    renderMeme()

}
function drawText(memeLine) {
    console.log('memeLine', memeLine.align);

    gCtx.lineWidth = 1
    gCtx.strokeStyle = memeLine.stroke
    gCtx.fillStyle = memeLine.color
    gCtx.font = `${memeLine.size}px ${memeLine.font}`
    gCtx.textAlign = memeLine.align
    gCtx.textBaseline = 'middle'

    gCtx.fillText(memeLine.txt, memeLine.x, memeLine.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(memeLine.txt, memeLine.x, memeLine.y) // Draws (strokes) a given text at the given (x, y) position.

}

function drawRect(memeLine) {
    // let slectedLine = getSelectedLine()

    // console.log('slectedLine', slectedLine);


    let txtWidth = gCtx.measureText(memeLine.txt).width
    let txthight = gCtx.measureText(memeLine.txt).actualBoundingBoxAscent + gCtx.measureText(memeLine.txt).actualBoundingBoxDescent
    console.log('txthight', txthight);

    gCtx.strokeStyle = memeLine.rectColor

    if (memeLine.align === 'center') {
        gCtx.textBaseline = 'middle'
        gCtx.strokeRect(memeLine.x - (txtWidth / 2), (memeLine.y - (txthight / 2)) - (txthight / 2), txtWidth, txthight * 2)
    }
    if (memeLine.align === 'right') {
        gCtx.textBaseline = 'middle'
        gCtx.strokeRect(memeLine.x - txtWidth, (memeLine.y - (txthight / 2)) - (txthight / 2), txtWidth, txthight * 2)
    }
    if (memeLine.align === 'left') {
        gCtx.textBaseline = 'middle'
        gCtx.strokeRect(memeLine.x, (memeLine.y - (txthight / 2)) - (txthight / 2), txtWidth, txthight * 2)
    }
  
}
// gCtx.fillStyle = color
// gCtx.fillRect(x, y, size, size)


function renderImgsToGallery() {
    const imgs = getImgs()

    // <img src="/img/1.jpg"></img>
    let elImgsContainer = document.querySelector('.meme-gallery .imgs-container')
    let strHtmls = imgs.map(img => `<div class="gallery-image-container" onclick="onImgSelect(${img.id})">
    <img  class="gallery-image" src="/img/${img.id}.jpg"></img></div>\n`)

    elImgsContainer.innerHTML = strHtmls.join('')
}

function onDownload(elLink) {
    clearRects()
    renderMeme()
    setTimeout(() => {
          downloadCanvas(elLink)
    }, 1000);
  

}
//meme


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElcanvas.width = elContainer.offsetWidth
    gElcanvas.height = elContainer.offsetHeight
}