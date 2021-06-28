import { Alert } from "@material-ui/lab";
import { queries, render } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";
import HomeStyle from "..//../pages/Home.module.css";
import "antd/dist/antd.css";
import { Input, Space } from "antd";
import "../../pages/common.css";

const App = () => {
  const { Search } = Input;
  const [vaccine, setVaccine] = useState([]);
  const [search, setSearch] = useState("");
  const [pincode, setPincode] = useState("");
  const [statisticsData, setStatistics] = useState([]);

  let current_date = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");

  
    
  const vaccinationDataApi = "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=" + current_date
 
  const getVaccinateDataApi = async () => {
    try {
      const statisticsData = await axios.get(vaccinationDataApi);
      setStatistics(statisticsData);
      console.log(statisticsData.vaccination.today);
    } catch (e) {}
  };

  useEffect(() => {
    setStatistics();
  },[]);


  const apiUrl =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=369&date=" +
    current_date;
  console.log(apiUrl);

  const getVaccineData = async () => {
    try {
      const data = await axios.get(apiUrl);
      setVaccine(data.data.centers);
      console.log(data.data.sessions);
      // console.log(data.data.sessions[0].name)
    } catch (e) {}
  };

  useEffect(() => {
    getVaccineData();
  }, []);

  const onSearch = (value) => console.log(value);

  return (
    <div className={HomeStyle.table_component}>
      <div className={HomeStyle.input_container}>
        {/* <div className={HomeStyle.findbypin}>
        
          <div className={HomeStyle.input_pincode}>

          
            {/* <input
              type="text"
              id="findbypin"
              placeholder="Enter Pincode"
              maxLength="6"
              value = "444505"
              onChange={event => setPincode(event.target.value)}
            />
            <button id="findbtn" className={HomeStyle.searchbtn}>Find Slot {pincode}</button> 
            
          </div>
        </div> */}
      </div>

      <input
        type="text"
        placeholder="Search Vaccination Center Name"
        className={HomeStyle.filer_input}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {vaccine

        .filter((item) => {
          if (search === "") {
            return item;
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        })

        .map((item) => {
          return (
            <div className={HomeStyle.container}>
              <div className={HomeStyle.card_container} key={item.id}>
                <div className={HomeStyle.card_details}>
                  <div className={HomeStyle.center_details}>
                    <span>
                      <p>{item.name}</p>
                      <p>
                        {item.block_name}, {item.pincode}
                      </p>
                      <p>Minimun Age {item.sessions[0].min_age_limit}+</p>
                      <p>
                        {item.sessions[0].vaccine}, ( {item.fee_type} )
                      </p>
                    </span>
                  </div>
                </div>
                <div className={HomeStyle.card_btn}>
                  <div className={HomeStyle.slot}>
                    <p>
                      SLOT <br />
                      {item.sessions[0].available_capacity_dose1}
                    </p>
                    {/* <p>Dose 2: {item.sessions[0].available_capacity_dose2}</p>  */}
                    {/* <div className={HomeStyle.book_btn}>
                      <a href="https://selfregistration.cowin.gov.in/">Book Now</a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
