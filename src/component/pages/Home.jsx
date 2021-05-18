import React from "react";
import Time from "../Dateandtime";
import HomeStyle from "../pages/Home.module.css";
import Cards from "../Card";
import Logo from '../assets/logo.png';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={HomeStyle.container}>
          <div className={HomeStyle.title}>
            <img className={HomeStyle.logo} src={Logo} alt="Logo" />
            <h2 className={HomeStyle.text_title}>VACCINATION APPOINTMENT AVAILABILITY</h2>
            <div className={HomeStyle.time}>
              <Time />
              <Cards />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
