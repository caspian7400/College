import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export default function File({ file }) {
    const style = {
        textDecoration: "none",
        color: "black"
    }
    return (
        <Link to={`https://ipfs.io/ipfs/${file.cid}`} style={style}>
            <Container fluid className="d-flex">
                <div>
                    {file.name}
                </div>
                <div className="w-100 d-flex justify-content-end">
                    <i className="bi bi-filetype-pdf"></i>
                </div>
            </Container>
        </Link>
    )
}

File.propTypes = {
    file: PropTypes.object.isRequired
}