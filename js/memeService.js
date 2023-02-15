'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = []
createImgs()
var gMeme = []
creatMemes()
let gCurrMeme
console.log('gImgs', gImgs);
console.log('gMeme', gMeme);

function  setAlignText(alignType){
   if(alignType==='l') gCurrMeme.lines[0].align='left'
   if(alignType==='c') gCurrMeme.lines[0].align='center'
   if(alignType==='r') gCurrMeme.lines[0].align='rigth'
   
}

function  changeFontSize(diff){
  let fontSize=  gCurrMeme.lines[0].size
  fontSize+=diff
  gCurrMeme.lines[0].size=fontSize
  
  return fontSize
  
}
function setNewColor(color){
    gCurrMeme.lines[0].color=color
}

function  setCurrMeme(meme){
    gCurrMeme=meme
}

function setLineTxt(txt) {
    gCurrMeme.lines[0].txt=txt
    console.log('gCurrMeme',gCurrMeme);
    
}

function getImgs() {
    return gImgs
}

function getUrl(id) {
    return gImgs[id].url
}

function getMeme(idx) {
    return gMeme[idx]
}

function creatMemes() {
    let meme
    for (let i = 0; i < gImgs.length; i++) {
        meme = createMeme(i, 0)
        gMeme.push(meme)
    }
}

function createMeme(id, idx) {
    const meme = {
        selectedImgId: id,
        selectedLineIdx: idx,
        lines: [
            {
                txt: '',
                size: 20,
                align: 'left',
                color: 'red'

            }
        ]
    }
    return meme
}
function createImgs() {
    let img
    for (let i = 1; i <= 18; i++) {
        img = createImg(i, `/img/${i}.jpg`)
        gImgs.push(img)
    }
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
    const data = gCanvas.toDataURL() // For security reason you cannot do toDataUrl on tainted canvas
    // This protects users from having private data exposed by using images
    // to pull information from remote web sites without permission.
    elLink.href = data
    elLink.download = 'my-img.jpg'
}