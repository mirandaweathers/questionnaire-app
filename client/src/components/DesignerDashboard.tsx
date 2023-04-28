import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";  


export const DesignerDashboard = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);

    const showModal = (client:any) => {
        console.log("showing modal")
        setSelectedClient(client);
        setDisplayModal(true);
    };

    const hideModal = () => {
        setSelectedClient(null);
        setDisplayModal(false);
    };

    const renderModal = (selectedClient: any) => {
        if (!selectedClient) {
            return null;
        }

        return (
            <Dialog visible={displayModal} onHide={hideModal}>
                <h4>Household Information:</h4>
                <ul>
                    <li>Address: {selectedClient.address}</li>
                    <li>Adults: {selectedClient.adults}</li>
                    <li>Kids: {selectedClient.kids}</li>
                    <li>Budget: {selectedClient.budget}</li>
                </ul>

                <h4>Bedroom Information:</h4>
                <ul>
                    <li>Style: {selectedClient.brStyle}</li>
                    <li>Mood: {selectedClient.brMood}</li>
                    <li>Activities: {selectedClient.brActivities}</li>
                    <li>Color: {selectedClient.brColor}</li>
                    <li>Bedding: {selectedClient.bedding}</li>
                    <li>Furniture to keep: {selectedClient.brFurnitureToKeep}</li>
                    <li>Other notes: {selectedClient.brOtherNotes}</li>
                </ul>
        
                <h4>Living Room Information:</h4>
                <ul>
                    <li>Style: {selectedClient.lrStyle}</li>
                    <li>Mood: {selectedClient.lrMood}</li>
                    <li>Activities: {selectedClient.lrActivities}</li>
                    <li>Color: {selectedClient.lrColor}</li>
                    <li>Furniture to keep: {selectedClient.lrFurnitureToKeep}</li>
                    <li>Other notes: {selectedClient.lrOtherNotes}</li>
                </ul>
        
                <h4>Dining Room Information:</h4>
                <ul>
                    <li>Style: {selectedClient.drStyle}</li>
                    <li>Mood: {selectedClient.drMood}</li>
                    <li>Activities: {selectedClient.drActivities}</li>
                    <li>Color: {selectedClient.drColor}</li>
                    <li>Furniture to keep: {selectedClient.drFurnitureToKeep}</li>
                    <li>Other notes: {selectedClient.drOtherNotes}</li>
                </ul>
                
            </Dialog>
        );
    };
    

    const getClients = async () => {
        const response = await fetch('http://localhost:3000/allclientdata', {
            method: 'GET'
        })
        const data = await response.json();

        setClients(data.clientData);

        console.log(clients)
    }

    const exit = () => (
        navigate('/', {replace: true})
    )

    useEffect(() => {
        // fetch client data on component mount
        
        getClients();
    }, []);

    return (
        <div className='formContainer' style={{maxWidth: '900px'}}>
            <h1>Client Information</h1>
            <p>Click on a row to see details about each client's household and room specifications.</p>
            <DataTable value={clients} rowHover selectionMode="single" onRowSelect={(event) => showModal(event.data)}>
                <Column field="email" header="Email" />
                <Column field="firstName" header="First Name" />
                <Column field="lastName" header="Last Name" />

                <Column field="phone" header="Phone" />
                <Button icon="pi pi-search" onClick={() => showModal(selectedClient)} />
            </DataTable>
          {renderModal(selectedClient)}
        
        <button className='cancelButton' style={{marginTop: '40px'}} onClick={exit}>Exit</button>
        </div>
      );

}

export default DesignerDashboard;
