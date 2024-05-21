import Modal from "./Modal";
import {useState} from 'react'
import { useCookies } from "react-cookie";
const ListHeader=(props)=>{
    const [showModal,setShowModal]=useState(false)
    const [cookies,setCookies,removeCookies]=useCookies(null)
    const signOut=()=>{
        removeCookies('Email')
        removeCookies('AuthToken')
        window.location.reload()
    }
    return <div className="header">
        <h1>{props.listName}</h1>
        <div className="button-container">
            <button className="create" onClick={()=>{setShowModal(true)}}>ADD NEW</button>
            <button className="signout" onClick={signOut}>Sign Out</button>
        </div>
        {showModal && <Modal mode='create' setShowModal={setShowModal} getData={props.getData}/>}
    </div>
}

export default ListHeader;
