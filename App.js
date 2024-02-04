import { useState,useEffect } from'react';
import './App.js';
function App() {
    const [ipaddress,setIpaddress]=useState('');
    const [geoInfo,setgeoInfo]=useState({});

    useEffect(()=>{
        //invoke function to get IP address
        getvisitorIP();
    },[])

    //get the IP adress
    const getvisitorIP=async () =>{
        try{
            const response =await fetch('https://api.ipify.org');
            const data =await response.text();
            //store ip in state
            setIpaddress(data);
        }
        catch(error){
            console.error('Failed to fetch IP:', error);
        }
    };
    //update ip address by user input
    const handleInputChange = (e)=>{
        setIpaddress(e.target.value);
    };
    //use IP from state to get location Info
    const fetchIPInfo=async () => {
        try{
            const response = await fetch('https://tools.tracemyip.org');
            const data = await response.json();
            //store location Info in state
            setgeoInfo(data);
        }
        catch (error){
            console.error('Failed to location info:',error);
        }
    };
    return(
        <div className='APP'>
            <h3>IP to Location</h3>
            <div className='form-area'>
                <input type='text' value={ipaddress} onChange={handleInputChange}/>
                <button onClick={fetchIPInfo}>Get Info</button>
            </div>
        </div>
    )
}
export default App;