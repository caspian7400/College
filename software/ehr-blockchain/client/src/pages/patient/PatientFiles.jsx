//need cids of all the files associated with this account
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import File from "../../components/File";
import useContract from "../../../utils/useContract";
import { Web3Storage } from "web3.storage";
import axios from "axios";

export default function PatientFiles() {
    const [fileDetails, setFileDetails] = useState([]);
    const { account, contract } = useContract();
    const navItems = [
        { name: "Dashboard", href: "/patient/dashboard", state: null },
        { name: "Files", href: "/patient/files", state: null }
    ]
    useEffect(() => {
        if (!(contract && account)) return;

        const getFiles = async () => {
            const response = await axios.get("http://localhost:3000/token/get");
            const client = new Web3Storage({ token: response.data.token })
            const cidArray = await contract.methods.getPatientFiles(account).call({ from: account });
            const _fileDetails = await Promise.all(cidArray.map(async (item) => {
                console.log(item);
                const res = await client.get(item);
                const files = await res.files();
                return { cid: files[0].cid, name: files[0].name };
            }));
            console.log(_fileDetails);
            setFileDetails(_fileDetails);
        }
        getFiles();
    }, [contract, account]);
    return (
        <>
            <Header navItems={navItems} />
            {
                fileDetails.length === 0 ?
                    <div>loading...</div>
                    :
                    <Container fluid className="d-flex flex-column">
                        {
                            fileDetails.map((item, idx) => {
                                console.log(item);
                                return (
                                    <Container key={idx} className="zoom my-2 p-3">
                                        <File file={item} />
                                    </Container>
                                )
                            })
                        }
                    </Container>
            }
        </>
    )
}
