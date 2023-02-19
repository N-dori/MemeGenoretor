'use strict'
function getEvPos(ev) {
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
   
    
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
      //soo we will not trigger the mouse ev
      ev.preventDefault()
      //Gets the first touch point
      ev = ev.changedTouches[0]
      //Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
    }
    return pos
  }
  function onDown(ev) {
    
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
 
   //chacking if user clicked on line
     if (!isLineClicked(pos)) return
  
    setLineDrag(true)
    //Save the pos we started from
    gLineStartPos = pos
    document.body.style.cursor = 'grabbing'
  }
  
  function onMove(ev) {
    const selectedLine= getSelectedLine()
    
    if(!gMeme.lines[selectedLine])return
    //extracting the isDrag state of the emojy model
    const { isDrag } = gMeme.lines[selectedLine]
    if (!isDrag) return
  //extracting the x y constant position (on the move) of the mouse event
    const pos = getEvPos(ev)

  //  Calc the delta , the diff we moved
    const dx = pos.x - gLineStartPos.x
    const dy = pos.y - gLineStartPos.y
  
    
   moveLine(dx,dy)
  
    // Save the last pos , we remember where we`ve been and move accordingly
   gLineStartPos = pos
    // The canvas is render again on every move
    
    renderMeme()
  }
  
  function onUp() {
    // console.log('Up')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
  }

  function onAddEmojy(){
    const x=gElcanvas.width/2
    const y=gElcanvas.height/2
  
    const emojy = getEmojys()

   createEmojyModel(x,y,emojy)
     
   gMeme.selectedLineIdx+=1
   
     renderMeme()
 }
 
 function renderEmojyToCanvas(){
    if(!gEmojyModel)return
     drawEmojy(gEmojyModel)
     
 }