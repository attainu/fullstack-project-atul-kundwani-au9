import React ,{useState,useEffect} from 'react'
import {useStore} from "react-redux";
import { read,diffDays} from "../actions/hotel";
import moment from 'moment';
import {useSelector} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

const ViewHotel = ({match,history}) =>{
    const [hotel,setHotel] = useState({});
    const [image,setImage] = useState("")

    const {auth} =useSelector((state)=>({...state}));   

    useEffect(()=>{
    loadSellerHotel();
    },[])
    const loadSellerHotel = async () => {
        let res = await read(match.params.hotelId);
        // console.log(res);
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
      };
      

    const handleClick = (e) =>{
        e.preventDefault()
        if(!auth) history.push('/login')
        console.log('') 
    }
    
    function handleToken(token, addresses) {
      console.log({ token, addresses })
    }
    
    return(
        <>
        <div className="container-fluid bg-info p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-6">
      <br/>
      <img src={image}  alt= {hotel.title} className="img img-fluid m-2"/>
       </div>
       <div className="colmd-6">
       <br/>
       <b>{hotel.content}</b>
       <p className="alert alert-info mt-3">INR{hotel.price}</p>
       <p className="card-text">
     <span className="float-right text-primary">
     for {diffDays(hotel.starDate,hotel.enDate)} {" "}   
      {diffDays(hotel.starDate,hotel.enDate) <=1? 'day':'days'}
     </span>
     </p>
     <p>
     From  <br/>{" "}
     {moment(new Date(hotel.starDate)).format('MMMM Do YYYY,h:mm:ss a')}
     </p>
     <p>
     To <br/>{" "}
     {moment(new Date(hotel.enDate)).format('MMMM Do YYYY,h:mm:ss a')}
     </p>

   
        <button onClick ={handleClick} className="btn btn-block btn-lg  btn-primary mt-3">        
        {auth && auth.token? 'Book Now':'Login to Book'}
        <StripeCheckout
          stripeKey="pk_test_51Ia2LNSDOwdRoCaIrpFNgK88c9lBf6RYDhpU7XmQAWr3V6KJDIDre6PjeB9eWpJ9wunO6tbbIqIhKqoQOZcXMFRp00qV1vKxrx"
          token={handleToken}
           
        />
        </button>
        
        
       </div>
      </div>
      </div>
        </>
    )
    }


export default ViewHotel;