import React from 'react';
import Tasks from './components/Tasks';
import {useState, useEffect} from 'react';
import AddTask from './components/AddTask';
import {Typography, Grid, Button} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


const App = () => {

  const [addShown, setAddShown]= useState(false);

  const [tasks, setTasks]= useState([]);


  useEffect(()=>{
    fetch('http://localhost:8888/MURKHASYA/src/api/get.php', {
      method: 'POST'
    })
    .then(res=> {  if (!res.ok) {
                        throw new Error('Network response was not ok');
                        }
                  return res.json()})
    .then(data=> setTasks(data))
    .catch(err=> console.log('Error:', err))
  }, [])
  


    const deleteTask=(id)=>{
      fetch('http://localhost:8888/MURKHASYA/src/api/delete.php',{
        method: 'POST',
        body: JSON.stringify({
          id: id
        }) })
        .then(res=> {
                      if (!res.ok) {
                          throw new Error('Network response was not ok');
                      }
                      res.json()})
        .then(data=> setTasks(data))
        .catch(err=> console.log(err))
     
    }


  const addTask=(name, date, reminder, priority, info)=>{
    fetch('http://localhost:8888/MURKHASYA/src/api/add.php',{
      method:'POST',
      body: JSON.stringify({
        name: name,
        date: date,
        reminder: reminder,
        priority: priority,
        info: info
      })
      })
      .then(res=>  {  if (!res.ok) {
                      throw new Error('Network response was not ok');
                        }
                    return res.json()})
      .then(data=> { console.log(data)
                      setTasks(data)})
      .catch(err=> console.log(err))
    
  }


  const editTask=(id, newName, newDate)=>{
    fetch('http://localhost:8888/MURKHASYA/src/api/edit.php', {
      method: "POST",
      body: JSON.stringify({id: id, name: newName, date: newDate})
    })
    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        res.json()})
    .then(data => setTasks(data))
    .catch(err=> console.log(err))
  }
    

  const changeReminder=(id, reminder)=>{
    fetch('http://localhost:8888/MURKHASYA/src/api/editReminder.php',{
      method: 'POST',
      body: JSON.stringify( { id: id, reminder: reminder})
    })
    .then(res=> {
                  if (!res.ok) {
                      throw new Error('Network response was not ok');
                  }
                  res.json()})
    .then(data=> setTasks(data))
    .catch(err=> console.log(err))
  }
 

  return (
    <>
      <Grid container spacing={2} justifyContent='center'>
          <Typography id='header' color='#222222'> ToDo App</Typography>
          <DoneAllIcon id='logo'/>
      </Grid>
      <Grid >
          {tasks.length >0 ? (<Tasks tasks={tasks} deleteTask={deleteTask} editTask={editTask} changeReminder={changeReminder}/> )
                        : (<Typography  align ='center' margin='100px 20px 50px' id='noTask'>No task to do :( </Typography> )}
          <Button id='button-add' aria-details='New task dialog button' onClick={() => {
              setAddShown(current=> !current)}}>
              {addShown ? <CloseIcon/> : <AddIcon/>}
          </Button>
          {addShown? <AddTask addTask={addTask}/> : null}
      </Grid>
    </>
  )
}

export default App