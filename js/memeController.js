'use strict'

let gElcanvas
let gCtx
let gisGalleryOpen = true
let isFirstLoad = true
let isMenuOpen=true
let gLineStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElcanvas = document.querySelector('#my-canvas')
    gCtx = gElcanvas.getContext('2d')
 
   resizeCanvas()
   document.querySelector('.meme-editor').classList.add('display-none')
   renderImgsToGallery()
   addListeners()
   renderEmojis()
     renderMeme()
}
//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
  }
  
  function addMouseListeners() {
    gElcanvas.addEventListener('mousedown', onDown)
    gElcanvas.addEventListener('mousemove', onMove)
    gElcanvas.addEventListener('mouseup', onUp)
  }
  
  function addTouchListeners() {
    gElcanvas.addEventListener('touchstart', onDown)
    gElcanvas.addEventListener('touchmove', onMove)
    gElcanvas.addEventListener('touchend', onUp)
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
    ChangePage(diff)
    renderEmojis()
}

function renderEmojis() {
    const elEmojysContainer = document.querySelector('.emojy-container')
    const emojy = getEmojys()
    console.log('emojy',emojy);
    
    elEmojysContainer.innerHTML = emojy

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
        console.log('holalalala');
        
        elEditor.classList.remove('display-none')
        elGallery.classList.add('display-none')
        gisGalleryOpen = false
    } else {
        elEditor.classList.add('display-none')
        elGallery.classList.remove('display-none')
        gisGalleryOpen = true
    }

}

function getEmojys() {
    let emojys = gEmojys
    const startIdx = gPageIdx * PAGE_SIZE
    emojys = emojys.slice(startIdx, startIdx + PAGE_SIZE)
    return emojys.join('')
}

function onAddTextLine() {
    clearRects()
    addTextLine()
    renderMeme()
}

function onSwitchTextLine() {
    let selectedLine = getSelectedLine()
    console.log('selectedLine controler',selectedLine);
   
    if (selectedLine === 0) updateSelectedLine(1)
    if (selectedLine === 1)updateSelectedLine(2)
    if (selectedLine === 2)updateSelectedLine(3)
    if (selectedLine === 3)updateSelectedLine(0)
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
    } else if(slectedLine === 1) {
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
        
        if (type === 'fill') setNewColor(color, slectedLine)
        if (type === 'stroke') setNewStrokeColor(color, slectedLine)
        renderMeme()    
    } else {
        if (type === 'fill') setNewColor(color, slectedLine)
        if (type === 'stroke') setNewStrokeColor(color, slectedLine)
        renderMeme()
        
    }

}

function renderMeme() {
    let lines = getLines()
    const img = new Image()
    const src = getUrl()
    if(!src)return
    img.src = src
   
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElcanvas.width, gElcanvas.height) //img,x,y,xEnd,yEnd
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            drawText(line)
            if (line.txt) drawRect(line)
           // renderEmojyToCanvas()
        }
    }
}

function onImgSelect(idx) {
    setMemeSelectedImgId(idx)
    toggleGallery()
    renderMeme()
}

function onDrawText(text) {
    let selectedLine=getSelectedLine()
    if(gMeme.lines[selectedLine].txt === 'your text goes here...')gMeme.lines[selectedLine].txt=''
    updateText(text)
   
    renderMeme()
}

function drawText(memeLine) {
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

    let txtWidth = gCtx.measureText(memeLine.txt).width
    let txthight = gCtx.measureText(memeLine.txt).actualBoundingBoxAscent + gCtx.measureText(memeLine.txt).actualBoundingBoxDescent

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


function renderImgsToGallery() {
    const imgs = getImgs()

    let elImgsContainer = document.querySelector('.meme-gallery .imgs-container')
    let strHtmls = imgs.map(img => `<div class="gallery-image-container" onclick="onImgSelect(${img.id})">
    <img  class="gallery-image" src="img/${img.id}.jpg"></img></div>\n`)

    elImgsContainer.innerHTML = strHtmls.join('')
}

function onDownload(elLink) {
    clearRects()
    renderMeme()
    setTimeout(() => {
          downloadCanvas(elLink)
    }, 1000);
  

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElcanvas.width = elContainer.offsetWidth
    gElcanvas.height = elContainer.offsetHeight
}