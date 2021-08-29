import React from 'react'
import slider1 from "../../Assets/slider1.jpeg";

export default function AboutUs() {
    return (
        <div style={{ display: 'flex',flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto', width: "80vw", justifyContent: 'space-around', padding: "50px"}}>
            
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: "50px", textAlign: 'center'}}>
                <h2>Ideal Villas Owner's Association</h2>
                <br />
                <p>Thakdari Road, Action Area I, Newtown, Kolkata, West Bengal 700102</p>
                <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum corrupti repudiandae labore excepturi a cupiditate dolor quia sed, culpa ipsa sit, dolore asperiores recusandae, adipisci quae. Aut nihil assumenda quia.</p>
            </div>
            <div>
                <img src={slider1} alt="" />
            </div>

        </div>
    )
}
