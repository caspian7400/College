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
            const _doctorData = await axios.get(`http://localhost:3000/getDoctor/${account}`);
            setDoctorData(_doctorData);
            setNavItems([
                { name: "Dashboard", href: "/doctor/dashboard" },
                { name: "Patients", href: "/doctor/patients", state: _doctorData.patients }
            ]);
        }
        getDoctorData();
    }, [account]);
    return (
        <>
            {
                !navItems ?
                    <div>loading...</div>
                    :
                    <div>

                        <Header navItems={navItems} />
                        <div id="content" className="p-4 p-md-5">
                            <h2 className="mb-4">Content here</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum.</p>
                        </div>
                    </div>
            }
        </>

    )
}
