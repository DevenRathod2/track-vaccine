import axios from "axios";
import { useEffect, useState } from "react";
import HomeStyle from "..//../pages/Home.module.css";
import "antd/dist/antd.css";
import { Input, Select, Alert } from "antd";
import { Button, Tooltip } from "antd";
// import { SearchOutlined } from '@ant-design/icons';
import "../../pages/common.css";
import { Table } from "antd";

const columns = [
  {
    title: "States",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Today",
    dataIndex: "age",
    width: 100,
  },
  {
    title: "Total",
    dataIndex: "address",
  },
];

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

const App = () => {
  const { Search } = Input;
  const [vaccine, setVaccine] = useState([]);
  const [search, setSearch] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [statisticsData, setStatistics] = useState([]);
  const [todayVaccinate, setTodayvaccine] = useState("");
  const [totalRegister, setTotalregister] = useState("");
  const [totalDosecomplete, setTotaldosecomplete] = useState("");
  const [district_vise, setDistrictvise] = useState([]);
  const [vaccination_center, setVaccinationcenter] = useState([]);
  const [state_data, setStatedata] = useState([]);

  const pagination = { position: "nono" };

  const { Option } = Select;

  function handleChange(value) {
    setDistrict(value);
  }

  console.log(state_data);

  const data = state_data.map((row) => ({
    Name: row.state_name,
    Today: row.today,
    Total: row.total,
  }));

  let current_date = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");

  let current_time = new Date().toLocaleTimeString();

  var todayDate = new Date().toISOString().slice(0, 10);

  var todayDate = new Date().toISOString().slice(0, 10);

  const DistrictViseData = async () => {
    try {
      const response = await axios.get(
        "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=21&district_id=369&date=" +
          todayDate
      );
      setDistrictvise(response.data.getBeneficiariesGroupBy);
    } catch (e) {
      // console.log(e)
    }
  };

  useEffect(() => {
    DistrictViseData();
  }, []);

  const getVaccineStatic = async () => {
    try {
      const response = await axios.get(
        "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=" +
          todayDate
      );
      setStatistics(response);
      setTodayvaccine(response.data.topBlock.vaccination.today);
      setTotalregister(response.data.topBlock.registration.total);
      setTotaldosecomplete(response.data.topBlock.vaccination.total);
      setDistrictvise(response.getBeneficiariesGroupBy);
      setVaccinationcenter(response.data.topBlock.sites);
      setStatedata(response.data.getBeneficiariesGroupBy);
    } catch (e) {}
  };

  useEffect(() => {
    getVaccineStatic();
  }, []);

  // console.log(start);

  const apiUrl =
    // https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=     production api
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" +
    "369" +
    "&date=" +
    current_date;

  const getVaccineData = async () => {
    try {
      const data = await axios.get(apiUrl);
      setVaccine(data.data.centers);

      // console.log(data.data.sessions);
      // console.log(data.data.sessions[0].name)
    } catch (e) {}
  };

  useEffect(() => {
    getVaccineData();
  }, []);

  // if(setDistrict != null && setDistrict === district) {
  //   console.log("Data No Available")

  // }

  // else {
  //   console.log("Data Available")
  //   getVaccineData();

  // }

  // const onSearch = (value) => console.log(value);

  return (
    <div className={HomeStyle.table_component}>
      <div className={HomeStyle.container}>
        <div className={HomeStyle.vaccine_statics}>
          <div className={HomeStyle.vaccine_statics_title}>
            <p>Vaccination Data : </p>
            <p>
              (Till Date {current_date}, {current_time})
            </p>
          </div>
          <div className={HomeStyle.vaccine_statics_card}>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>
                  Vaccinated <br />
                  Today
                </p>
                <div className={HomeStyle.static_card_data}>
                  <p>{todayVaccinate}+</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>
                  Total <br />
                  Registrations
                </p>
                <div className={HomeStyle.static_card_data}>
                  <p>{totalRegister}+</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>Total Vaccination</p>
                <div className={HomeStyle.static_card_data}>
                  <p>{totalDosecomplete}+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vaccination Total Centers */}

        <div className={HomeStyle.vaccine_statics}>
          <div className={HomeStyle.vaccine_statics_title}>
            <p>Sites Conducting Vaccination : </p>
            {/* <p>(Till Date {current_date}, {current_time})</p> */}
          </div>
          <div className={HomeStyle.vaccine_statics_card}>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>Total Sites</p>
                <div className={HomeStyle.static_card_data}>
                  <p>{vaccination_center.total}</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>
                  Government <br />
                </p>
                <div className={HomeStyle.static_card_data}>
                  <p>{vaccination_center.govt}</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>Private</p>
                <div className={HomeStyle.static_card_data}>
                  <p>{vaccination_center.pvt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={HomeStyle.select_dist}></div>
      </div>

      <div className={HomeStyle.input_container}></div>
      <div className={HomeStyle.search_center}>
        {/* <p>Search Vaccination Center : <span className={HomeStyle.grey_text}>( Washim District Only )</span></p> */}
      </div>
      <input
        type="text"
        placeholder="Search Vaccination Center Name"
        className={HomeStyle.filer_input}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className={HomeStyle.disclamer}>
        <p>
          Disclaimer : While we have real-time data, slot availability on CoWin
          changes rapidly. If you see availability, please book on CoWin
          instantly before the slots are lost.
        </p>
      </div>

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
