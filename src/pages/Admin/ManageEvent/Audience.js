import React, { useState, useEffect } from "react";
import { MDBContainer } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";


const AudienceList = ({ audiencelist }) => {
    const [audienceDetails, setAudienceDetails] = useState([]);

    useEffect(() => {
        if (audiencelist) {
            setAudienceDetails([...audiencelist]);
        }
    }, [audiencelist]);

    const columns = [
        {
            label: 'Audience Name',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Audience Email',
            field: 'email',
            sort: 'asc'
        }
    ];

    return (
        <div id="participant">
            <MDBContainer>
                <MDBTable btn responsive striped sorting="true">
                    <MDBTableHead columns={columns} />
                    <MDBTableBody>
                        {(!audienceDetails || audienceDetails.length === 0) && (
                            <tr>
                                <td colSpan="2">
                                    No audience registered for this event
                                    </td>
                            </tr>
                        )}
                        {audienceDetails && audienceDetails.map((user, index) => (
                            <tr key={user.posn_no}>
                                <td>{user.userObj.f_name} {user.userObj.l_name}</td>
                                <td>{user.userObj.email}</td>
                                
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer>
        </div>
    );
}

export default AudienceList;