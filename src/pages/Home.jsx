import React, { useState } from "react";
import HomeStyle from "../pages/Home.module.css";
import Findbypin from "../component/api/Findbypin";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { fade } from "@material-ui/core/styles";
import "../pages/Home.module.css";
import { Player } from '@lottiefiles/react-lottie-player';
import live_lottie from "../component/assets/live_icon.json"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

class Home extends React.Component {
  state = { form: { message: "" } };

  handleChangeInput = (event) => {
    const { value, maxLength } = event.target;
    const message = value.slice(0, maxLength);

    this.setState({
      form: {
        message,
      },
    });
  };

  render() {
    let current_date = new Date()
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-");
    let current_time = new Date().toLocaleTimeString();
    console.log(this.state.form.message);
    
    
    return (
      <React.Fragment>
        <AppBar
          className={HomeStyle.Appbar}
          style={{ background: "#3A506B" }}
          position="static"
        >
          <Toolbar>
            <div>
              <h2 className={HomeStyle.logo}>GetVaccinate.</h2>
            </div>
          </Toolbar>
        </AppBar>
        <div className={HomeStyle.container}>
          <div className={HomeStyle.update_status}>
            <p>
              <Player
                className={HomeStyle.lottie_player}
                autoplay
                loop
                src={live_lottie}
                style={{ height: '50px', width: '40px', marginTop: '-15px' }}
              >
              </Player>
              Last update from CoWin. <br /> {current_time}, {current_date}
            </p>
          </div>
          
          <Findbypin />
        </div>
        <footer>
          <div className={HomeStyle.footer}>
            <h3>Build with ❤️ By <a href="https://instagram.com/devenrathod.me">Deven Rathod</a></h3>
            <p><a href="https://github.com/DevenRathod2/track-vaccine"> Support This Open-Source</a></p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Home;
