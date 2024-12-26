import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";


function App() {



  return (
    <div className='text-blue-700'>
 

    <Routes>
    <Route path="*" element={<Error404 />} />

        <Route path="/" element={<Home/>} />
     
      </Routes>


    </div>
  )
}

export default App
