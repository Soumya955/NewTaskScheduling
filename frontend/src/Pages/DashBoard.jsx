import React, { useState } from 'react'
import MenuBar from '../Components/MenuBar'
import Task from '../Components/Task'
import "./Css-for-Pages/DashBoard.css"

export default function DashBoard() {
    const [sprintName, setSprintName] = useState("All");
  return (
   <>
    <div className='parentContainer'>
      <div className='menuContainer'>
      <MenuBar  setSprintName={setSprintName} sprintName={sprintName}/>
      </div>
      <div className='taskContainer'>
      <Task sprintName={sprintName}/>
      </div>
    </div>
   </> 
  )
}
