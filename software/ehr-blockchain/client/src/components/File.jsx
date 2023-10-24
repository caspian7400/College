import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import react from "react"

export default function File({fileDetails}) {
    return (
        <Container fluid>
            <Link to={/*link to pdf file*/""}>
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
    fileDetails: react.propTypes.object.isRequired
}