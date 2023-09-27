import { useState, useEffect } from 'react'

export default function Test() {
    const [count, setCount] = useState(null);
    useEffect(()=>{
        if(count) return;
        setCount(0);
        console.log(count);
    },[count]);
    return (
        <div>{count}</div>
    )
}
