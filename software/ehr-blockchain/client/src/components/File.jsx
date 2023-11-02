import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export default function File({ cid }) {
    return (
        <Container fluid>
            <Link to={`https://ipfs.io/ipfs/${cid}`}>
                <div>
                    medical record
                </div>
            </Link>
        </Container>
    )
}

File.propTypes = {
    cid: PropTypes.string.isRequired
}