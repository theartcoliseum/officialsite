import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal } from "mdbreact";
import CreateEvent from '../CreateEvent';

const Admin = () => {
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

    return (
        <div className="parallax-section" id="admin">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="8" md="8" className="mb-lg-0 mb-5">
                        <h1 className="h1-responsive">Admin Dashboard</h1>
                    </MDBCol>
                    <MDBCol lg="4" md="4" className="mb-lg-0 mb-5">
                        <MDBBtn color="elegant" onClick={() => setIsCreateEventModalOpen(true)}>Create Event</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal id="create-event-modal" isOpen={isCreateEventModalOpen} centered>
                <CreateEvent close={() => { setIsCreateEventModalOpen(false); }} />
            </MDBModal>
        </div>
    );
}

export default Admin;