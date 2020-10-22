import React, { useEffect } from 'react';
import * as d3 from 'd3';

const CustomSvg = () => {
  const circleRef = React.createRef();

  useEffect(() => {
    const svgElement = d3.select(circleRef.current);
    svgElement.append('circle')
      .style('fill', 'orange')
      .attr('r', () => 10 + Math.random() *10);
    
  },[])
  return (
    <svg height={300} width={300} ref={circleRef}/>
  )
}

export default CustomSvg;