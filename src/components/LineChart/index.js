import React from 'react';
import * as d3 from 'd3';
// import chroma from 'chroma-js';

const width = 650;
const height = 400;
const margin = {top: 20, right: 5, bottom:20, left:45};
const red = '#eb6a5b';
// const green = '#b6e86f';
const blue = '#52b6ca';
// const colors = chroma.scale([blue,green,red])

class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.xAxisRef = React.createRef();
      this.yAxisRef = React.createRef();
    }
    state = {
      confirmed: null,
      active: null,
    }
    xScale = d3.scaleTime().range([margin.left, width - margin.right]);
    yScale = d3.scaleLinear().range([height- margin.bottom, margin.top]);

    xAxis = d3.axisBottom().scale(this.xScale).tickFormat(d3.timeFormat('%d-%b-%y'));
    yAxis = d3.axisLeft().scale(this.yScale).tickFormat(d => d);
    lineGenerator = d3.line();

    componentDidMount() {
      const { data } = this.props;
      if(!data) return;

      const timeDomain = d3.extent(data, d => d.Date);
      const confirmedDomain = d3.max(data, d => d.Confirmed);

      this.xScale.domain(timeDomain);
      this.yScale.domain([0, confirmedDomain]);

      this.lineGenerator.x(d => this.xScale(new Date(d.Date)));
      
      this.lineGenerator.y(d => this.yScale(d.Confirmed));
      const cases = this.lineGenerator(data);

      this.lineGenerator.y(d => this.yScale(d.Active));
      const active = this.lineGenerator(data);
   
      this.setState({confirmed: cases, active: active, });
    }

    componentDidUpdate() {
      d3.select(this.xAxisRef).call(this.xAxis);
      d3.select(this.yAxisRef).call(this.yAxis);
    }

    render(){
      return (
      <svg height={height} width={width} >
        <path d={this.state.active} fill="none" stroke={blue} strokeWidth={1.4}/>
        <path d={this.state.confirmed} fill="none" stroke={red} strokeWidth={1.4}/>
        <g>
          <g ref={element => this.xAxisRef = element} transform={`translate(0, ${height - margin.bottom})`}/>
          <g ref={element => this.yAxisRef = element} transform={`translate(${margin.left}, 0)`}/>
        </g>
      </svg>
      )
    }
}

export default LineChart;