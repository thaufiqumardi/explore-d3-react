import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import chroma from 'chroma-js';

const height = 650;
const dayWidth = 55;
const dayHeight = 75;
const topPadding = 150;
const margin = {left: 40, top:20, right: 40, bottom: 20};

const xScale = d3.scaleLinear().domain([0,6]);
const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
const amountScale = d3.scaleLog();
const colorScale = chroma.scale(['#53c3ac', '#f7e883', '#e85178']);

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.refDayContainer = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    xScale.range([margin.left, this.props.width - margin.right]);

    this.container = d3.select(this.refDayContainer.current);
    this.calculateData();
    this.renderDays();
    // this.renderBacks();
  }

  componentDidUpdate() {
    this.calculateData();
    this.renderDays();
  }

  calculateData() {
    const {expenses} = this.props
    const weeksExtent = d3.extent(expenses, d => d3.timeWeek.floor(d.date));
    yScale.domain(weeksExtent);

    this.totalsByDay = _.chain(expenses)
      .groupBy(d => d3.timeDay.floor(d.date))
      .reduce((obj, expenses, date) => {
        obj[date] = _.sumBy(expenses, 'amount');
        return obj;
      }, {}).value();

      const totalsExtent = d3.extent(_.values(this.totalsByDay));
      amountScale.domain(totalsExtent);

      this.days = _.map(this.totalsByDay, (total, date) => {
        date = new Date(date);
        const { x, y } = this.calculateDayPosition(date, true);
        return {
          date,
          fill: colorScale(amountScale(total)),
          x,y
        }
      })
      // get min+max dates
      const [minDate, maxDate] = d3.extent(this.props.expenses,
        d => d3.timeDay.floor(d.date));
      // backs should be all dates in range as well as an extra for selectedWeek
      const selectedWeek = d3.timeDay.range(this.props.selectedWeek,
        d3.timeWeek.offset(this.props.selectedWeek, 1));
      this.backs = _.chain(selectedWeek)
        .map(date => this.calculateDayPosition(date, true))
        .union(_.map(d3.timeDay.range(minDate, maxDate),
          (date) => this.calculateDayPosition(date)))
        .value();
  }

  calculateDayPosition(date, shouldSelectedWeekCurve) {
    var dayOfWeek = date.getDay();
    var week = d3.timeWeek.floor(date);
    var x = xScale(dayOfWeek);
    var y = yScale(week) + height + 2 * dayHeight;

    if (shouldSelectedWeekCurve &&
      new Date(week).getTime() === new Date(this.props.selectedWeek).getTime()) {
      var offset = Math.abs(3 - dayOfWeek);
      y = height - 2 * dayHeight - 0.5 * offset * dayHeight;
    }
    y += topPadding;

    return {x, y};
  }

  renderBacks() {
    this.container.selectAll('.back')
      .data(this.backs, d => d.date)
      .enter().insert('rect', '.day')
      .classed('back', true)
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
      .attr('width', 2 * dayWidth)
      .attr('height', 2 * dayHeight)
      .attr('x', -dayWidth)
      .attr('y', -dayHeight)
      .attr('fill', this.props.colors.gray);
  }

  renderDays() {
    var t = d3.transition().duration(500);
    var fontSize = 20;

    var days = this.container.selectAll('.day')
      .data(this.days, d => d.date);

    // exit
    days.exit().remove();

    // enter
    var enter = days.enter().append('g')
      .classed('day', true)
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')');
    enter.append('rect')
      .attr('fill', d => d.fill);
    enter.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', this.props.colors.white)
      .style('font-family', 'CatMule Caps')
      .style('font-size', fontSize);

    days = enter.merge(days);
    days.transition(t)
      .delay((d, i) => d.date.getDay() * 50)
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')');

    days.select('rect')
      .attr('width', 2 * dayWidth)
      .attr('height', 2 * dayHeight)
      .attr('x', -dayWidth)
      .attr('y', -dayHeight)
      .transition(t)
      .attr('fill', d => d.fill);

    var timeFormat = d3.timeFormat('%m/%d');
    days.select('text')
      .attr('y', d => dayHeight - 0.75 * fontSize)
      .text(d => timeFormat(d.date));
  }

  render() {
    return (
      <g ref={this.refDayContainer}/>
    )
  }
}

export default Day;