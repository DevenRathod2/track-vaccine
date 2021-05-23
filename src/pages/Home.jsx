import React from "react";
import HomeStyle from "../pages/Home.module.css";
import TableAPI from '../component/api/TableAPI';
import Logo from '../component/assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


class Home extends React.Component {
  render() {
    let current_date = new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')
    let current_time = new Date().toLocaleTimeString();
    return (
      <React.Fragment>
        <div className={HomeStyle.container}>
          <div className={HomeStyle.title}>
            <img className={HomeStyle.logo} src={Logo} alt="Logo" />
            <div className={HomeStyle.time}>
              <h4 className={HomeStyle.update_time}>Last update from CoWIN  <br /> {current_time}, Today {current_date}</h4>
              <h4 className={HomeStyle.update_time}>Data restricted only for Washim District</h4>
              <h4 className={HomeStyle.update_time}>Pin Code 444505</h4>
              <TableAPI />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
