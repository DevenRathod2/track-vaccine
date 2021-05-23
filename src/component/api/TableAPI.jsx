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
import HomeStyle from '..//../pages/Home.module.css';

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
  let current_date = new Date().toISOString().replace(/T.*/, '').split('-').reverse().join('-')

  
  const getVaccineData = async () => {
    
    try {
      const data = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=369&date=23-05-2021" //+ {current_date}
      );
      setVaccine(data.data.centers);

      if (data.data.centers.length !== 0) {
        console.log("Data Found")
        console.log(current_date)
      }
      else {
        console.log("Data Not Found")
      }
      console.log(data.data.centers);
      console.log(current_date)
      console.log(data.data.centers[7].sessions[0].vaccine)
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
    

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Data">
        <TableHead>
          <TableRow>
            <StyledTableCell>HOSPITAL NAME</StyledTableCell>
            <StyledTableCell align="center">BLOCK NAME</StyledTableCell>
            <StyledTableCell align="center">ADDRESS</StyledTableCell>
            <StyledTableCell align="center">VACCINE</StyledTableCell>
            <StyledTableCell align="center">DOSE 1</StyledTableCell>
            <StyledTableCell align="center">DOSE 2</StyledTableCell>
            <StyledTableCell align="center">AVAILIABLE CAPICITY</StyledTableCell>
            <StyledTableCell align="center">FEE TYPE</StyledTableCell>
            <StyledTableCell align="center">PINCODE</StyledTableCell>
            <StyledTableCell align="center">MIN AGE</StyledTableCell>
            <StyledTableCell align="center">SLOT AVAILABLE</StyledTableCell>
            <StyledTableCell align="center">BOOK NOW</StyledTableCell>
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
                    {item.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.sessions[0].vaccine}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.sessions[0].available_capacity_dose1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.sessions[0].available_capacity_dose2}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.sessions[0].available_capacity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.fee_type}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.pincode}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.sessions[0].min_age_limit}+
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.sessions[0].slots[0]}|
                    {item.sessions[0].slots[1]}|
                    {item.sessions[0].slots[2]}|
                    {item.sessions[0].slots[3]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={()=> window.open("https://selfregistration.cowin.gov.in/", "_blank")} className={HomeStyle.btn}>Book On CoWIN</button>
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



