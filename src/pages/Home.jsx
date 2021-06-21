import React from "react";
import HomeStyle from "../pages/Home.module.css";
import TableAPI from '../component/api/TableAPI';
import Logo from '../component/assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

}));

class Home extends React.Component {


  render() {
    let current_date = new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')
    let current_time = new Date().toLocaleTimeString();

    return (
      <React.Fragment>
        <div className={HomeStyle.container}>
          <AppBar className={HomeStyle.Appbar} style={{ background: '#121212' }} position="static">
            <Toolbar>
              <div>
                <img className={HomeStyle.logo} src={Logo} alt="GetVaccinate" />
              </div>
            </Toolbar>
          </AppBar>
          <div className={HomeStyle.title}>
            <div className={HomeStyle.time}>
              <div className={HomeStyle.title_card}>
                <p className={HomeStyle.update_time}>Last update from CoWIN  <br /> {current_time}, Today {current_date}</p>
                <p className={HomeStyle.update_time}>Data restricted only for Washim District <br />
                Disclaimer: Data Might Not Accurate</p>
              </div>
              <TableAPI />
            </div>
          </div>
          {/* <div className={HomeStyle.sub_title_card}></div> */}
          {/* <div className={HomeStyle.districts}>
            <button onClick={() => window.open("https://akola--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Akola</button>
            <button onClick={() => window.open("https://amravati--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Amravati</button>
            <button onClick={() => window.open("https://washim--getvaccinate.netlify.app", "_blank")} className={HomeStyle.dist_button}>Washim</button>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
