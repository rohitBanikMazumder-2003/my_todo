import {useState} from 'react';
import { useCookies } from 'react-cookie';
const Modal = ({mode,setShowModal,getData,task}) => {
    const editMode=mode==='edit'?true:false
    const [cookies,setCookies,removeCookies]=useCookies(null)
    const [data,setData]=useState({
        user_email:editMode?task.user_email:cookies.Email,
        title:editMode?task.title:null,
        progress: editMode ? task.progess : 80,
        date:editMode?task.date:new Date() 
    })


    const postData=async(e)=>{
        e.preventDefault();
        try{
            const response =await fetch(`http://localhost:5000/todos`,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status===200){
                console.log('worked')
                setShowModal(false)
                getData()
            }

        }
        catch(err){
            console.error(err);

        }
    }

    const editData=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(`http://localhost:5000/todos/${task.id}`,{
                method:"PUT",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status===200){
                setShowModal(false)
                getData()
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target

        setData(data=>({
            ...data,
            [name]:value
        }))
        
    }

    return (

        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={()=>setShowModal(false)}>X</button>
                </div>

                <form>
                    <input
                        className="textarea"
                        required
                        maxLength={30}
                        placeholder="your task goes here"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    ></input>
                    <br />
                    <label for="range">Drag to select your current progress</label>
                    <input
                        required
                        type="range"
                        id="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={data.progress}
                        onChange={handleChange}

                    ></input>
                    <input className={mode} type="submit" onClick={editMode?editData:postData}></input>
                </form>

            </div>
        </div>
    )


}

export default Modal;