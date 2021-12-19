import * as React from 'react'
import Canvas from '../../components/Canvas';
import './styles.css';
import Logo from '../../assets/logo.png';

const Home = () => {
  return (
    <div className="page-wrapper">
      <div className="title">
        <h1 className="main-title">
          Paint 1.5
          <img src={Logo} alt="logo"/>
        </h1>
        <p>Draw from your browser</p>
      </div>
      <Canvas />
    </div>
  )
}

export default Home;