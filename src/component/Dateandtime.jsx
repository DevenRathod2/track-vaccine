import React from 'react'
import HomeStyle from '../component/pages/Home.module.css';


const Time = () => {
    let current_date = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-')
    let current_time = new Date().toLocaleTimeString();

    return (
        <div>
            <h4 className={HomeStyle.update_time}>Last update from CoWIN - {current_time}, Today {current_date}</h4>
        </div>
        
    )
}


export default Time;