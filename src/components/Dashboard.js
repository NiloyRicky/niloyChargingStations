import React, { useEffect,useState } from 'react'
import "../App.css"
import EditModal from './EditModal';
import AddStation from './AddStation';
import Filter from './Filter';
import MapView from '../MapView';
function Dashboard() {
    const[stations,setStations]=useState([]);
     const[filteredStations,setFilteredStations]=useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
        const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [currentStation, setCurrentStation] = useState(null);
const [formData, setFormData] = useState({
  name: '',
  location: { latitude: '', longitude: '' },
  status: '',
  power: '',
  connector: ''
});
const[filters,setFilters]=useState({
  status:"",
  power:"",
  connector:""
    })


//defining all stations to reender in ui
const fetchAllStations=async()=>{
          try {
               const res= await fetch("http://localhost:8000/readStation",{
                credentials:"include" //important for cookies
               });
        const data=await res.json();
        setStations(data.allStations);
        setFilteredStations(data.allStations)//for rendering filteredStations
        console.log(data.allStations);
            
          } catch (error) {
            console.log(error)
          }
        }


    useEffect(()=>{
        
        fetchAllStations();
       
    },[])

//deleting charger station
const handleDelete=async(id)=>{
    await fetch(`http://localhost:8000/deleteStation/${id}`,{
        method:"DELETE",
        credentials:"include"
    });
    setFilteredStations(filteredStations.filter((station)=>{
return(station._id!==id)
    }))

}

//Editing a charger station
const handleEdit=(singleStation)=>{
  try {setFormData(singleStation)
      setIsModalOpen(true);
      setCurrentStation(singleStation._id)
    
  } catch (error) {
    console.log(error)
  }

}

//Adding a charging station
const handleAdd=()=>{
  setFormData({
     name: '',
  location: { latitude: '', longitude: '' },
  status: '',
  power: '',
  connector: ''
  })
setIsAddModalOpen(true);

}

  return (
    <div className='container'>
      <div className='dashboard'>
       <div className='add-filter'>
         <h2 className="heading">Charging Stations</h2>
        <button onClick={handleAdd}>Add+</button>
        <Filter filters={filters} setFilters={setFilters} stations={stations} setStations={setStations}
        filteredStations={filteredStations} setFilteredStations={setFilteredStations}
        fetchAllStations={fetchAllStations}/>
       </div>
      <table  className="table" border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Connector</th>
            <th>Status</th>
            <th>Power</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
             {filteredStations.length === 0 ? <tr>
      <td colSpan="7" style={{ textAlign: "center" }}>No data found</td>
    </tr>
             :filteredStations.map((station)=>{
            let{name,location,connector,status,power}=station;
           return(
            <tr key={station._id}>
                
             <td>{name}</td>
            <td>{location.latitude}</td>
              <td>{location.longitude}</td>
               <td>{connector}</td>
               <td>{status}</td>
            <td>{power} </td>
            <td>
                <button className='editBtn' onClick={()=>handleEdit(station)}>Edit</button>{" "}
                <button className='deleteBtn' onClick={()=>handleDelete(station._id)}>Delete</button>
            </td>
            </tr>
           )


        })
      }
        </tbody>
       </table>
<EditModal isModalOpen={isModalOpen} formData={formData}
    currentStation={currentStation} setCurrentStation={setCurrentStation}
    setFormData={setFormData} setIsModalOpen={setIsModalOpen}
    fetchAllStations={fetchAllStations}/>

    <AddStation isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}
    formData={formData} setFormData={setFormData}
    fetchAllStations={fetchAllStations}/>
    </div>
    <div className='map'>
      <MapView stations={filteredStations}/>
    </div>
    
    </div>
  )
}

export default Dashboard