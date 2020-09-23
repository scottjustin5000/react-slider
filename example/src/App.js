import React from 'react'

import { Slider } from 'react-slider'
import 'react-slider/dist/index.css'

const App = () => {
  return(
    <div style={{height:'500px', width: '800px', margin: '50px', display:'flex', justifyContent: 'center'}}>
       <Slider start={33} min={0} max={107} />
  </div>
  
  )
}

export default App
