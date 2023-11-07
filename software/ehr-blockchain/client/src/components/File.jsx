import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export default function File({ file }) {
    return (
        <Container fluid>
            <Link to={`https://ipfs.io/ipfs/${file.cid}`}>
                <div>
                    {file.name}
                </div>
            </Link>
        </Container>
    )
}

File.propTypes = {
    file: PropTypes.object.isRequired
}