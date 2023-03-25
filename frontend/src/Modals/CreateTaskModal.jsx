import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Css-for-Modals/CreateTaskModal.css"
import axios from "axios";
import Swal from 'sweetalert2'


export default function CreateTaskModal({modalIsOpen,sprintName, setModalIsOpen,handleGetData}) {


  
   const [sprints,setSprints]=useState([])


   const [taskName,setTaskName]=useState("");
   const [taskDescription,setTaskDescription]=useState("");
   const [taskType,setTaskType]=useState("");
   const [taskAssignee,setTaskAssignee]=useState("");
   const [taskSprint,setTaskSprint]=useState(sprintName)
   const [taskStatus,setTaskStatus]=useState("")
   
  


   useEffect(()=>{
       handleGetSprintData()
   },[])

   const handleGetSprintData=()=>{
       axios.get('https://busy-coveralls-duck.cyclic.app/api/sprints')
       .then(response => {
         setSprints(response.data);
       })
       .catch(error => {
         console.log(error);
       });
   }

   const handleClick=()=>{
   // console.log(taskName,taskAssignee,taskDescription,taskSprint,taskStatus,taskType)
    if(taskName&&taskAssignee&&taskDescription&&taskSprint&&taskStatus&&taskType){
      let txt=""+taskName[0].toLocaleUpperCase()+taskName.slice(1,taskName.length).toLocaleLowerCase()
    //console.log(txt)
      axios.post('https://busy-coveralls-duck.cyclic.app/api/tasks', {
    name: txt,
    description: taskDescription,
    type: taskType, // can be bug, feature or story
    assignee: taskAssignee,
    sprint:taskSprint,
    status:taskStatus,
      })
      .then(response => {
        handleGetData()
        Swal.fire({
          title: 'Added!',
          text: 'Task added .',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch(error => {
        console.log(error);
      });

    }else{
      Swal.fire({
        title: 'warning!',
        text: 'You have not filled data corectly.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
   }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        className="Modal"
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
      <h3>Add New Task</h3>
      <input  value={taskName} placeholder={"Task Name"} onChange={(e)=>setTaskName(e.target.value)} type="text" />
      <input value={taskDescription} placeholder={"Description"} onChange={(e)=>setTaskDescription(e.target.value)} type="text" />
       <select value={taskType}  onChange={(e)=>setTaskType(e.target.value)}  name="" id="">
        <option value="">Select Type</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
        <option value="strory">Story</option>
       </select>
       <input value={taskAssignee} placeholder={"Assignee"} onChange={(e)=>setTaskAssignee(e.target.value)} type="text" />
       
       <select value={taskStatus}  onChange={(e)=>setTaskStatus(e.target.value)} name="" id="">
        <option value="">Select Status</option>
        <option value="to-do">To-do</option>
        <option value="in-progress">In-progress</option>
        <option value="done">Done</option>
       </select>
       <select value={taskSprint}  onChange={(e)=>setTaskSprint(e.target.value)}>
        <option >Select Type</option>
        {sprints.map((el,i)=><option key={el+i} value={el.sprint}>{el.sprint}</option>)}
       </select>
        <button className="add" onClick={() => {
            setModalIsOpen(false);
            handleClick();
          }}> ADD </button>
          <button className="cancel" onClick={()=>setModalIsOpen(false)}>Cancel</button>
      </Modal>
      
    </>
  );
}
