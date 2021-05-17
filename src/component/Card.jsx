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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    marginTop: 200,
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
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=369&date=31-03-2021"
      );
      console.log(data.data.sessions);
      setProduct(data.data.sessions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      
      <input
        type="text"
        placeholder="Search here"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {/* {product
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
              {item.name} - {item.price}
            </p>
          );
        })} */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>HOSPITAL NAME</StyledTableCell>
              <StyledTableCell align="right">BLOCK NAME</StyledTableCell>
              <StyledTableCell align="right">PINCODE</StyledTableCell>
              <StyledTableCell align="right">DOST 1 AVAILIABLE</StyledTableCell>
              <StyledTableCell align="right">DOST 2 AVAILIABLE</StyledTableCell>
              <StyledTableCell align="right">AVAILIABLE CAPICITY</StyledTableCell>
              <StyledTableCell align="right">FEES</StyledTableCell>
              <StyledTableCell align="right">Vaccine</StyledTableCell>
              <StyledTableCell align="right">AGE+</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
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
                    <StyledTableCell align="right">
                      {item.block_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.pincode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.available_capacity_dose1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.available_capacity_dose2}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.available_capacity}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.fee}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.vaccine}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.min_age_limit}
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



