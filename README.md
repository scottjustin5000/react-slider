# react-slider

> react slider component

[![NPM](https://img.shields.io/npm/v/react-slider.svg)](https://www.npmjs.com/package/react-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Usage

```jsx
import Slider from 'react-slider'
<div style={{width: '200px'}}>
 <Slider 
  onChange={onChange}
   />
</div>
```

```jsx
import Slider from 'react-slider'
<div style={{width: '200px'}}>
  <Slider 
  onChange={onChange}
  showTip
  showHashes 
  start={30} 
  step={10} 
  min={0} 
  max={230} />

</div>
```

```jsx
import Slider from 'react-slider'

<div style={{width: '200px'}}>
 <Slider 
  onChange={onChange}
  start={[0,200]} 
  min={0} 
  max={200}  />
</div>
```

```jsx

<div style={{height: '300px'}}>
 <Slider 
  vertical
  showTip
  onChange={onChange}
  min={0} 
  max={200}  />
</div>
```


```jsx
import Slider from 'react-slider'

<div style={{height: '300px'}}>
 <Slider 
  vertical
  color='#39FF14'
  onChange={onChange}
  start={[10,150]} 
  min={0} 
  max={200}  />
</div>
```

See Examples [Here](http://sj5000-react-slider.s3-website-us-east-1.amazonaws.com)


## Options
  min            default 0
  max            default 100
  color          default #90caf9
  step           default null
  showHashes     default false
  vertical       default false 
  range          default false 
  start          default 0, [0,100] for range

## License

MIT © [scottjustin5000](https://github.com/scottjustin5000)
