import { useEffect, useState } from "react";
import { setPageTitle, getUserJwtToken } from "../utils.jsx";
import Navbar from "../components/Navbar";
import Button from "../components/Button.jsx";
import Input from "../components/Input";
import MultiSelect from "../components/MultiSelect.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function NewTour() {
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const addTour = async () => {
    const response = await axios.post("http://localhost:8080/tours", newTour, {
      headers: {
        Authorization: `Bearer ${getUserJwtToken()}`,
      },
    });
    console.log(response.data);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    setPageTitle("Add Tour - TinyTours");
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Add new tour</h1>

      <div className="w-80 block mx-auto mt-10">
        <Input
          type={"text"}
          placeholder={"Enter Title"}
          value={newTour.title}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              title: e.target.value,
            });
          }}
        />
        <Input
          type={"text"}
          placeholder={"Enter Description"}
          value={newTour.description}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              title: e.target.value,
            });
          }}
        />
        <MultiSelect
          selectedItems={newTour.cities}
          placeholder={"Enter City"}
          onAddItem={(val) => {
            setNewTour({
              ...newTour,
              cities: [...newTour.cities, val],
            });
          }}
          onRemoveItem={(val) => {
            setNewTour({
              ...newTour,
              cities: newTour.cities.filter((city) => city !== val),
            });
          }}
        />

        <Input
          type={"date"}
          placeholder={"Enter Start Date"}
          value={newTour.startDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              startDate: e.target.value,
            });
          }}
        />

        <Input
          type={"date"}
          placeholder={"Enter End Date"}
          value={newTour.endDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              endDate: e.target.value,
            });
          }}
        />
      </div>

      <div className="w-80 block mx-auto mt-10">
        <Button title="Add Tour" onClick={addTour} />
      </div>
      <Toaster />
    </div>
  );
}

export default NewTour;
