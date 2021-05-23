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
              
              <div className={HomeStyle.title_card}>
              <p className={HomeStyle.update_time}>Last update from CoWIN  <br /> {current_time}, Today {current_date}</p>
              <p className={HomeStyle.update_time}>Data restricted only for District You Choosed</p>
              <p className={HomeStyle.update_time}>Disclaimer: Data Might Not Accurate</p>
              </div>
             
              {/* <TableAPI /> */}
            </div>
          </div>
          <div className={HomeStyle.districts}>
            <button onClick={() => window.open("https://washim--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Washim</button>
            <button onClick={() => window.open("https://akola--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Akola</button>
            <button onClick={() => window.open("https://amravati--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Amravati</button>
            <button onClick={() => window.open("https://amravati--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Amravati</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
