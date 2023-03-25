import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Css-for-Modals/UpdateTaskModal.css"
import axios from "axios";


export default function UpdateTaskModal({sendsingleitem,modalIsOpen,sprintName, setModalIsOpen,handleGetData}) {


  
   const [sprints,setSprints]=useState([])

   useEffect(()=>{
setTaskName(sendsingleitem.name)
setTaskAssignee(sendsingleitem.assignee)
setTaskDescription(sendsingleitem.description)
setTaskSprint(sendsingleitem.sprint)
setTaskStatus(sendsingleitem.status)
setTaskType(sendsingleitem.type)
   },[sendsingleitem])

    console.log(sendsingleitem,"sdddd")
   const [taskName,setTaskName]=useState("");
   const [taskDescription,setTaskDescription]=useState("");
   const [taskType,setTaskType]=useState("");
   const [taskAssignee,setTaskAssignee]=useState("");
   const [taskSprint,setTaskSprint]=useState("")
   const [taskStatus,setTaskStatus]=useState("")
   
  
   //console.log(sendsingleitem.name,taskAssignee,taskDescription,taskSprint,taskStatus,taskType)

   useEffect(()=>{
       handleGetSprintData()
   },[])

   const handleGetSprintData=()=>{
       axios.get('http://localhost:8080/api/sprints')
       .then(response => {
         setSprints(response.data);
       })
       .catch(error => {
         console.log(error);
       });
   }

   const handleClick=()=>{
   
    if(taskName&&taskAssignee&&taskDescription&&taskSprint&&taskStatus&&taskType){
      let txt=""+taskName[0].toLocaleUpperCase()+taskName.slice(1,taskName.length).toLocaleLowerCase()
   

    axios.patch(`http://localhost:8080/api/tasks/${sendsingleitem._id}`, {
        name: txt,
        description: taskDescription,
        type: taskType, 
        assignee: taskAssignee,
        sprint:taskSprint,
        status:taskStatus,
          })
      .then(response => {
        handleGetData()
      })
      .catch(error => {
        console.log(error);
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
      <h3>Edit the Task here</h3>
      <input value={taskName} placeholder={"Task Name"} onChange={(e)=>setTaskName(e.target.value)} type="text" />
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
        {sprints.map((el)=><option value={el.sprint}>{el.sprint}</option>)}
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
