import React, { useState, useRef } from 'react'
import Horizontal from './horizontal'
import Vertical from './vertical'

import { toPercent, toValue, toFormatted } from '../conversions'


const getPrecision =(a) => {
  if (!isFinite(a)) return 0
  let e = 1 
  let p = 0
  while (Math.round(a * e) / e !== a) { 
    e *= 10
     p++;
  }
  return p
}

const SliderComp = (props) => {

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
        return toPercent(m, min, max)
      })
      return v.sort((a,b) => a-b)
    }

    const getSize = (values) => {
      const sorted = values.slice().sort((a,b) => a-b)
      return sorted[1] - sorted[0]
    }

    const min = props.min || 0
    const max = props.max || 100
    const color = props.color || '#90caf9'
    const step = props.step
    const showHashes = props.showHashes
    const vertical = props.vertical
    const range = (props.range || (Array.isArray(props.start) && props.start.length > 1)) ? true : false 
    const initialValue = getInitialValue(range, props.start, min, max)
    const [selectionDown, setSelectionDown] = useState(false)
    const tv = getTrackValue(initialValue)
    const [trackValue, setTrackValue] = useState(tv)
    const [labelValue, setLabelValue] = useState(initialValue)   
    const [thumbFocus, setThumbFocus] = useState(false)
    const [activeIndex, setActiveIndex] = useState()
              
    const [size, setSize] = useState(getSize(tv.slice()))
    
    const ref = useRef()

    const precision = getPrecision(step || initialValue[0])
   
    const getClosestIndex = (values, currentValue) => {
      let delta
      let closest
      values.forEach((v, i)=> {
        const dif = Math.abs(currentValue - v)
        if(!delta || dif <= delta) {
          delta = dif
          closest = i
        }
      })
      return closest
    }

    const getCurrentValue = (event) => {
      const clientX = event.changedTouches &&  event.changedTouches.length > 0 ?  event.changedTouches[0].clientX : event.clientX 
      const clientY = event.changedTouches &&  event.changedTouches.length > 0 ?  event.changedTouches[0].clientY : event.clientY
      const percent = vertical ? ((ref.current.getBoundingClientRect().bottom - clientY) / ref.current.getBoundingClientRect().height) : (clientX - ref.current.offsetLeft) / ref.current.getBoundingClientRect().width
      const val = toValue(percent, min, max)  
      return val
    }

    const setValues = (val, min, max, dragged) => {
      let nearest
      if(step) nearest = Math.round((val - min) / step) * step + min
      const per = toPercent(val, min, max)
     
      if(val >= min && Math.floor(val) <= max) {
        let values = trackValue.slice()
        if(range)  {
          values[activeIndex] = per
          setTrackValue(values)
          setSize(getSize(values))
          let clone = labelValue.slice()
          clone[activeIndex] = dragged && nearest ? nearest : toFormatted(val,precision)
          setLabelValue(clone)
        } else {
         setTrackValue([per])
         setLabelValue([dragged && nearest ? nearest : toFormatted(val,precision)])
        }
        if(props.onChange) {
          props.onChange(nearest || toFormatted(val,precision))
        }
      }
    }

    const dragging = (event) => {
     if (selectionDown && activeIndex >=0) {
        const val = getCurrentValue(event)
        setValues(val,min,max, true)
      }
    }

    const stopDrag = () => {
      if (selectionDown) {
        setSelectionDown(false)
      }
      setActiveIndex(null)
      setThumbFocus(false)
    }

    const beginDrag = (event) => {
      if(activeIndex) return
       if(event.changedTouches && range) {
        const val = getCurrentValue(event)
        const per = toPercent(val, min, max)
        const i = getClosestIndex(trackValue, per)
        setActiveIndex(i)
       }
        else {
          setActiveIndex(parseInt(event.target.dataset.index, 10))
        }
        setSelectionDown(true)
        setThumbFocus(false)
    }

    const onMouseLeave = (event) => {
      stopDrag(event)
    }
  
    const onMouseUp = (event) => {
      stopDrag(event)
    }

   const onMouseDown = (event) => {
      beginDrag(event)
    }
  
    const onTouchMove = (event) => {
      event.preventDefault()
      dragging(event)
    }
  
    const onTouchEnd = (event) => {
      stopDrag(event)
      if(props.onUpdateComplete) {
        props.onUpdateComplete(value)
      }
    }
  
    const onTouchStart = (event) => {
      beginDrag(event)
      dragging(event)
      
    }
  
    const onMouseMove = (event) => {
      dragging(event)
    }

    const onFocus = (e) => {
      setActiveIndex(parseInt(e.target.dataset.index, 10))
      setThumbFocus(true)
    }

    const onBlur = () => {
      setActiveIndex(null)
      setThumbFocus(false)
    }


    const onKeyPress = (e) => {
      if(!thumbFocus) return
      let val = labelValue[activeIndex]
      if(!vertical && e.key === 'ArrowRight') {
        val += step ? step : 1
       } else if(!vertical && e.key === 'ArrowLeft') {
         val -= step ? step : 1
       } else if(vertical && e.key === 'ArrowUp') {
         val += step ? step : 1
       } else if(vertical && e.key === 'ArrowDown') {
         val -= step ? step : 1
       }
       setValues(val, min, max)
     }


    const divStyle = vertical ? { height: '100%', userSelect: 'none' } : { width: '100%', userSelect: 'none' }
    
    const getComponent = () => {
      const properties = {
      color,
      activeIndex,
      trackValue,
      labelValue,
      thumbFocus,
      showHashes,
      step,
      range,
      max,
      min,
      selectionDown,
      showTip: props.showTip,
      onFocus,
      onBlur,
      onMouseDown,
      onTouchStart
      }
      return vertical ? <Vertical height={size} {...properties} /> :
      <Horizontal width={size} {...properties} />
    }

    return (
      <div
      ref={ref}
      onTouchStart={onTouchStart}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onKeyDown={onKeyPress}
      onTouchEnd={onTouchEnd} style={divStyle}>
        { getComponent() }
      </div>
    )

}


export default SliderComp