import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Css-for-Modals/CreateSprintModal.css"
import axios from "axios";
import Swal from 'sweetalert2'


export default function CreateSprintModal({modalIsOpen, setModalIsOpen,handleGetSprintData}) {


   const [text,setText]=useState("")

   const handleClick=()=>{
    if(text){
      let txt=""+text[0].toLocaleUpperCase()+text.slice(1,text.length).toLocaleLowerCase()
      axios.post('https://busy-coveralls-duck.cyclic.app/api/sprints', {sprint:txt})
      .then(response => {
        handleGetSprintData()
        setText("")
        Swal.fire({
          title: 'Created',
          text: 'Sprint Created.',
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
        text: 'You have not written Sprint Name or It already exists.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
   }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        className="Modal2"
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
      <h3>Add New Sprint</h3>
      <input value={text} onChange={(e)=>setText(e.target.value)} type="text" required />
       
        <button className="add" onClick={() => {
            setModalIsOpen(false);
            handleClick();
          }}> ADD </button>
          <button className="cancel" onClick={()=>setModalIsOpen(false)}>Cancel</button>
      </Modal>
      
    </>
  );
}
