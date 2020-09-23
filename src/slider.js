import React, { useState, useRef } from 'react'
import styled from 'styled-components'

//#1976d2
//#90caf9;
/*

    MuiSlider-thumb {
    bottom: 
    width: 12px;
    height: 12px;
    display: flex;
    outline: 0;
    position: absolute;
    box-sizing: border-box;
    margin-top: -5px;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    align-items: center;
    margin-left: -6px;
    border-radius: 50%;
    justify-content: center;
    background-color: currentColor;
}
*/
const Thumb = styled.span.attrs(props => ({
  style: {
    left: `${props.left}%`,
    boxShadow: `${props.focus}`
  }
}))`
position: absolute;
z-index:101;
width: 12px;
height: 12px;
margin-left: -6px;
margin-top: -5px;
box-sizing: border-box;
border-radius: 50%;
outline: 0;
background-color: ${props => props.color};
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

const VerticalThumb = styled.span.attrs(props => ({
  style: {
    bottom: `${props.height}%`,
    boxShadow: `${props.focus}`
  }
}))`
position: absolute;
z-index:101;
width: 12px;
height: 12px;
margin-left: -6px;
margin-top: -5px;
box-sizing: border-box;
border-radius: 50%;
outline: 0;
background-color: ${props => props.color};
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

const Slider = styled.span`
  color: ${props => props.color};
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

const VerticalSlider = styled.span`
color: ${props => props.color};
width: 2px;
height: 100%;
cursor: pointer;
display: inline-block;
padding: 0 13px;
position: relative;
box-sizing: content-box;
touch-action: none;
-webkit-tap-highlight-color: transparent;
`


const Rail = styled.span`
width:100%;
height: 2px;
display: block;
opacity: 0.38;
position: absolute;
border-radius: 1px;
background-color: ${props => props.color};
`

const VerticalRail = styled.span`
height: 100%;
width:2px;
display: block;
opacity: 0.38;
position: absolute;
border-radius: 1px;
background-color: ${props => props.color};
` 

const Track = styled.span.attrs(props => ({
  style: {
    width: `${props.width}%`,
  }
}))`
height: 2px;
display: block;
position: absolute;
border-radius: 1px;
background-color: ${props => props.color};
`

const RangeTrack = styled.span.attrs(props => ({
  style: {
    width: `${props.width}%`,
    left: `${props.left}%`
  }
}))`
height: 2px;
display: block;
position: absolute;
border-radius: 1px;
background-color: ${props => props.color};
`

const VerticalTrack = styled.span.attrs(props => ({
  style: {
    height: `${props.height}%`
  }
}))`
  bottom: 0%;
  width: 2px;
  display: block;
  position: absolute;
  border-radius: 1px;
  background-color: ${props => props.color};
`

const VerticalRangeTrack = styled.span.attrs(props => ({
  style: {
    height: `${props.height}%`,
    bottom: `${props.val}%`
  }
}))`
  width: 2px;
  display: block;
  position: absolute;
  border-radius: 1px;
  background-color: ${props => props.color};
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

const VerticalTrackMarker = styled.span`
bottom: ${props => props.val}%;
opacity: 0.8;
position:absolute;
height:2px;
width:2px;
border-radius:1px;
background-color: ${props=> props.color};
`

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
  color: ${props => props.color};
  font-size: 12px;
  display: block;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  border: 2px solid ${props => props.color};
  font-weight: 800;
  border-radius: 6px;
   &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid ${props => props.color};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    margin-top: 1px;
   }
  `
  const TipVerticalWrapper = styled.div`
    display: ${props => props.display}; 
    position: absolute;
    top: -10px;
    right: -30px;
  `
  const TipVerticalContent= styled.span`
    width: 30px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color:#fff;
    color: ${props => props.color};
    font-size: 12px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    border: 2px solid ${props => props.color};
    font-weight: 800;
    border-radius: 6px;
    &:before {
      content: "";
      width: 0px;
      height: 0px;
      position: absolute;
      border-left: 5px solid transparent;
      border-right: 10px solid  ${props => props.color};
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      left: -16px;
      top: 6px;
    }
  `
    //   content: "";
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   border-top: 10px solid ${props => props.color};
  //   border-left: 5px solid transparent;
  //   border-right: 5px solid transparent;
  //   top: 100%;
  //   left: 50%;
  //   margin-left: -5px;
  //   margin-top: 1px;


const SliderComp = (props) => {
    const valueToPercent = (value, min, max) =>{
      return ((value - min) * 100) / (max - min);
    }

    const percentToValue = (percent, min, max) => {
      return (max - min) * percent + min;
    }

    const getInitialValue = (range, start, min, max)=> {
      if(range) {
        if(start && Array.isArray(start) && start.length > 1) {
          return [start[0], start[1]].sort((a,b) => a-b)
        } else if(start && Array.isArray(start) && start.length === 1) {
          return [start[0], start[0]]
        } else {
          return [min || 0, max || 100]
        }
      } else {
         return [start || 0]
      }
    }

    const getTrackValue = (vals) => {
      const v = vals.map((m) => {
        return valueToPercent(m, min, max)
      })
      return v.sort((a,b) => a-b)
    }


    const min = props.min || 0
    const max = props.max || 100
    const color = props.color || '#90caf9'
    const step = props.step
    const showHashes = props.showHashes
    const vertical = props.vertical
    //need to update to remove hard coded true
    const range = (props.range || (Array.isArray(props.start) && props.start.length > 1)) ? true : false 
    const initialValue = getInitialValue(range, props.start, min, max)


    const [selectionDown, setSelectionDown] = useState(false)

   

   // const initValue = props.start ? valueToPercent(props.start, min, max) : 0
    const tv = getTrackValue(initialValue)
    const [trackValue, setTrackValue] = useState(tv)

    //need to update label
    const [labelValue, setLabelValue] = useState(initialValue) 
    //const [value, setValue] = useState(initialValue)
  
    const [thumbFocus, setThumbFocus] = useState(false)
    const [activeIndex, setActiveIndex] = useState()
    const [width, setWidth] = useState(100)
    
    const ref = useRef()


    const dragging = (event) => {
      if (selectionDown && activeIndex >=0) {
        const clientX = event.touches && event.touches.length > 0 ? event.touches[0].clientX : event.clientX
        const clientY = event.touches && event.touches.length > 0 ? event.touches[0].clientY : event.clientY
        const percent = vertical ? ((ref.current.getBoundingClientRect().bottom - clientY) / ref.current.getBoundingClientRect().height) : (clientX - ref.current.offsetLeft) / ref.current.getBoundingClientRect().width
        const val = percentToValue(percent, min, max)  
       setIt(val,min,max, true)
        // let nearest
        // if(step) nearest = Math.round((val - min) / step) * step + min
        // const per = valueToPercent(val, min, max)
        // if(val >= min &&  val <= max) {
        //  let values = trackValue.map(m=>m)

        //  if(range)  {
        //    values[activeIndex] = per
        //    let vals = labelValue.slice()
        //    vals[activeIndex] = nearest || Math.round(val)
        //    setTrackValue(values)
        //    const test = values.slice().sort((a,b) => a-b)
        //    const tt = test[1] - test[0]
        //    setWidth(valueToPercent(tt, min, max))
        //    setLabelValue(vals)
        //  } else {
        //   setTrackValue([per])
        //   setLabelValue([nearest || Math.round(val)])
        //  }
          
        //  // setValue(nearest || Math.round(val))

        //   if(props.onChange) {
        //     props.onChange(nearest || Math.round(val))
        //   }
        // } 
      }
    }

    const setIt = (val, min, max, dragged) => {
      let nearest
      if(step) nearest = Math.round((val - min) / step) * step + min
      const per = valueToPercent(val, min, max)
      if(val >= min &&  val <= max) {
        let values = trackValue.slice()
        if(range)  {
          values[activeIndex] = per

          setTrackValue(values)
          const test = values.slice().sort((a,b) => a-b)
          const tt = test[1] - test[0]
          setWidth(valueToPercent(tt, min, max))
          let confused = labelValue.slice()
          confused[activeIndex] = dragged && nearest ? nearest : Math.round(val)
          setLabelValue(confused)
        } else {
         setTrackValue([per])
         console.log('activeIndex',activeIndex, thumbFocus)
         setLabelValue([dragged && nearest ? nearest : Math.round(val)])
        }
        console.log('JUST', selectionDown, thumbFocus, activeIndex, activeIndex == 0)
      }
    }

    // const setValues = () => {
    //   //key press
    //    //need to handle for range slider...
    //    const per = valueToPercent(val, min, max)
    //    if(val >= min &&  val <= max) {
    //      let values = trackValue.map(m=>m)
 
    //      if(range)  {
    //        values[activeIndex] = per
    //        setTrackValue(values)
    //        const test = values.slice().sort((a,b) => a-b)
    //        const tt = test[1] - test[0]
    //        setWidth(valueToPercent(tt, min, max))
    //        let confused = labelValue.slice()
    //        confused[activeIndex] = Math.round(val)
    //        setLabelValue(confused)
 
    //      } else {
    //       setTrackValue([per])
    //       setLabelValue([val])
    //      }

    //      ///end 

    //      let nearest
    //      if(step) nearest = Math.round((val - min) / step) * step + min
    //      const per = valueToPercent(val, min, max)
    //      if(val >= min &&  val <= max) {
    //       let values = trackValue.map(m=>m)
 
    //       if(range)  {
    //         values[activeIndex] = per
 
    //         let confused = labelValue.slice()
    //         confused[activeIndex] = nearest || Math.round(val)
    //         setTrackValue(values)
    //         const test = values.slice().sort((a,b) => a-b)
    //         const tt = test[1] - test[0]
    //         setWidth(valueToPercent(tt, min, max))
    //         setLabelValue(confused)
    //       } else {
    //        setTrackValue([per])
    //        setLabelValue([nearest || Math.round(val)])
    //       }
    // }

    const stopDrag = (event) => {
      if (selectionDown) {
        setSelectionDown(false)
      }
      setActiveIndex(null)
      setThumbFocus(false)
      event.stopPropagation()
    }

    const beginDrag = (event) => {
      if(activeIndex) return
       setActiveIndex(parseInt(event.target.dataset.index, 10))
        setSelectionDown(true)
       // setThumbFocus(true)
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
  
    const onTouchMove = (event) => {
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
     if(!thumbFocus) return
     let val = trackValue[activeIndex]
     //value[activeIndex]
     if(!vertical && e.key === 'ArrowRight') {
       val += step ? step : 1
      } else if(!vertical && e.key === 'ArrowLeft') {
        val -= step ? step : 1
      } else if(vertical && e.key === 'ArrowUp') {
        val += step ? step : 1
      } else if(vertical && e.key === 'ArrowDown') {
        val -= step ? step : 1
      }

      setIt(val, min, max)
      //need to handle for range slider...
    /*  const per = valueToPercent(val, min, max)
      if(val >= min &&  val <= max) {
        let values = trackValue.map(m=>m)

        if(range)  {
          values[activeIndex] = per
          setTrackValue(values)
          const test = values.slice().sort((a,b) => a-b)
          const tt = test[1] - test[0]
          setWidth(valueToPercent(tt, min, max))
          let confused = labelValue.slice()
          confused[activeIndex] = Math.round(val)
          setLabelValue(confused)
        } else {
         setTrackValue([per])
         setLabelValue([val])
        }     
      }*/
    }

    const generateHashMarkers = () => {

    if(!showHashes || !step) return 
    // need to figureout for range...or just not handle....
     return [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => {
        return (vertical ? <VerticalTrackMarker key={`track_idx_${index}`} color={(min + step * index) >= trackValue[0] ? '#90caf9' : '#fff'} val={min + step * index} /> :
         <TrackMarker key={`track_idx_${index}`} color={(min + step * index) >= left ? '#90caf9' : '#fff'} left={min + step * index} />)
      })
    }

    const onFocus = (e) => {
      setActiveIndex(parseInt(e.target.dataset.index, 10))
      setThumbFocus(true)
    }

    const onBlur = () => {
      setActiveIndex(null)
      setThumbFocus(false)
    }

    //can probably simplify all this....

    // const createVertical = () => {
    //   return(<div
    //     ref={ref}  
    //     onTouchStart={onTouchStart}
    //     onMouseMove={onMouseMove}
    //     onMouseLeave={onMouseLeave}
    //     onMouseUp={onMouseUp}
    //     onTouchMove={onTouchMove}
    //     onTouchEnd={onTouchEnd} style={{height:'100%'}}>
    //     <VerticalSlider color={color}>
       
    //     <VerticalRail color={color} />
    //     <VerticalTrack color={color} height={left} />
    //     <VerticalThumb 
    //       color={color}
    //       focus= { thumbFocus ? '0px 0px 0px 14px rgba(25, 118, 210, 0.16)' : ''}
    //       tabIndex = "0" 
    //       onFocus={onFocus}
    //       onBlur={onBlur}
    //       onKeyDown={onKeyPress} 
    //       onMouseDown={onMouseDown} 
    //       height={left}>
    //       <TipWrapper display={(selectionDown || thumbFocus) ? 'block' : 'none'}>
    //         <TipContent color={color}>{value}</TipContent>
    //       </TipWrapper>
    //     </VerticalThumb>
    //     { generateHashMarkers()}
    //     </VerticalSlider>
    //     </div>)
    // }

    // const createHorizontal = () => {
    //   return(<div
    //     ref={ref}  
    //     onTouchStart={onTouchStart}
    //     onMouseMove={onMouseMove}
    //     onMouseLeave={onMouseLeave}
    //     onMouseUp={onMouseUp}
    //     onTouchMove={onTouchMove}
    //     onTouchEnd={onTouchEnd} style={{width:'100%'}}>
    //     <Slider color={color}>
       
    //     <Rail color={color} />
    //     <Track color={color} width={left} />
    //     <Thumb 
    //       color={color}
    //       focus= { thumbFocus ? '0px 0px 0px 14px rgba(25, 118, 210, 0.16)' : ''}
    //       tabIndex = "0" 
    //       onFocus={onFocus}
    //       onBlur={onBlur}
    //       onKeyDown={onKeyPress} 
    //       onMouseDown={onMouseDown} 
    //       left={left}>
    //       <TipWrapper display={(selectionDown || thumbFocus) ? 'block' : 'none'}>
    //         <TipContent color={color}>{value}</TipContent>
    //       </TipWrapper>
    //     </Thumb>
    //     { generateHashMarkers()}
    //     </Slider>
    //     </div>)
    // }
   if(vertical) {
    return(<div
      ref={ref}  
      onTouchStart={onTouchStart}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd} style={{height:'100%'}}>
      <VerticalSlider color={color}>
        <VerticalRail color={color} />
    { range ? <VerticalRangeTrack color={color} height={width} val={Math.min(...trackValue)} /> : <VerticalTrack color={color} height={Math.min(...trackValue)} /> }
    {trackValue.map((v,i) => { 
        return <VerticalThumb 
          key={`vthumb_${i}`}
          color={color}
          focus= { (thumbFocus && activeIndex === i)  ? '0px 0px 0px 14px rgba(25, 118, 210, 0.16)' : ''}
          data-index={i}
          tabIndex={i+1}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyPress} 
          onMouseDown={onMouseDown} 
          height={v}>
          <TipVerticalWrapper display={(selectionDown || thumbFocus && activeIndex === i ) ? 'block' : 'none'}>
            <TipVerticalContent color={color}>{labelValue[i]}</TipVerticalContent>
          </TipVerticalWrapper>
        </VerticalThumb>
    })}
        { generateHashMarkers()}
      </VerticalSlider>
      </div>)
   } else {
    return(<div
      ref={ref}  
      onTouchStart={onTouchStart}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd} style={{width:'100%'}}>
      <Slider color={color}>
      <Rail color={color} />
      { range ? <RangeTrack color={color} width={width} left={Math.min(...trackValue)} /> : <Track color={color} width={trackValue[0]} />  }
      {trackValue.map((v,i) => {
        return <Thumb 
         key={`thumb_${i}`}
         color={color}
         focus= { (thumbFocus && activeIndex === i) ? '0px 0px 0px 14px rgba(25, 118, 210, 0.16)' : ''}
         data-index={i}
         tabIndex={i+1}
         onFocus={onFocus}
         onBlur={onBlur}
         onKeyDown={onKeyPress} 
         onMouseDown={onMouseDown} 
         left={v}>
         <TipWrapper display={((selectionDown || thumbFocus) && activeIndex === i ) ? 'block' : 'none'}>
           <TipContent color={color}>{labelValue[i]}</TipContent>
         </TipWrapper>
       </Thumb>
      })}
     
      { generateHashMarkers()}
      </Slider>
      </div>)
   }
   

}


export default SliderComp