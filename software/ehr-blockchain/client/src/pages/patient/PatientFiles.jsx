//need cids of all the files associated with this account
import { useState } from "react"
import Header from "../../components/Header"
import { Web3Storage, getFilesFromPath } from "web3.storage";

export default function PatientFiles() {
    const [files, setFiles] = useState();
    // const client = new Web3Storage({ token: env.WEB3_STORAGE_TOKEN });
    return (
        <>
            <Header />
            {
                /*
                file component with file name
                */
            }
        </>
    )
}
