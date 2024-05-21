import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import {useState} from 'react';
const ListItem=({task,getData})=>{
    const [showModal,setShowModal]=useState(false)

    const deleteItem= async()=>{
        try {
            const response=await fetch(`http://localhost:5000/todos/${task.id}`,{
                method:'DELETE'
            })
            if(response.status===200){
                getData();
            }
        } 
        catch (error) {
            console.error(error);
        }
    }
    console.log('listitem task:',task);
    return(
        <li className="list-item">
            <div className="info-container">
                <TickIcon/>
                <p className="task-title">{task.title}</p>
                <ProgressBar progress={task.progess}/>
            </div>

            <div className="button-container">
                <button className="edit" onClick={()=>{setShowModal(true)}}>Edit</button>
                <button className="delete" onClick={deleteItem}>Delete</button>

            </div>

            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
        </li>
    )
}



export default ListItem