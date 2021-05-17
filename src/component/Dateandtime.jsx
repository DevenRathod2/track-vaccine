import React from 'react'


const Time = () => {
    let current_date = new Date().toLocaleDateString();
    let current_time = new Date().toLocaleTimeString();

    return (
        <div>
            <h3>Current Date = {current_date}</h3>
            <h3>Current Time = {current_time}</h3>
        </div>
        
    )
}


export default Time;