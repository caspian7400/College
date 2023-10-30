import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export default function File({ fileDetails }) {
    return (
        <Container fluid>
            <Link to={`https://ipfs.io/ipfs/${fileDetails.cid}`}>
                <div>
                    File name
                </div>
                <div>
                    {/*pd ficon*/}
                    <img src="">{fileDetails.name}</img>
                </div>
            </Link>
        </Container>
    )
}

File.propTypes = {
    fileDetails: PropTypes.object.isRequired
}