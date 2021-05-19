import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HomeStyle from './pages/Home.module.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#7B8CDE",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    }, 
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


const App = () => {
  const classes = useStyles();
  const [vaccine, setVaccine] = useState([]);
  const [search, setSearch] = useState("");
  let current_date = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-')
  

  const getVaccineData = async () => {
    try {
      const data = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=444505&date=" + {current_date}
      );
      console.log(data.data.sessions);
      setVaccine(data.data.sessions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVaccineData();
  }, []);
  return (
    <div className={HomeStyle.table_component}>
      
      <input
        type="text"
        placeholder="Search Hospital Name"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {/* {vaccine
        .filter((item) => {
          if (search == "") {
            return item;
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        })
        .map((item) => {
          return (
            <p>
              {item.name} - {item.price} {item.center_id}
            </p>
          );
        })} */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>HOSPITAL NAME</StyledTableCell>
              <StyledTableCell align="center">BLOCK NAME</StyledTableCell>
              <StyledTableCell align="center">VACCINE</StyledTableCell>
              <StyledTableCell align="center">DOST 1</StyledTableCell>
              <StyledTableCell align="center">DOST 2</StyledTableCell>
              <StyledTableCell align="center">AVAILIABLE CAPICITY</StyledTableCell>
              <StyledTableCell align="center">FEES</StyledTableCell>
              <StyledTableCell align="center">PINCODE</StyledTableCell>
              <StyledTableCell align="center">MIN AGE</StyledTableCell>
              <StyledTableCell align="center">BOOK NOW</StyledTableCell>
              {/* <StyledTableCell align="center">{current_date}</StyledTableCell>
              <StyledTableCell align="center">{pincode}</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccine
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                  
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.block_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.vaccine}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.available_capacity_dose1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.available_capacity_dose2}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.available_capacity}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.fee}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.pincode}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.min_age_limit}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <a href="https://selfregistration.cowin.gov.in/" target="https://selfregistration.cowin.gov.in/">Book on CoWIN</a>
                    </StyledTableCell>
                    
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;



