import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import appsUsedData from '../../assets/dummies/apps.json';
import Day from '../../components/DigitalTrackerVisualization/Day';
import Expenses from '../../components/DigitalTrackerVisualization/Expenses';
import Categories from '../../components/DigitalTrackerVisualization/Categories';
import styles from './style.module.css'
const width = 750;
const height = 'auto';
const colors = {
  white: '#fff8fa',
  gray: '#e1ecea',
  black: '#516561'
}
class DigitalTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      categories: [
        { name: 'Social Media', expenses: [], total: 0 },
        { name: 'Communication', expenses: [], total: 0 },
        { name: 'Game', expenses: [], total:0 },
        { name: 'Commerce', expenses: [], total: 0 }
      ],
      categoryBeingAdded: null,
      selectedWeek: null,
    }
    this.linkToCategory = this.linkToCategory.bind(this);
    this.editDate = this.editDate.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.startCategory = this.startCategory.bind(this);
    this.clearCategory = this.clearCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }
  
  componentDidMount() {
    const expenses = appsUsedData.map(d => ({...d, date: new Date(d.date)}))
    const selectedWeek = d3.max(expenses, exp => d3.timeWeek.floor(exp.date));
    this.setState({expenses, selectedWeek})
  }

  linkToCategory(expense, category) {
    if(_.includes(category.expenses, expense)) {
      category.expenses = _.without(category.expenses, expense);
      expense.categories -= 1;
    } else {
      console.log(category)
      category.expenses.push(expense);
      expense.categories +=1;
    }
    this.forceUpdate();
  }

  editDate(expense, day) {
    expense.date = day.date;
    this.forceUpdate();
  }

  startCategory(event) {
    const category = {
      name: event.target.value,
      expenses: [],
      total: 0
    }
    this.setState({categoryBeingAdded: category})
  }

  clearCategory(event) {
    event.target.value="";
    event.target.blur();
    this.setState({categoryBeingAdded: null});
  }

  addCategory(event) {
    const ENTER_CODE = 13;
    const ESC_CODE = 27;
    if(event.keyCode === ESC_CODE) this.clearCategory(event);
    else if(event.keyCode === ENTER_CODE) {
      const category = {
        ...this.state.categoryBeingAdded, 
        name: event.target.value,
        fx: null,
        fy: null
      };
      const categories = [...this.state.categories]
      categories.push(category)
      event.target.value= '';
      event.target.blur();
      this.setState({categories, categoryBeingAdded: null});
    }
  }

  deleteCategory(category) {
    const categories = _.filter(this.state.categories, d => d.name !== category.name);
    this.setState({categories});
  }


  render() {
    const inputStyle = {
      fontSize: 14,
      textAlign: 'center',
      display: 'block',
      padding: 5,
      width: 200,
      margin: 'auto',
      background: 'none',
      color: colors.black,
      border: 'none',
      borderBottom: '2px solid ' + colors.black,
    }
    const props = {
      width,
      colors,
      linkToCategory: this.linkToCategory,
      editDate: this.editDate,
      deleteCategory: this.deleteCategory,
    };
    const svgStyle = {
      overflow: 'visible',
      top: 0,
      width,
      height,
      zIndex: -1,
    }
    return (
      <div className={styles.root}>
        <h1 style={{textAlign:'center'}}>
            App Usage this week
        </h1>
        <input id='addCategory' style={inputStyle} type='text' placeholder='Add Category'
           onBlur={this.clearCategory} onFocus={this.startCategory} onKeyDown={this.addCategory}></input>
        <svg style={svgStyle}>
          <Day {...props} {...this.state} />
          <Categories {...props} {...this.state} />
          <Expenses {...props} {...this.state} /> 
        </svg>
      </div>
    )
  }
}

export default DigitalTracker;