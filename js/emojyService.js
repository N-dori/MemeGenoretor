'use strict'

let  gEmojyModel

function createEmojyModel(pos,emojy){
    gEmojyModel={
            emojyPos:pos,
            emojy:emojy,
            size:46,
            isDrag:false,
        }
        console.log('gEmojyModel',gEmojyModel);
        
        return gEmojyModel
    }

    function  drawEmojy(){
        const {emojyPos, size,emojy}=gEmojyModel
    
        gCtx.lineWidth = 1
       // gCtx.strokeStyle = memeLine.stroke
       // gCtx.fillStyle = memeLine.color
        gCtx.font = `${size}px impact`
       // gCtx.textAlign = memeLine.align
        gCtx.textBaseline = 'middle'
    
        gCtx.fillText(emojy, emojyPos.x, emojyPos.y) // Draws (fills) a given text at the given (x, y) position.
       // gCtx.strokeText(memeLine.txt, memeLine.x, memeLine.y) // Draws (strokes) a given text at the given (x, y) position.
    
    }

    function isEmojyClicked(clickedPos){
        const { emojyPos } = gEmojyModel
        console.log('clickedPos',clickedPos.x,clickedPos.y);
        
        // this one culc the distance between two positions
        const distance = Math.sqrt((emojyPos.x - clickedPos.x) ** 2 + (emojyPos.y - clickedPos.y) ** 2)
        // console.log('distance', distance)
    
        //If its smaller then the radius of the circle we are inside
        return distance <= gEmojyModel.size
    }
    function  moveEmojy(dx,dy){
    gEmojyModel.emojyPos.x+=dx
    gEmojyModel.emojyPos.y+=dy
    
    }
    function  setEmojyDrag(isDrag){
        //this function parameter is a boollean and update the model
        gEmojyModel.isDrag=isDrag
    }
    function getEmojyModel(){
        return gEmojyModel
    }
    function getEmojys() {
        let emojys = gEmojys
        const startIdx = gPageIdx * PAGE_SIZE
        emojys = emojys.slice(startIdx, startIdx + PAGE_SIZE)
        return emojys.join('')
    }
    