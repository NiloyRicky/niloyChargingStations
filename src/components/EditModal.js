import React from 'react'

function EditModal({isModalOpen,formData,setFormData,setIsModalOpen,currentStation,fetchAllStations}) {






const handleUpdate=async()=>{
 try {
  const res=await fetch(`http://localhost:8000/updateStation/${currentStation}`,
  {
    method:"PUT",
    credentials:"include",
    headers: {
          "Content-Type": "application/json"
        },
    body:JSON.stringify(formData) //isse body ko backebd use krta ha as req.body
  }
 );
 const data=await res.json();
 //setFormData(data.updateStation);
 fetchAllStations();
 setIsModalOpen(false);
  
 } catch (error) {
  console.log(error)
 }
}

  return (
    <div>
        {isModalOpen && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>Edit Station</h2>
      <input
        type="text"
        value={formData?.name ||""} /* here u will get undefined bcoz formData.name was accessed before formData was fully initialized */
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={formData?.location?.latitude ||""}
        onChange={(e) =>
          setFormData({
            ...formData,
            location: { ...formData.location, latitude: e.target.value }
          })
        }
        placeholder="Latitude"
      />
      <input
        type="text"
        value={formData?.location?.longitude ||""}
        onChange={(e) =>
          setFormData({
            ...formData,
            location: { ...formData.location, longitude: e.target.value }
          })
        }
        placeholder="Longitude"
      />
      <input
        type="text"
        value={formData?.status ||""}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        placeholder="Status"
      />
      <input
        type="text"
        value={formData?.power ||""}
        onChange={(e) => setFormData({ ...formData, power: e.target.value })}
        placeholder="Power"
      />
      <input
        type="text"
        value={formData?.connector ||""}
        onChange={(e) => setFormData({ ...formData, connector: e.target.value })}
        placeholder="Connector"
      />
      <button onClick={handleUpdate}>Done</button>
      <button onClick={() => setIsModalOpen(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  )
}

export default EditModal