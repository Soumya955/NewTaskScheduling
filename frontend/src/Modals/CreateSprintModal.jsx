import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Css-for-Modals/CreateSprintModal.css"
import axios from "axios";


export default function CreateSprintModal({modalIsOpen, setModalIsOpen,handleGetSprintData}) {


   const [text,setText]=useState("")

   const handleClick=()=>{
    if(text){
      let txt=""+text[0].toLocaleUpperCase()+text.slice(1,text.length).toLocaleLowerCase()
      axios.post('http://localhost:8080/api/sprints', {sprint:txt})
      .then(response => {
        handleGetSprintData()
        setText("")
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
        className="Modal1"
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
      <h3>Add New Sprint</h3>
      <input value={text} onChange={(e)=>setText(e.target.value)} type="text" />
       
        <button className="add" onClick={() => {
            setModalIsOpen(false);
            handleClick();
          }}> ADD </button>
          <button className="cancel" onClick={()=>setModalIsOpen(false)}>Cancel</button>
      </Modal>
      
    </>
  );
}
