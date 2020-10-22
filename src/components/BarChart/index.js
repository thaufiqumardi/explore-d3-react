import React from 'react';
import * as d3 from 'd3';
import chroma from 'chroma-js';

const width = 650;
const height = 400;
const margin = {top: 20, right: 5, bottom:20, left:45};
const red = '#eb6a5b';
const green = '#b6e86f';
const blue = '#52b6ca';
const colors = chroma.scale([blue,green,red])

class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.xAxisRefBar = React.createRef();
      this.yAxisRefBar = React.createRef();
    }
    state = {
      bars: []
    }
    xScale = d3.scaleTime().range([margin.left, width - margin.right]);
    yScale = d3.scaleLinear().range([height - margin.bottom, margin.left]);
    colorScale = d3.scaleLinear();

    xAxis = d3.axisBottom().scale(this.xScale).tickFormat(d3.timeFormat('%d-%b-%y'));
    yAxis = d3.axisLeft().scale(this.yScale).tickFormat(d => d);
    
    componentDidMount() {
      const { data } = this.props;
      if(!data) return;

      const timeDomain = d3.extent(data, d => d.Date);
      const confirmedDomain = d3.max(data, d => d.Confirmed);

      this.xScale.domain(timeDomain);
      this.yScale.domain([0, confirmedDomain]);

      const colorDomain = d3.extent(data, d => d.avg);
      this.colorScale.domain(colorDomain);
      const newData = data.sort((a,b) => b.Active - a.Acttive)
      const bars =  newData.map(d => {
        const y1 = this.yScale(d.Confirmed);
        const y2 = this.yScale(d.Active);
        return {
          x: this.xScale(d.Date),
          y: y1,
          height: y2 - y1,
          fill: colors(this.colorScale(d.avg))
        }
      })
      this.setState({bars});
    }

    componentDidUpdate() {
      d3.select(this.xAxisRefBar).call(this.xAxis);
      d3.select(this.yAxisRefBar).call(this.yAxis);
    }

    render(){
      return (
      <svg height={height} width={width}>
        {this.state.bars &&  this.state.bars.map((d, i) => (
          <rect 
            key={i} 
            x={d.x} 
            y={d.y} 
            width='2' 
            height={d.height} 
            fill={d.fill}/>
          )
        )}
        <g>
          <g ref={element => this.xAxisRefBar = element} transform={`translate(0, ${height - margin.bottom})`}/>
          <g ref={element => this.yAxisRefBar = element} transform={`translate(${margin.left}, 0)`}/>
        </g>
      </svg>
      )
    }
}

export default BarChart;