import React from 'react';
import style from './style.module.css'

const week = [
  {
    id: 1,
    date: new Date("10-11-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  },
  {
    id: 2,
    date: new Date("10-12-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  },
  {
    id: 3,
    date: new Date("10-13-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  },
  {
    id: 4,
    date: new Date("10-14-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  },
  {
    id: 5,
    date: new Date("10-15-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  },
  {
    id: 6,
    date: new Date("10-16-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  },
  {
    id: 7,
    date: new Date("10-17-2020"),
    expense: [
      {
        name: 'Nasi Padang',
        amount: 15000
      },
      {
        name: 'Kopi Kenangan',
        amount: 15000
      }
    ]
  }
]

class ExpensePage extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <div className={style.weekContainer}>
          {week.map(day => (
            <div key={day.id} className={style.dayBox}>
              <div className={style.dailyExpenseInnerBox}>
                 <p>{day.expense[0].name}</p> 
              </div>
              <p style={{fontSize: '12px', textAlign:'center'}}>{day.date.toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ExpensePage;