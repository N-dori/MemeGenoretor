'use strict'

function createEmojyModel(x,y,emojy){
    const gEmojyObj={
            x,
            y,
            txt:emojy,
            size:46,
            isDrag:false,
            align: 'center',
            rectColor: 'orange',
            font: 'impact',
            stroke: 'black',
            color: 'white',
        }
        gMeme.lines.push(gEmojyObj)
    }

    function isLineClicked(clickedPos){
        for (let i = 0; i < gMeme.lines.length; i++) {
           let line =  gMeme.lines[i];
            
        // this one culc the distance between two positions
        const distance = Math.sqrt((line.x - clickedPos.x) ** 2 + (line.y - clickedPos.y) ** 2)
 //If its smaller then the radius of the circle we are inside
        if(distance <= line.size){
            clearRects()
            gMeme.selectedLineIdx=i
           
            gMeme.lines[i].rectColor = 'orange'
            return true
        }  
    }
    return false
    }

    function  moveLine(dx,dy){
        const selectedLine=getSelectedLine()
        gMeme.lines[selectedLine].x+=dx
        gMeme.lines[selectedLine].y+=dy        
    }

    function  setLineDrag(isDrag){
        //this function parameter is a boollean and update the model
        const selectedLine=getSelectedLine()
      gMeme.lines[selectedLine].isDrag=isDrag
    }
 