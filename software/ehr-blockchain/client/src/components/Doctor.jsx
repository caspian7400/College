import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

export default function Doctor({ doctorDetails }) {
    return (
        <Container fluid>
            <div className="d-flex flex-column">
                <div>{doctorDetails.name}</div>
                <div>{doctorDetails.age}</div>
            </div>
        </Container>
    )
}

Doctor.propTypes = {
    doctorDetails: PropTypes.object.isRequired,
}