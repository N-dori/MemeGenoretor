'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
let gImgs = createImgs()

let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            font: 'impact',
            align: 'left',
            color: 'white',
            stroke: 'black',
            x: 200,
            y: 100,

        },
    ]
}

console.log('gImgs', gImgs);
console.log('gMeme', gMeme);


function addTextLine() {
    if (gMeme.selectedLineIdx === 1) return
    let newLine = {
        txt: '',
        size: 20,
        font: 'impact',
        align: 'left',
        color: 'white',
        stroke: 'black',
        x: 250,
        y: 450,
    }
    gMeme.lines.push(newLine)
    console.log('gmeme', gMeme);

}
function removeTextLine(slectedLine) {
    gMeme.lines[slectedLine].txt = ""
}

function updateFontFamily(font, slectedLine){
    gMeme.lines[slectedLine].font=font
}


function setAlignment(alignType, slectedLine) {
    if (alignType === 'left') {
        gMeme.lines[slectedLine].align = alignType
        gMeme.lines[slectedLine].x = 50
    } else if (alignType === 'center') {
        gMeme.lines[slectedLine].align = alignType
        gMeme.lines[slectedLine].x = 250
    } else if (alignType === 'right') {
        gMeme.lines[slectedLine].align = alignType
        gMeme.lines[slectedLine].x = 500
    }
}

function updateSelectedLine(num) {
    gMeme.selectedLineIdx = num
}
function getLines(){
    return gMeme.lines
}

function getSelectedLine() {
    return gMeme.selectedLineIdx
}
function changeFontSize(diff, slectedLine) {
    let fontSize = gMeme.lines[slectedLine].size
    fontSize += diff
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
function downloadCanvas(elLink) {
    // Protect the image soo attacker could not download imgs from diff domain
    const data = gElcanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'

}