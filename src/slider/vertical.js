import React from 'react'
import styled from 'styled-components'

import convertColor from '../color-adjust'
import { toPercent } from '../conversions'

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
margin-left: -5px;
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
user-select: none;
`

const VerticalRail = styled.span`
height: 100%;
width:2px;
display: block;
opacity: 0.38;
position: absolute;
border-radius: 1px;
background-color: ${props => props.color};
user-select: none;
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
  user-select: none;
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
  user-select: none;
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
    border-radius: 50%;
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
const vertical = (props) => {
const { color, 
  height, 
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
      return ( <VerticalTrackMarker 
        key={`track_idx_${index}`} 
        color={toPercent(min + step * index, min, max) >= trackValue[0] ? color : '#fff'} val={toPercent(min + step * index, min, max) } /> )
    })
  }

 return (
  <VerticalSlider color={color}>
  <VerticalRail color={color} />
{ range ? <VerticalRangeTrack color={color} height={height} val={Math.min(...trackValue)} /> : <VerticalTrack color={color} height={Math.min(...trackValue)} /> }
{trackValue.map((v,i) => { 
  return <VerticalThumb 
    key={`vthumb_${i}`}
    color={color}
    focus= { ((selectionDown || thumbFocus) && activeIndex === i)  ? `0px 0px 0px 14px ${convertColor(color, -0.5, 0.16)}` : '' }
    data-index={i}
    tabIndex={i+1}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onMouseDown={props.onMouseDown}
    height={v}>
    <TipVerticalWrapper display={(showTip && (selectionDown || thumbFocus) && activeIndex === i ) ? 'block' : 'none'}>
      <TipVerticalContent color={color}>{labelValue[i]}</TipVerticalContent>
    </TipVerticalWrapper>
  </VerticalThumb>
})}
  { generateHashMarkers()}
</VerticalSlider>
 )
}

export default vertical
