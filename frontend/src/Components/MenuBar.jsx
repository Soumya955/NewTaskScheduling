import React, { useEffect, useState } from 'react'
import CreateSprintModal from '../Modals/CreateSprintModal';
import "./Css-for-Components/MenuBar.css"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteSprintModal from '../Modals/DeleteSprintModal';

export default function MenuBar({setSprintName,sprintName}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [sprints,setSprints]=useState([])
    const [sendsinglesprint,setsendsinglesprint]=useState("")

    const user=JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        handleGetSprintData()
    },[])

    const handleSprintName=(value)=>{
        setSprintName(value)
    }

    const handleGetSprintData=()=>{
        axios.get('https://busy-coveralls-duck.cyclic.app/api/sprints')
        .then(response => {
          setSprints(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
//console.log(sprints)
  return (
    <>
    <div className='menuContainer'>
        <div className='menuName'> <span>{user.firstname} {user.lastname}</span> </div>
        <div className='menuItems' style={{backgroundColor:(sprintName==="All")?"rgb(208, 202, 194)":"antiquewhite"}} onClick={()=>handleSprintName("All")}> <span>All</span> <span></span></div>
        <div className='menuItemsADD' onClick={()=>setModalIsOpen(true)} > <span> + Add New Sprint</span> </div>
        {sprints?.map((el,i)=><div className='menuItems' key={el._id} style={{backgroundColor:(sprintName===el.sprint)?"rgb(208, 202, 194)":"antiquewhite"}}  onClick={()=>handleSprintName(el.sprint)}> 
        <span>{el.sprint}</span>
         <span><FontAwesomeIcon onClick={()=>{setModalIsOpen2(true);setsendsinglesprint(el.sprint)} }icon={faTrashAlt} style={{ color: 'red',float:"right",margin:"0.3rem" }} /></span>
        </div>)}
    </div>
    <CreateSprintModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} handleGetSprintData={handleGetSprintData}/>
    <DeleteSprintModal setSprintName={setSprintName} sendsinglesprint={sendsinglesprint}  modalIsOpen={modalIsOpen2} setModalIsOpen={setModalIsOpen2} handleGetSprintData={handleGetSprintData}/>
    </>
  )
}
