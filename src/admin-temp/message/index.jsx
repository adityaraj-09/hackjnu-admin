import { useEffect, useState } from "react";
import "./message.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const baseurl="https://hackjnu.onrender.com"
export default function Message() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState({sender:"Please Select a Message",message:""});
    useEffect(() => {
        const getData = async () => {
            await fetch(baseurl+"/messages",{
                headers:{
                    Authorization: `Bearer ${Cookies.get('autho')}`
                }
            }).then(res => {
                if(res.status === 200){
                    return res.json();
                }
                else if(res.status===403){
                  navigate('/signin')
                  return null
                }
                else{
                    console.log(res.err);
                    return null
                }
            }).then((res) => {
                if(res){
                setData(res);
                setLoading(false);}
            });
        }
        getData();
    }, []);
    return(<>
    {loading?<Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>:
    <div className="message">
        <div className="content">
        <div className="catalog">
            <h1>Message</h1>
            {
                data.map((item) => {
                    return (
                        <div className="ele">
                            <div>
                                <div className="name">{item.owner[0]}</div>
                                <div className="detail">
                                    <div className="empid">{item.sender}</div>
                                    <div className="empid">{item.type}</div>
                                </div>
                            </div>
                            <button className="mbutton" onClick={()=>{setMessage({sender:item.owner[0],message:item.body})}}>Message</button>
                        </div>
                    )
                })
            }
        </div> 
        <div className="messagebox">
            <div className="header">
                <div className="photoo"></div>
                <div className="namee">{message.sender}</div>
            </div>
            <div className="linee">
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
                {message.message}
            </Typography>
            </div>
        </div>
    </div>
    </div>}</>)
}