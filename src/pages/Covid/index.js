import React from 'react';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart'; 
import style from './style.module.css'

const red = '#eb6a5b';
// const green = '#b6e86f';
const blue = '#52b6ca';

class ExamplePage extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_BASE_URL+'/total/dayone/country/australia')
      .then(res => res.json())
      .then(data => {
        const newData = data.map(d => ({...d, Date: new Date(d.Date), avg: (d.Active + d.Confirmed )/2}))
        this.setState({data: newData})
      });
  }

  render() {
    return (
      <div className={style.root}>
          <p className={style.title}>Example Covid Report Using D3 &amp; React</p>
          <div className={style.charts}>
            <div className={style.lineChart}>
              {this.state.data && <BarChart data ={this.state.data}/>}
            </div>
            <div className={style.lineChart}>
              <div className={style.description}>
                <svg height={5} width={50}>
                  <line x1="100" y1="0" x2="0" y2="0" style={{stroke:blue,strokeWidth:3.5}} />
                </svg>
                <p>Active</p>
              </div>
              <div className={style.description}>
                <svg height={5} width={50}>
                  <line x1="100" y1="0" x2="0" y2="0" style={{stroke:red,strokeWidth:3.5}} />
                </svg>
                <p>Confirmed</p>
              </div>
              {this.state.data && <LineChart data={this.state.data}/>}
            </div>
          </div>
      </div>
    )
  }
}

export default ExamplePage;