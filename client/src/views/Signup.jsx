import { useEffect, useState } from "react";
import { setPageTitle } from "../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    password: "",
  });
  useEffect(() => {
    setPageTitle("Signup - TinyTours");
  }, []);
  return (
    <div>
      <h1>Signup</h1>

      <div className="w-75 block mx-auto ">

      <Input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />

      <Input
        type="text"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />

      <Input
        type="text"
        placeholder="Mobile"
        value={newUser.mobile}
        onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
      />

      <Input
        type="text"
        placeholder="Country"
        value={newUser.country}
        onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
      />

      <Input
        type="text"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />

    <Button title="Signup" onClick={() => console.log(newUser)} />
      </div>

    </div>
  );
}

export default Signup;
