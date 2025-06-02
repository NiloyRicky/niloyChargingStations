import React from 'react'

function AddStation({isAddModalOpen,setIsAddModalOpen,formData,setFormData,fetchAllStations}) {


    const handleAddStation=async()=>{
        const res=await fetch("http://localhost:8000/createStation",{
            method:"POST",
            credentials:"include",
            headers: {
  "Content-Type": "application/json",
},
            body:JSON.stringify(formData)
        })
      const data=await res.json(); 
  await  fetchAllStations();
      setIsAddModalOpen(false);

    }
  return (
    <div>
        {isAddModalOpen &&(
<div className="modal-backdrop">
    <div className="modal-content">
      <h2>Add Charging Station</h2>
      <input required
        type="text"
        value={formData?.name ||""} /* here u will get undefined bcoz formData.name was accessed before formData was fully initialized */
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input required
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
      <input required
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
      <input required
        type="text"
        value={formData?.status ||""}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        placeholder="Status"
      />
      <input required
        type="text"
        value={formData?.power ||""}
        onChange={(e) => setFormData({ ...formData, power: e.target.value })}
        placeholder="Power"
      />
      <input required
        type="text"
        value={formData?.connector ||""}
        onChange={(e) => setFormData({ ...formData, connector: e.target.value })}
        placeholder="Connector"
      />
      <button onClick={handleAddStation}>Done</button>
      <button onClick={() => setIsAddModalOpen(false)}>Close</button>
    </div>
  </div>
        )}
    </div>
  )
}

export default AddStation