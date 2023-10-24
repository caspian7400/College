//need cids of all the files associated with this account
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import File from "../../components/File";
import axios from "axios"

export default function PatientFiles() {
    const [files, setFiles] = useState();
    useEffect(() => {
        const getFileDetails = async () => {
            const response = await axios.get("localhost:3000/");
            console.log(response);
        }
        getFileDetails();
    }, [])
    return (
        <>
            <Header />
            {
                files.map((item, idx) => {
                    <File key={idx} fileDetails={item}></File>
                })
            }
        </>
    )
}
