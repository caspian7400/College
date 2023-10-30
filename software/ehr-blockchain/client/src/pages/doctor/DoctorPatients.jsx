import useContract from '../../../utils/useContract';
// import { useState } from 'react';

export default function DoctorPatients() {
    const { account, contract } = useContract();
    console.log(account, contract);
    return (
        <div></div>
    )
}
