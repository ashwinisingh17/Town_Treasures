import React, { useState, useEffect, useContext } from "react";
import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/hero.png";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

function Hero() {
  const [modal, setModal] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  const stateCitiesMap = {
    "Andaman & Nicobar": [
      "Port Blair",
      "Diglipur",
      "Mayabunder",
      "Rangat",
      "Billyground",
      "Bombooflat",
      "Garacharma",
      "Hut Bay",
      "Bamboo Flat",
      "Neil Island",
    ],
    "Andhra Pradesh": [
      "Amaravati",
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
      "Rajamahendravaram",
      "Kadapa",
      "Tirupati",
      "Anantapur",
    ],
    "Arunachal Pradesh": [
      "Itanagar",
      "Naharlagun",
      "Tawang",
      "Pasighat",
      "Ziro",
      "Bomdila",
      "Along",
      "Tezu",
      "Khonsa",
      "Daporijo",
    ],
    "Assam": [
      "Dispur",
      "Guwahati",
      "Silchar",
      "Jorhat",
      "Dibrugarh",
      "Tezpur",
      "Mangaldoi",
      "Nagaon",
      "Mariani",
      "Golaghat",
    ],
    "Bihar": [
      "Patna",
      "Gaya",
      "Muzaffarpur",
      "Bhagalpur",
      "Darbhanga",
      "Purnia",
      "Arrah",
      "Chapra",
      "Begusarai",
      "Munger",
    ],
    "Chhattisgarh": [
      "Raipur",
      "Bilaspur",
      "Raigarh",
      "Korba",
      "Durg",
      "Bhilai Nagar",
      "Rajnandgaon",
      "Kawardha",
      "Jagdalpur",
      "Ambikapur",
    ],
    "Dadra & Nagar Haveli and Daman & Diu": [
      "Silvassa",
      "Daman",
      "Diu",
    ],
    "Delhi": [
      "New Delhi",
      "West Delhi",
      "South Delhi",
      "East Delhi",
      "North Delhi",
      "Central Delhi",
    ],
    "Goa": [
      "Panaji",
      "Margao",
      "Vasco da Gama",
      "Mapusa",
      "Ponda",
      "Valpoi",
      "Bicholim",
      "Quepem",
      "Pernem",
      "Mormugao",
    ],
    "Gujarat": [
      "Gandhinagar",
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Anand",
      "Mehsana",
    ],
    "Haryana": [
      "Chandigarh",
      "Faridabad",
      "Gurugram",
      "Ambala",
      "Karnal",
      "Hisar",
      "Rohtak",
      "Sonipat",
      "Panipat",
      "Kurukshetra",
    ],
    "Himachal Pradesh": [
      "Shimla",
      "Mandi",
      "Solan",
      "Chamba",
      "Sirmaur",
      "Kinnaur",
      "Lahaul and Spiti",
      "Kullu",
      "Una",
      "Bilaspur",
    ],
    "Jammu & Kashmir": [
      "Srinagar",
      "Jammu",
      "Udhampur",
      "Anantnag",
      "Baramulla",
      "Kulgam",
      "Shopian",
      "Kupwara",
      "Pulwama",
      "Ganderbal",
    ],
    "Jharkhand": [
      "Ranchi",
      "Jamshedpur",
      "Hazaribagh",
      "Dhanbad",
      "Bokaro",
      "Giridih",
      "Palamu",
      "Chatra",
      "Khunti",
      "Simdega",
    ],
    "Karnataka": [
      "Bengaluru",
      "Mysuru",
      "Hubballi-Dharwad",
      "Mangaluru",
      "Gulbarga",
      "Belagavi",
      "Davangere",
      "Shivamogga",
      "Vijayapura",
      "Bidar",
    ],
    "Kerala": [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Kollam",
      "Thrissur",
      "Kannur",
      "Alappuzha",
      "Kottayam",
      "Malappuram",
      "Palakkad",
    ],
    "Ladakh": [
      "Leh",
      "Kargil",
    ],
    "Lakshadweep": [
      "Kavaratti",
      "Amini",
      "Kadmat",
      "Agatti",
      "Kalpeni",
    ],
    " Madhya Pradesh": [
      "Bhopal",
      "Indore",
      "Jabalpur",
      "Gwalior",
      "Ujjain",
      "Sagar",
      "Satna",
      "Dewas",
      "Rewa",
      "Chhindwara",
    ],
    "Maharashtra": [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Solapur",
      "Thane",
      "Kolhapur",
      "Amravati",
      "Navi Mumbai",
    ],
    "Manipur": [
      "Imphal",
      "Bishnupur",
      "Thoubal",
      "Churachandpur",
      "Tamenglong",
      "Ukhrul",
      "Imphal East",
    ],
    "Meghalaya": [
      "Shillong",
      "Jowai",
      "Nongstoin",
      "Tura",
      "Williamnagar",
      "East Jaintia Hills",
      "South West Khasi Hills",
      "Ri Bhoi",
      "West Jaintia Hills",
    ],
    "Mizoram": [
      "Aizawl",
      "Lunglei",
      "Saiha",
      "Kolasib",
      "Champhai",
      "Serchhip",
      "Mamit",
    ],
    "Nagaland": [
      "Kohima",
      "Dimapur",
      "Mokokchung",
      "Zunheboto",
      "Wokha",
      "Mon",
      "Tuensang",
      "Longleng",
      "Kiphire",
      "Phek",
    ],
    "Odisha": [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Baleswar",
      "Bhadrak",
      "Sambalpur",
      "Puri",
      "Balasore",
      "Angul",
      "Kendrapara",
    ],
    "Puducherry": [
      "Pondicherry",
      "Karaikal",
      "Mahe",
      "Yanaon",
    ],
    "Punjab": [
      "Chandigarh",
      "Amritsar",
      "Jalandhar",
      "Ludhiana",
      "Patiala",
      "Bathinda",
      "Mohali",
      "Firozpur",
      "Gurdaspur",
      "Hoshiarpur",
    ],
    "Rajasthan": [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Bikaner",
      "Ajmer",
      "Bikaner",
      "Jaisalmer",
      "Jodhpur",
      "Kota",
    ],
    "Sikkim": [
      "Gangtok",
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tirunelveli",
      "Kanchipuram",
      "Nellai",
      "Thoothukudi",
      "Erode",
    ],
    "Telangana": [
      "Hyderabad",
      "Warangal",
      "Karimnagar",
      "Nizamabad",
      "Ranga Reddy",
      "Medak",
      "Mahabubnagar",
      "Adilabad",
      "Khammam",
      "Nalgonda",
    ],
    "Tripura": [
      "Agartala",
      "Kailashahar",
      "Old Tripura",
      "Dharmanagar",
      "South Tripura",
      "West Tripura",
      "Gomati Tripura",
    ],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Ghaziabad",
      "Varanasi",
      "Agra",
      "Meerut",
      "Allahabad",
      "Bareilly",
      "Saharanpur",
      "Noida",
    ],
    "Uttarakhand": [
      "Dehradun",
      "Haridwar",
      "Rishikesh",
      "Nainital",
      "Udham Singh Nagar",
      "Pauri Garhwal",
      "Almora",
      "Pithoragarh",
      "Champawat",
      "Bageshwar",
    ],
    "West Bengal": [
      "Kolkata",
      "Howrah",
      "Asansol",
      "Durgapur",
      "Siliguri",
      "Bardhaman",
      "North 24 Parganas",
      "Nadia",
      "South 24 Parganas",
      "Jalpaiguri",
    ],
  
  };
  
  

  const handleStateChange = (e) => {
   formData.state=e.target.value;
   setSelectedState(e.target.value);
   setCities(stateCitiesMap[e.target.value]);
  };

  const handleCityChange = (e) => {
    formData.city=e.target.value
    setSelectedCity(e.target.value);
    // console.log(first)
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  const [formData, setformData] = useState({
    
   checkin:'',
   checkout:"",
   state:"",
   city:""
  });
const [isLoading,setIsLoading]=useState(false)

  function changeHandler(event) {
    // console.log(event)
    setformData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    console.log(formData)
  }

const{backendUrl}=useContext(AppContext)
  const submit=async(e)=>{
e.preventDefault()
if(formData.state.trim()==''||formData.city.trim()==''||formData.checkin.trim()==''||formData.checkout.trim()==''){
  toast.error("Please enter some details")
}
if(isLoading){
  toast.error("Please wait ...")
  return
}
setIsLoading(true)
   await axios.post(backendUrl+"/booking",formData)
    .then((res)=>{console.log(res)
      toast.success(res.data)
      handleModalOpen()
    })
    .catch((e)=>toast.error("something went wrong please try again later4"))
    setIsLoading(false)
  }

  return (
    <div className={Classes.hero}>
      <div className={Classes.container}>
        <h1>Welcome To India</h1>

        <section id="hero" className={Classes.heroContainer}>
          <div className={Classes.heroimage}>
            <img src={Banner} alt="" />
          </div>

          <div className={Classes.content}>
            <div className={Classes.title}>
              <h1>
                Travel & Explore With{" "}
                <span className={Classes.nickName}>Town Treasures</span>
              </h1>
              <p>
                Save at least 15% on stays across the length and breadth of the
                country, from relaxing retreats to off-grid adventures
              </p>
            </div>

            <div className={Classes.bookingContainer}>
              <div className={Classes.bookingFields}>
                {/* State selection */}
                <select value={selectedState} onChange={(e)=>handleStateChange(e)}>
                  <option value="">Select State</option>
                  {Object.keys(stateCitiesMap).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                {/* City selection */}
                <select  onChange={(e)=>handleCityChange(e)} >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className={Classes.bookingFields} style={{display:'flex'}}> 
                {/* Check-in and Check-out */}
                <div className={Classes.search}>
                  <label>Check in</label>
                  <input type="date" name="checkin"  onChange={(e)=>changeHandler(e)}/>
                </div>

                <div className={Classes.search}>
                  <label>Check out</label>
                  <input type="date"  name="checkout" onChange={(e)=>changeHandler(e)}/>
                </div>
              </div>

              <button onClick={(e)=>submit(e)}>{isLoading ? "Please wait ...":"Book Now"}</button>
            </div>
          </div>
        </section>
      </div>

      {/* Modal with "We Received Your Information" message */}
      {modal && (
        <div className={Classes.modal}>
          <div className={Classes.modalContainer}>
            <h5>We Received Your Information</h5>
            <button onClick={() => setModal(false)}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
