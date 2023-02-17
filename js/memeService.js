'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gEmojys=['😆','😜','😍','😟','😸','🕶', '🐨','🐯' ,'🦁','🐮','🐯' ,'🦁','🐮']
const PAGE_SIZE=3
let gPageIdx=0
let gImgs = createImgs()

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'your text...',
            size: 25,
            font: 'impact',
            align: 'center',
            color: 'white',
            stroke: 'black',
            rectColor:'orange',
            x: 200,
            y: 50,
            

        },
    ]
}

// console.log('gImgs', gImgs);
// console.log('gMeme', gMeme);
function ChangePage(diff){

    gPageIdx+=diff
    console.log('gPageIdx', gPageIdx)
    if (gPageIdx * PAGE_SIZE >= gEmojys.length||
        gPageIdx * PAGE_SIZE < 0){
            gPageIdx = 0
        } 
}

function nextPage() {
    gPageIdx++
    
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
   ;
}

function prevPage() {
    gPageIdx--
    console.log('gPageIdx', gPageIdx);

    if (gPageIdx * PAGE_SIZE < 0) {
        gPageIdx = 0
    }
}
function getEmojys(){
    let emojys=gEmojys
    const startIdx = gPageIdx * PAGE_SIZE
    emojys = emojys.slice(startIdx,startIdx + PAGE_SIZE)
    return emojys.join('')
}
function addTextLine() {
    if (gMeme.selectedLineIdx === 1) return
    let newLine = {
        txt: 'your text...',
        size: 25,
        font: 'impact',
        align: 'center',
        color: 'white',
        stroke: 'black',
        rectColor:'orange',
        x: 200,
        y: 380,
      
    }
    gMeme.lines.push(newLine)
    console.log('gmeme', gMeme);

}
function removeTextLine(slectedLine) {
    gMeme.lines[slectedLine].txt = ""
}

function updateFontFamily(font, slectedLine) {
    gMeme.lines[slectedLine].font = font
}


function setAlignment(alignType, slectedLine) {
    let memeLine=getMemeLine()
    let txtWidth= gCtx.measureText(memeLine.txt).width

    if (alignType === 'left') {
        gMeme.lines[slectedLine].align = alignType
        gMeme.lines[slectedLine].x = 10
    } else if (alignType === 'center') {
        gMeme.lines[slectedLine].align = alignType
        gMeme.lines[slectedLine].x = 250
    } else if (alignType === 'right') {
        gMeme.lines[slectedLine].align = alignType
        gMeme.lines[slectedLine].x = 420
        
    }
}

function updateSelectedLine(num) {
    gMeme.selectedLineIdx = num
    if(num===0){
        gMeme.lines[0].rectColor='orange'
        gMeme.lines[1].rectColor='rgba(255,255,255,0)'
    }else if(num===1){
        gMeme.lines[1].rectColor='orange'
        gMeme.lines[0].rectColor='rgba(255,255,255,0)'
    }
    
}
function getLines() {
    return gMeme.lines
}

function getSelectedLine() {
    return gMeme.selectedLineIdx
}
function changeFontSize(diff, slectedLine) {
    let fontSize = gMeme.lines[slectedLine].size
    fontSize += diff
    if (fontSize === 50) return
    gMeme.lines[slectedLine].size = fontSize
    console.log('fontSize', fontSize);



}
function setNewColor(color, slectedLine) {
    gMeme.lines[slectedLine].color = color
}


function setLineTxt(txt) {
    gMeme.lines[0].txt = txt

}

function updateText(txt) {
    let selectedLine = gMeme.selectedLineIdx


    gMeme.lines[selectedLine].txt = txt

}
function getMemeLine() {
    let selectedLine = gMeme.selectedLineIdx
    // console.log('gMeme.lines[selectedLine]',gMeme.lines[selectedLine]);

    return gMeme.lines[selectedLine]
}

function getImgs() {
    return gImgs
}

function getUrl() {

    let img = gImgs.find(img => gMeme.selectedImgId === img.id)

    return img.url
}

function setMemeSelectedImgId(idx) {
    gMeme.selectedImgId = idx
}
function getMeme() {
    return gMeme
}

function createImgs() {
    let imgs = []
    for (let i = 1; i <= 18; i++) {
        let img = createImg(i, `/img/${i}.jpg`)
        imgs.push(img)
    }
    return imgs
}

function createImg(id, url) {
    const img = {
        id,
        url,
        keyWords: ['funny', 'cat']
    }
    return img
}
function clearRects(){
       let lines= gMeme.lines
    lines.forEach(el => {
            el.rectColor='rgba(255,255,255,0)'        
    });
}
function downloadCanvas(elLink) {

    
    const data = gElcanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'
    gMeme.lines[0].rectColor='orange'

}