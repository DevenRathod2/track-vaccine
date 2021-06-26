import axios from "axios";
import { useEffect, useState } from "react";
import HomeStyle from "..//../pages/Home.module.css";

const App = () => {
  const [vaccine, setVaccine] = useState([]);
  const [search, setSearch] = useState("");
  const [states, setStates] = useState([]);
  const [district, setDistrict] = useState([]);

  let current_date = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");


  // Get All State Api
  axios.get('https://cdndemo-api.co-vin.in/api/v2/admin/location/states', {}, {

  }).then(getStates => {
    console.log(getStates.data.states);
    const listState = getStates.data.states;
    console.log(listState);
  }).catch(error => {
    console.log(error);
  })

  // Get All State's District Api
  axios.get('https://cdndemo-api.co-vin.in/api/v2/admin/location/districts/16', {}, {

  }).then(getDistrict => {
    console.log(getDistrict.data.districts);
  }).catch(error => {
    console.log(error);
  })





  const getVaccineData = async () => {
    try {
      const data = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=369&date=" +
        current_date
      );
      setVaccine(data.data.centers);
    } catch (e) { }
  };

  useEffect(() => {
    getVaccineData();
  }, []);

  return (
    <div className={HomeStyle.table_component}>
      <input
        type="text"
        placeholder="Search Vaccination Center Name"
        className="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

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

            <div className={HomeStyle.container}>
              <div className={HomeStyle.card_container} key={item.id} >
                <div className={HomeStyle.card_details}>
                  <div className={HomeStyle.center_details}>
                    <span>
                      <p>{item.name}</p>
                      <p>{item.block_name}, {item.pincode}</p>
                      <p>Age {item.sessions[0].min_age_limit}+</p>
                      <p>{item.sessions[0].vaccine}, ( {item.fee_type} )</p>
                    </span>
                  </div>
                </div>
                <div className={HomeStyle.card_btn}>
                  <div className={HomeStyle.slot}>
                    <p>Dose 1: {item.sessions[0].available_capacity_dose1}</p>
                    <p>Dose 2: {item.sessions[0].available_capacity_dose2}</p>
                    <div className={HomeStyle.book_btn}>
                      <a href="https://selfregistration.cowin.gov.in/">Book Now</a>
                      {/* <button
                        onClick={() =>
                          window.open(
                            "https://selfregistration.cowin.gov.in/",
                            "_blank"
                          )
                        }
                        className={HomeStyle.btn}
                      >
                        Book Now
                      </button> */}
                    </div>
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
