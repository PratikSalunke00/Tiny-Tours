import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { getUserJwtToken } from "../utils";
import imgNewTour from "../assets/new-tour.png";

function Dashboard() {
  const [tours, setTours] = useState([]);

  const loadTours = async () => {
    const userJwt = getUserJwtToken();

    const response = await axios.get("http://localhost:8080/tours", {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
    });

    if (response.data.success) {
      toast.success(response.data.message);
      setTours(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div>
      <Navbar />
      <h1> Dashboard</h1>
      
      <Link to="/tours/new">
        <img
          src={imgNewTour}
          alt="Add New Tour"
          className="fixed bottom-10 right-10 h-10 cursor-pointer"
        />
      </Link>
 
{tours.map((tourItem , index) =>{
  return <TourCard key={index} />;

})}

      <Toaster />
    </div>
  );
}

export default Dashboard;
