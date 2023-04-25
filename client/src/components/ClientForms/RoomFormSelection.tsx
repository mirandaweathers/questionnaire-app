import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function RoomFormSelection(props:any) {
    const location = useLocation();
    const { email, name } = location.state;

    return(
        <div className="formContainer">
            <h1>Welcome, {name}!</h1>
            <p className="subheader">It's time to go over your style preferences.</p>
            <p>Pick one room, or all three. You'll return to this page after each form.</p>

            <div className="roomCardGroup">
                <Link to={'/living-room'} state={{email: email}}>
                    <div className="cardContainer roomCardContainer">
                        <div className="cardImage roomCardImage" style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80")'
                        }}></div>
                        <div className="cardBody roomCardBody">
                            <h2>Living Room</h2>
                        </div>
                    </div>
                </Link>
                
                <Link to={'/dining-room'} state={{email:email}}>
                    <div className="cardContainer roomCardContainer">
                        <div className="cardImage roomCardImage" style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80")'
                        }}></div>
                        <div className="cardBody roomCardBody">
                            <h2>Dining Room</h2>
                        </div>
                    </div>
                </Link>
                
                <Link to={'/bedroom'} state={{email:email}}>
                    <div className="cardContainer roomCardContainer">
                        <div className="cardImage roomCardImage" style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80")'
                        }}></div>
                        <div className="cardBody roomCardBody">
                            <h2>Bedroom</h2>
                        </div>
                    </div>
                </Link>
                
            </div>
            
        </div>
    )
}