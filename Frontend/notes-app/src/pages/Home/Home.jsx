import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from "react-icons/md"
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import{useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Home = () => {
  
  const {currentUser,loading,errorDispatch} = useSelector(
    (state) => state.user
  )

  const [userInfo,setUserInfo] = useState(null);
  const [allNotes,setAllNotes] = useState([ ]);

  const [issearch,setIsSearch] = useState(false);

 

  const navigate = useNavigate();

  const [openAddEditModal,setOpenAddEditModal] = useState(
    {
      isShown:false,
      type:"add",
      data:null,
    }
  );

 
  
  useEffect(()=>{
    if (currentUser === null || !currentUser) {
      navigate("/login")
    } else {
      setUserInfo(currentUser?.rest)
      getAllNotes()
    }
  },[])


  
  const getAllNotes = async()=>{
    try {
      const res = await axios.get("http://localhost:3000/api/note/all",{withCredentials:true,})

      if(res.data.success === false){
        console.log(res.data);
        return
      }

     setAllNotes(res.data.notes);
      
      
    } catch (error) {
      console.log(error);
    }
  }


  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown:true,data:noteDetails,type:"edit"})
  }

  const deleteNote = async(data) => {
    const noteId = data._id

    try {
      const res = await axios.delete("http://localhost:3000/api/note/delete/"+noteId,{withCredentials:true})

      
      if(res.data.success === false){
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()

    } catch (error) {
      toast.error(error.message)
    }
  }


  const onSearchNote = async(query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search",
      {params:{query},withCredentials:true})
       
      if(res.data.success === false){
        toast.error(res.data.message)
        return
      }
      
      setIsSearch(true)
      setAllNotes(res.data.notes)

    } catch(error) {
      toast.error(error.message)
    }
  }


  const handleClearSearch = () => {
    setIsSearch(false)
    getAllNotes();
  }

  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id
    try {
      const res = await axios.put("http://localhost:3000/api/note/pin/"+noteId,{isPinned: !noteData.isPinned},{withCredentials:true})
       
      if(res.data.success === false){
        toast.error(res.data.message)
        return
      }
      
      toast.success(res.data.message)
      getAllNotes()

    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Navbar userInfo={userInfo}
      onSearchNote={onSearchNote}
      handleClearSearch={handleClearSearch}
      />
      <div className='container mx-auto'>
        {allNotes.length>0 ?(<div className='grid grid-cols-3 gap-4 mt-8'>
        {allNotes.map((note,index)=>(
          <NoteCard 
          key={note._id}
              title={note.title} 
              date={note.createdAt} 
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={()=>{
                handleEdit(note)
              }}
              onDelete={()=>{
                deleteNote(note)
              }}
              onPinNote={()=>{
                updateIsPinned(note)
              }}
        
          />
      ) )}
        </div>)
        :(<EmptyCard imgSrc={
          issearch?"https://th.bing.com/th/id/OIP.Qe_oeLq3BBk71oxq01_fQQHaHa?w=147&h=180&c=7&r=0&o=5&pid=1.7":"https://th.bing.com/th/id/OIP.bGnZv4MPgrYd7YgdtPs6nQHaHa?w=196&h=197&c=7&r=0&o=5&pid=1.7"
        }
         message={issearch?"Oops! No matching notes found":"Click the 'ADD' button to start noting down your thoughts and reminders"}/>)}
        
      </div>
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
      onClick={()=>{
        setOpenAddEditModal({isShown:true,type:"add",data:null});
      }}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
        style={
          {
            overlay:{
              backgroungColor:"rgba(0,0,0,0.2)",

            },
          }
        }
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >

      <AddEditNotes
      type={openAddEditModal.type}
      getAllNotes={getAllNotes}
      noteData={openAddEditModal.data}
      onClose={()=>{
        setOpenAddEditModal({isShown:false,type:"add",data:null});
      }
      }
      />
      </Modal>
    </div>
  )
}

export default Home