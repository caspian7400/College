import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

export default function Patient({ patientDetails }) {
    return (
        <Container fluid>
            {
                patientDetails.permitted === true ?
                    <div className="d-flex flex-column">
                        <div >{patientDetails.name}</div>
                        <div>{patientDetails.age}</div>
                    </div>
                    :
                    <div className="d-flex flex-column">
                        <div>ACCESS DENIED</div>
                    </div>
            }
        </Container>
    )
}

Patient.propTypes = {
    patientDetails: PropTypes.object.isRequired,
}
