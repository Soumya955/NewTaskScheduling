import React, { useEffect, useState } from "react";
import CreateTaskModal from "../Modals/CreateTaskModal";
import "./Css-for-Components/Task.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import UpdateTaskModal from "../Modals/UpdateTaskModal";
import DeleteTaskModal from "../Modals/DeleteTaskModal";

const dayjs = require("dayjs");


export default function Task({sprintName}) {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  const [sendsingleitem,setsendsingleitem]=useState({})

  const [data, setdata] = useState([]);
  const formattedDate = dayjs(new Date()).format("ddd DD MMM YYYY");
  // console.log(sprintName)

  useEffect(()=>{
    handleGetData()
  },[sprintName])
  const handleGetData=()=>{
    axios.get('https://busy-coveralls-duck.cyclic.app/api/tasks')
        .then(response => {
          setdata( (sprintName==="All")?response.data:response.data.filter((el)=>el.sprint==sprintName))
        })
        .catch(error => {
          console.log(error);
        });
  }

  return (
    <>
      <div >
        <div className="taskNav" >
          <h3>{sprintName}</h3>
          <h4>{formattedDate}</h4>
        </div>
        <div className="taskContainer1">
         {data?.map((el)=><div className="taskcard" key={el._id}>
           <h3>Name: <span style={{color:"blue"}}>{el.name}</span></h3>
           <h5>Description:<span style={{color:"grey"}}>{el.description}</span></h5>
           <h4>Type:<span style={{color:"Highlight"}}>{el.type}</span></h4>
           <h4>Status:<span style={{color:"red"}}>{el.status}</span></h4>
           <h4>Sprint:<span style={{color:"green"}}>{el.sprint}</span></h4>
           <div>
             <FontAwesomeIcon onClick={()=>{setModalIsOpen2(true);setsendsingleitem(el)} }icon={faTrashAlt} style={{ color: 'red',float:"right",margin:"1rem"}} />
             <FontAwesomeIcon  onClick={()=>{setModalIsOpen1(true);setsendsingleitem(el)}} icon={faPencilAlt} style={{ color: 'blue',float:"right" ,margin:"1rem" }} />
             </div>
         </div>)}
        </div>
        <div className="taskAdd" onClick={()=>setModalIsOpen(true)} >
            + ADD New Task
        </div>
        

        <CreateTaskModal handleGetData={handleGetData} sprintName={sprintName} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        <UpdateTaskModal sendsingleitem={sendsingleitem}  handleGetData={handleGetData}  sprintName={sprintName} modalIsOpen={modalIsOpen1} setModalIsOpen={setModalIsOpen1} />
        <DeleteTaskModal  handleGetData={handleGetData} sendsingleitem={sendsingleitem}  modalIsOpen={modalIsOpen2} setModalIsOpen={setModalIsOpen2} />
      </div>
    </>
  );
}
