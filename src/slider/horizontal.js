import React from 'react'
import styled from 'styled-components'

import convertColor from '../color-adjust'

import { toPercent } from '../conversions'

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
  box-shadow: 0px 0px 0px 8px ${props => convertColor(props.color, -0.5, 0.16)};
  @media (hover: none): {
    box-shadow: none;
  }
}
&:active {
  box-shadow: 0px 0px 0px 14px ${props => convertColor(props.color, -0.5, 0.16)};
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
  -webkit-tap-highlight-color: transparent;
  user-select: none;
`

const Rail = styled.span`
width:100%;
height: 2px;
display: block;
opacity: 0.38;
position: absolute;
border-radius: 1px;
user-select: none;
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
user-select: none;
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
user-select: none;
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
  border-radius: 50%;
  user-select: none;
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
const horizontal = (props) => {
const { color, 
  width, 
  trackValue, 
  labelValue,
  activeIndex, 
  thumbFocus, 
  showHashes,
  step,
  range,
  max,
  min,
  selectionDown,
  showTip } = props

const generateHashMarkers = () => {

  if(!showHashes || !step || range) return 
   return [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => {
      return (<TrackMarker 
        key={`track_idx_${index}`} 
        color={toPercent(min + step * index, min, max) > trackValue[0] ? color : '#fff'} 
        left={toPercent(min + step * index, min, max)} />)
    })
  }

 return (
  <Slider color={color}>
  <Rail color={color} />
  { range ? <RangeTrack color={color} width={width} left={ Math.min(...trackValue)} /> : <Track color={color} width={trackValue[0]} />  }
  {trackValue.map((v,i) => {
    return <Thumb 
     key={`thumb_${i}`}
     color={color}
     focus= { (thumbFocus && activeIndex === i) ? `0px 0px 0px 14px ${convertColor(color, -0.5, 0.16)}` : '' }
     data-index={i}
     tabIndex={i+1}
     onFocus={props.onFocus}
     onBlur={props.onBlur}
     onMouseDown={props.onMouseDown} 
     left={v}>
     <TipWrapper display={(showTip && (selectionDown || thumbFocus) && activeIndex === i) ? 'block' : 'none'}>
       <TipContent color={color}>{labelValue[i]}</TipContent>
     </TipWrapper>
   </Thumb>
  })}
  { generateHashMarkers()}
  </Slider>
 )
}

export default horizontal
