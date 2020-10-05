import React from 'react'

import { Slider } from 'react-slider'
import 'react-slider/dist/index.css'

const App = () => {

 const onChange = (e) => {
   console.log(e)
 }

  return(
    <div style={{ 
      width:'100%',
      margin:'24px', 
      display:'flex', 
      flexDirection:'column',
      alignItems: 'center'
        }}>
        <div style={{
          display: 'flex', 
          flexDirection: 'column',
          width: '320px', 
          margin: '24px', 
          justifyContent: 'center', 
          alignItems: 'center'}}>
  
          <div style={{
            flexDirection: 'column', 
            display:'flex', 
            justifyContent:'center'
            }}>
    
     <div style={{
       marginBottom: '8px',
       boxSizing: 'border-box',
       width: '300px', 
       height: '100px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       padding:'10px', 
       border:'1px solid #efefef', 
       boxShadow:'0 2px 3px #ccc' }}>
 <h5>Standard</h5>
     <Slider start={4} onChange={onChange} />
      </div>
      <div style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        <pre style={{color: '#fff'}}>
{`
 <Slider 
  onChange={onChange}
   />
`}
        </pre>
      </div>
    </div> 

    <div style={{
    margin: '16px',
    flexDirection: 'column', 
    display:'flex', 
    justifyContent:'center'
    }}>
    
     <div style={{
       marginBottom: '8px',
       boxSizing: 'border-box',
       width: '300px', 
       height: '100px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       padding:'10px', 
       border:'1px solid #efefef', 
       boxShadow:'0 2px 3px #ccc' }}>
 <h5>Hash Marks and Step</h5>
     <Slider 
       onChange={onChange}
       showHashes 
       showTip
       start={30} 
       step={10} 
       min={0} 
       max={230} />
      </div>
      <div style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        <pre style={{color: '#fff'}}>
{`
 <Slider 
  onChange={onChange}
  showTip
  showHashes 
  start={30} 
  step={10} 
  min={0} 
  max={230} />
`}
        </pre>
      </div>
    </div> 

    <div style={{
    margin: '16px',
    flexDirection: 'column', 
    display:'flex', justifyContent:'center'
    }}>
    
     <div style={{
       marginBottom: '8px',
       boxSizing: 'border-box',
       width: '300px', 
       height: '100px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       padding:'10px', 
       border:'1px solid #efefef', 
       boxShadow:'0 2px 3px #ccc' }}>
 <h5>Range</h5>
     <Slider 
       onChange={onChange}
       start={[0,200]} 
        min={0} 
        max={200}  />
      </div>
      <div style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        <pre style={{color: '#fff'}}>
{`
 <Slider 
  onChange={onChange}
  start={[0,200]} 
  min={0} 
  max={200}  />
`}
        </pre>
      </div>
    </div> 

    <div style={{
    margin: '16px',
    flexDirection: 'column', 
    display:'flex', 
    justifyContent:'center'
    }}>
    
     <div style={{
       marginBottom: '16px',
       boxSizing: 'border-box',
       width: '300px', 
       height: '330px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       padding:'10px', 
       border:'1px solid #efefef', 
       boxShadow:'0 2px 3px #ccc' }}>
 <h5>Vertical</h5>
 <div style={{height: '250px'}}>
     <Slider 
       vertical
       showTip
       onChange={onChange}
       start={0} 
        min={0} 
        max={200}  />
  </div>
      </div>
      <div style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        <pre style={{color: '#fff'}}>
{`
 <Slider 
  vertical
  showTip
  onChange={onChange}
  min={0} 
  max={200}  />
`}
        </pre>
      </div>
    </div> 


    <div style={{
    margin: '16px',
    flexDirection: 'column', 
    display:'flex', 
    justifyContent:'center'
    }}>
     <div style={{
       marginBottom: '8px',
       boxSizing: 'border-box',
       width: '300px', 
       height: '330px',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       padding:'10px', 
       border:'1px solid #efefef', 
       boxShadow:'0 2px 3px #ccc' }}>
         <h5>Vertical Range</h5>
 <div style={{height: '250px'}}>
     <Slider 
       vertical
       color='#39FF14'
       onChange={onChange}
       start={[10,150]}  
        min={0} 
        max={200}  />
      </div>
      </div>
      <div style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
        <pre style={{color: '#fff'}}>
{`
 <Slider 
  vertical
  color='#39FF14'
  onChange={onChange}
  start={[10,150]} 
  min={0} 
  max={200}  />
`}
        </pre>
      </div>
    </div> 
    </div>
    </div>
  
  )
}

export default App
