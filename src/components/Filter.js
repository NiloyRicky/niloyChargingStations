import React from 'react'

function Filter({filters,setFilters,stations,setStations,setFilteredStations,fetchAllStations}) {
    
    
    const filteringStations=()=>{

        const filteredData=stations.filter((station)=>{
            return(
                (filters.status==="" || station.status===filters.status) &&
                (filters.power==="" || Number(station.power)===Number(filters.power)) &&
                (filters.connector==="" || station.connector===filters.connector)

            )
        })
       
        setFilteredStations(filteredData);
        console.log(filteredData)
    }
    const resetFilters=()=>{
        setFilters({
            status:"",
            power:"",
            connector:""
        });
        fetchAllStations();
    }
  return (
    <div className='filter-container'>
        <select onChange={(e)=>setFilters({...filters,status:e.target.value})}>
<option value="">Status</option>
<option value="Active">Active</option>
<option value="Inactive">Inactive</option>
        </select>
        <input type="number" placeholder='Power' 
        onChange={(e)=>setFilters({...filters,power:e.target.value})}/>
    <select onChange={(e)=>setFilters({...filters,connector:e.target.value})}>
    <option value="">All connectors</option>
<option value="Type1">Type1</option>
<option value="Type2">Type2</option>
<option value="CCS">CCS</option>
    </select>
 <button onClick={filteringStations}>Apply</button>
  <button onClick={resetFilters}>Reset</button>
    </div>
  )
}

export default Filter