import React from 'react';
import LineChartWeather from '../../components/LineChartWeather';
import style from './style.module.css'


class ExamplePage extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_WEATHER_BASE_URL+"&q=Jakarta&units=metric")
      .then(res => res.json())
      .then(data => {
        const { list } = data;
        const newData = list.map(item => ({
            date: new Date(item.dt), 
            high: item.main.temp_max, 
            low: item.main.temp_min
          })
        )
        this.setState({data: newData})
      });
  }

  render() {
    return (
      <div className={style.root}>
          <p className={style.title}>Example Temperature Report Using D3 &amp; React</p>
          <div className={style.charts}>
            <div className={style.lineChart}>
              
              {this.state.data && <LineChartWeather data={this.state.data}/>}
            </div>
          </div>
      </div>
    )
  }
}

export default ExamplePage;