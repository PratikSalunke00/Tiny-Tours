import { useEffect } from 'react'
import { setPageTitle } from "../utils.jsx";


function NewTour() {
    useEffect(() => {
      setPageTitle("Add Tour - TinyTours");
      }, []);
  return (
    <div>
      xfn
    </div>
  )
}

export default NewTour
