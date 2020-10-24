import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css'
import Team from '../../assets/svg/Team-Work.svg';
class Home extends React.Component {
  render() {
    return (
      <div className={style.root}> 
        <Team width={350}/>
        <h1 className={style.title}>Data Visualization D3 with ReactJS</h1>
        <Link to="/covid" className={style.navigationItem}>Covid19</Link>
        <Link to="/weather" className={style.navigationItem}>Weather History</Link>
        <Link to="/apps-tracker" className={style.navigationItem}>Apps History</Link>
        <Link to="/expense" className={style.navigationItem}>Personal Expense</Link>
      </div>
    )
  }
}

export default Home;