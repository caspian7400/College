import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MetamaskContext } from "../../App";
import axios from "axios";

export default function DoctorDashboard() {
    const [doctorData, setDoctorData] = useState();
    const [navItems, setNavItems] = useState();
    const account = useContext(MetamaskContext);
    useEffect(() => {
        if (!account) return;
        const getDoctorData = async () => {
            const response = await axios.get(`http://localhost:3000/doctor/get/${account}`);
            setDoctorData(response.data.doctor);
            setNavItems([
                { name: "Dashboard", href: "/doctor/dashboard" },
                { name: "Patients", href: "/doctor/patients" }
            ]);
        }
        getDoctorData();
    }, [account]);
    /************   TEST  *************/
    // const addDoctor = async () => {
    //     try{
    //         const response = await axios.post(`http://localhost:3000/doctor/addPatient/${doctorData.eth_addr}`, {eth_addr: "0x2b8066DA4c977e35097631394687baF6566B8B54"});
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    /*********************************/
    return (
        <>
            {
                !navItems ?
                    <div className="loading"></div>
                    :
                    <div>

                        <Header navItems={navItems} />
                        {
                            !doctorData ? <div></div>
                                :
                                <div id="content" className="p-4 p-md-5">
                                    {/* <Button onClick={addDoctor}>Add</Button> */}
                                    <h2 className="mb-4">Content here</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                        laborum.</p>
                                </div>
                        }
                    </div>
            }
        </>

    )
}
