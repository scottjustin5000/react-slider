import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

/*
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
*/

//#1976d2
//#90caf9;

const Thumb = styled.span.attrs(props => ({
  style: {
    left: `${props.left}%`,
    boxShadow: `${props.focus}`
  }
}))`

position: absolute;
width: 12px;
height: 12px;
margin-left: -6px;
margin-top: -5px;
box-sizing: border-box;
border-radius: 50%;
outline: 0;
background-color: #90caf9;
display: flex;
align-items: center;
justify-content: center;
transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
&:hover {
  box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
  @media (hover: none): {
    box-shadow: none;
  }
}
&:active {
  box-shadow: 0px 0px 0px 14px rgba(25, 118, 210, 0.16);
}
`

// const Thumb = styled.span`
// left: ${props => props.left}%;
//   position: absolute;
//   width: 12px;
//   height: 12px;
//   margin-left: -6px;
//   margin-top: -5px;
//   box-sizing: border-box;
//   border-radius: 50%;
//   outline: 0;
//   background-color: #90caf9;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   &:hover {
//     box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
//     @media (hover: none): {
//       box-shadow: none;
//     }
//   }
//   &:active {
//     box-shadow: 0px 0px 0px 14px rgba(25, 118, 210, 0.16);
//   }
// `
//box-shadow: 0px 0px 0px 14px rgba(25, 118, 210, 0.16);
/*
  &::after {
    position: absolute;
    border-radius: 50%;
    left: -15px;
    top: -15px;
    right: -15px;
    bottom: -15px;
  },
*/
const Slider = styled.span`
  color: #90caf9;
  width: 100%;
  cursor: pointer;
  height: 2px;
  display: inline-block;
  padding: 13px 0;
  position: relative;
  box-sizing: content-box;
  touch-action: none;
  -webkit-tap-highlight-color: transparent
`
const Rail = styled.span`
width:100%;
height: 2px;
display: block;
opacity: 0.38;
position: absolute;
border-radius: 1px;
background-color: #90caf9;
`
const Track = styled.span`
width: ${props => props.width}%;
height: 2px;
display: block;
position: absolute;
border-radius: 1px;
background-color:  #90caf9;
`

const TrackMarker = styled.span`
left: ${props => props.left}%;
opacity: 0.8;
position:absolute;
height:2px;
width:2px;
border-radius:1px;
background-color: ${props=> props.color};
`
// 
// const LabelWrapper = styled.span`
//   top: -24px;
//   z-index: 1;
//   display: ${props => props.display};
//   position: absolute;
//   font-size: 0.75rem;
//   transform: scale(1) translateY(-10px);
//   transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   font-weight: 400;
//   line-height: 1;
//   letter-spacing: 0.01071em;
//   transform-origin: bottom center;
//   left: calc(-50%);
// `
// const LabelTip = styled.span`
//   width: 24px;
//   height: 24px;
//   display: flex;
//   transform: rotate(-45deg);
//   align-items: center;
//   border-radius: 50% 50% 50% 0;
//   justify-content: center;
//   background-color: #1976d2;
// `

// const TipContent = styled.span`
//   color:#fff;
//   transform: rotate(45deg);
// `
const TipWrapper = styled.div`
  display: ${props => props.display}; 
  position: absolute;
  top: -36px;
  `
  const TipContent= styled.span`
  width: 30px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color:#fff;
  color: #90caf9;
  font-size: 12px;
  display: block;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  border: 2px solid #90caf9;
  font-weight: 800;
  border-radius: 6px;
   &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid #90caf9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    margin-top: -1px;
   }
  `

const SliderComp = (props) => {
  //need to handle modes...
  //default is single horizontal
  //options vertical
  // darker blue 1976d2
  //lighter  #90caf9;
  //#424242  --disabled
  //range...  in range support quick links
  //steps...
  //display steps...


    const min = props.min || 0 //props.min
    const max = props.max || 100 //props.max
    const step = props.step 
    //percision either dictated by step or prop
    //need default value

    //const size = Math.abs(max - min) //might need to do something withsize to handle starting at non 0 values...
    const [selectionDown, setSelectionDown] = useState(false)
    const [left, setLeft] = useState(props.start || 0)
    const [value, setValue] = useState(props.start || 0)
    const [thumbFocus, setThumbFocus] = useState(false)

    const ref = useRef()

    useEffect(() => {
      // document.addEventListener('keydown', logKey);

      // const logKey = (e) => {
      //   // if (step) {
      //   //   newValue = value + step;
      //   // } else {
      //   //   newValue = value + 1
      //   // }
      //   console.log(` ${e.code}`)
      // }
      // return () => {
      //   document.removeEventListener('keydown', logKey)
      // }
    },[])

    const valueToPercent = (value, min, max) =>{
      return ((value - min) * 100) / (max - min);
    }
    
    const percentToValue = (percent, min, max) => {
      return (max - min) * percent + min;
    }
    

    const dragging = (event) => {

      if (selectionDown) {
        const clientX = event.touches && event.touches.length > 0 ? event.touches[0].clientX : event.clientX
        const percent =  (clientX - ref.current.offsetLeft) / 300
       // const grt = percentToValue(percent, -5, 88) //for display
        const val = percentToValue(percent, min, max)  //this should be 
        const step = 10
        const nearest = Math.round((val - min) / step) * step + min //to handle step
        console.log('NER',nearest)
        const per = valueToPercent(val, min, max)
        if(val >= min &&  val <= max) {

          setLeft(per)
          setValue(val)

          if(props.onChange) {
            props.onChange(val)
          }
        } 
      }
    }
    // for marks...
    /*
 [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
    */


  //if you support steps....
  //  function roundValueToStep(value, step, min) {
  //   const nearest = Math.round((value - min) / step) * step + min;
  //   return Number(nearest.toFixed(getDecimalPrecision(step)));
  // }
  

    const stopDrag = (event) => {
      if (selectionDown) {
        setSelectionDown(false)
      }
      setThumbFocus(false)
      event.stopPropagation()
    }

    const beginDrag = (event) => {
        setSelectionDown(true)
        setThumbFocus(false)
        event.stopPropagation()
    }

    const onMouseLeave = (event) => {
      stopDrag(event)
    }
  
    const onMouseUp = (event) => {
      stopDrag(event)
    }

   const onMouseDown = (event) => {
      
      event.stopPropagation()
      beginDrag(event)
    }
  
    const onTouchMove =  (event) => {
      dragging(event)
    }
  
    const onTouchEnd = (event) => {
      if(props.onUpdateComplete) {
        props.onUpdateComplete(value)
      }
    }
  
    const onTouchStart = (event) => {
      beginDrag(event)
    }
  
    const onMouseMove = (event) => {
      dragging(event)
    }

   const onKeyPress = (e) => {
    console.log(e.key)
     if(!thumbFocus) return
     //we'll need need step check
     let val = value
     if(e.key === 'ArrowRight') {
       val += 1
     
     } else if(e.key === 'ArrowLeft') {
      val -= 1
     }
    let per = valueToPercent(val, min, max)
     setLeft(per)
     setValue(val)
     
    }

    const generateMarkers = () => {
    //  if(!step) return 
      const step = 10
     return [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => {
        return (<TrackMarker key={`track_idx_${index}`} color={(min + step * index) >= left ? '#fff' : '#ff0000'} left={min + step * index} />)
      })
    }

    const onFocus = () => {
      setThumbFocus(true)
    }

    const onBlur = () => {
      setThumbFocus(false)
    }

  return(<div
    ref={ref}  
    onTouchStart={onTouchStart}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    onMouseUp={onMouseUp}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd} style={{width:'300px'}}>
    <Slider>
   
    <Rail />
    <Track width={left} />
    <Thumb 
      focus= { thumbFocus ? '0px 0px 0px 14px rgba(25, 118, 210, 0.16)' : ''}
      tabIndex = "0" 
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyPress} 
      onMouseDown={onMouseDown} left={left}>
      <TipWrapper display={(selectionDown || thumbFocus) ? 'block' : 'none'}>
        <TipContent>{Math.round(value)}</TipContent>
      </TipWrapper>
    {/* <LabelWrapper display={selectionDown ? 'none' : 'block'}>
  <LabelTip><TipContent>{Math.round(value)}</TipContent></LabelTip>
      </LabelWrapper> */}
    </Thumb>
    { generateMarkers()}
    </Slider>
    </div>)
}


export default SliderComp