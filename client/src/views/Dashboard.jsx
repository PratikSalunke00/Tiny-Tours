import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { getUserJwtToken } from "../utils";

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
      Dashboard
      <Toaster />
    </div>
  );
}

export default Dashboard;