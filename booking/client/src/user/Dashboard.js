import DashboardNav from '../components/DashboardNav'
import {Link} from 'react-router-dom';
import {userHotelBookings} from '../actions/hotel';
import {useSelector} from 'react-redux';
import {useState,useEffect} from "react";
  const Dashboard = () => {
 const {
     auth:{token},
    } = useSelector((state)=>({...state})) ; 
    const [booking,setBooking]  = useState([]);

     useEffect(()=>{
     loadUserBookings()
     },[])
     const loadUserBookings = async()=> {
      const res= await  userHotelBookings(token)
      console.log(res);    
      setBooking(res.data);    
     } ;

    
    return (
        <>
            <div className="container-fluid bg-info p-5 text-center">
                <h1>Dashboard</h1>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
               <div className="row">
               <div className="col-md-10">
               
               </div>
               <div className="col-md-2">
               <Link  to="/"className="btn btn-primary">Browse Hotels</Link>

               </div>

               </div>
            </div>
            <div className="row">
           
            </div>
        </>
    );
};

export default Dashboard;