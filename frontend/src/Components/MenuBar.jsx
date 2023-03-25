import React, { useEffect, useState } from 'react'
import CreateSprintModal from '../Modals/CreateSprintModal';
import "./Css-for-Components/MenuBar.css"
import axios from 'axios';

export default function MenuBar({setSprintName,sprintName}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sprints,setSprints]=useState([])

    useEffect(()=>{
        handleGetSprintData()
    },[])

    const handleSprintName=(value)=>{
        setSprintName(value)
    }

    const handleGetSprintData=()=>{
        axios.get('http://localhost:8080/api/sprints')
        .then(response => {
          setSprints(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
console.log(sprints)
  return (
    <>
    <div>
        <div className='menuName'> <span>Name</span> </div>
        <div className='menuItems' style={{backgroundColor:(sprintName==="All")?"rgb(208, 202, 194)":"antiquewhite"}} onClick={()=>handleSprintName("All")}> <span>All</span> <span></span></div>
        <div className='menuItemsADD' onClick={()=>setModalIsOpen(true)} > <span> + Add New Sprint</span> </div>
        {sprints?.map((el)=><div className='menuItems'  style={{backgroundColor:(sprintName===el.sprint)?"rgb(208, 202, 194)":"antiquewhite"}}  onClick={()=>handleSprintName(el.sprint)}> 
        <span>{el.sprint}</span> <span></span>
        </div>)}
    </div>
    <CreateSprintModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} handleGetSprintData={handleGetSprintData}/>
    </>
  )
}
