'use strict'
function getEvPos(ev) {
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
    console.log('ev',ev);
    
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
    // console.log('Down')
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log('ev',ev);
   //chacking if user clicked on  emojy
     if (!isEmojyClicked(pos)) return
  
    setEmojyDrag(true)
    //Save the pos we started from
    gEmojyStartPos = pos
    document.body.style.cursor = 'grabbing'
  }
  
  function onMove(ev) {
    let emojy=getEmojyModel()
    if(!emojy)return
    //extracting the isDrag state of the emojy model
    const { isDrag } = emojy
    if (!isDrag) return
  //extracting the x y constant position (on the move) of the mouse event
    const pos = getEvPos(ev)

  //  Calc the delta , the diff we moved
    const dx = pos.x - gEmojyStartPos.x
    const dy = pos.y - gEmojyStartPos.y
   console.log('x,y',dx,dy);
    
   moveEmojy(dx,dy)
  
    // Save the last pos , we remember where we`ve been and move accordingly
   gEmojyStartPos = pos
    // The canvas is render again on every move
    
    renderMeme()
  }
  
  function onUp() {
    // console.log('Up')
    setEmojyDrag(false)
    document.body.style.cursor = 'grab'
  }

  function onAddEmojy(){
    const centerPos= {
         x:gElcanvas.width/2,
         y:gElcanvas.height/2,
     } 
     const emojy = getEmojys()
    createEmojyModel(centerPos,emojy)
    renderEmojyToCanvas()
 }
 
 function renderEmojyToCanvas(){
    if(!gEmojyModel)return
     drawEmojy(gEmojyModel)
     
 }