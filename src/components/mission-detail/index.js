import React from 'react';

import MissionItem from '../mission-item';

const MissionDetail = (props) => {
    console.log("props: ", props)
    return(
        <div className="d-flex pool-modal">
            <MissionItem data={props.data} />
            <div className='w-100'>
                <div className="modal-title">
                    Mission Objective
                </div>
                <div className="pool-description px-4">
                    <p>Support a troop of 500 galactic crew members as they navigate one of the 
                        most formidable ships in the galaxy. The Pearce C11 is the most significant 
                        fleet carrier vessel to come from the MUD Territory. The C11’s hull is 
                        riddled with hangar bays and studded with turret weapon arrays providing a 
                        platform to house and protect an entire fleet of ships all the way up to 
                        capital sized docking mechanics. Attempting to approach this ship with 
                        hostility is a well documented fatal error and that fact is common knowledge 
                        for any Jorvik roving band of pirates. Often doubling as organization 
                        headquarters, the C11 provides every imaginable onboard accommodations to 
                        equip and sustain an entire fleet of ships and a broad roster of crew members.
                    </p>
                </div>
                <div className="pool-gallery">
                    <div className="gallery-item">
                        <img src="https://www.arcade2earn.io/wp-content/uploads/2022/01/staratlas.png"/>
                    </div>
                    <div className="gallery-item">
                        <img src="https://www.arcade2earn.io/wp-content/uploads/2022/01/staratlas.png"/>
                    </div>
                </div>
                <div className="modal-content-bottom">
                    <div className="pool-price">
                        Minimum Entry: {props.data.max_pool_size} ARCADE
                    </div>
                    <a href='#' onClick={props.nextStep} className="btn btn-action">Stake</a>
                </div>
            </div>
        </div>
    );
}

export default MissionDetail;