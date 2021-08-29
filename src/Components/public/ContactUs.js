import React from 'react'

export default function ContactUs() {
    return (
        <div style={{ display: 'flex',flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto', width: "80vw", justifyContent: 'space-around', padding: "50px"}}>
            <div>
                <iframe width="600" height="450" style={{ border: 'none'}}title="Ideal Villas" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJO6XXAhB3AjoRh3BIux1hXus&key=AIzaSyDCaAaHzmnnHKc1peMMX367k1-v08EVufw"></iframe>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h2>Ideal Villas Owner's Association</h2>
                <br />
                <p>Thakdari Road, Action Area I, Newtown, Kolkata, West Bengal 700102</p>
            </div>
        </div>
    )
}
