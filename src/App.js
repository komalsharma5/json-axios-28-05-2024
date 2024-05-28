// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const App = () => {
//   const [data,setData] = useState([])
//   const [view,setView] = useState({})

//   useEffect(() => {
//     axios.get("http://localhost:3001/posts").then((res) => {
//       console.log(res);
//       setData(res.data)
//     }).catch((err) => {
//       console.log(err)
//     })
//   },[])

//  const input_handler =(e) =>{
//   setView({...view,[e.target.name] : e.target.value})
//  }
//  const submit_handler = async ()=>{
//   await axios.post("http://localhost:3001/posts", view)
//  }

//  const delete_handler = (id) =>{
//   axios.delete(`http://localhost:3001/posts/${id}`).then((res)=>{
//       console.log(res);
//   }).catch((err)=>{
//     console.log(err);
//   })
//  }
//   return (
//     <>
//       {
//         data?.map((val_,ind)=>{
//           return(
//             <div key={ind} className='w-25 border border-1 border-dark my-2 mx-auto text-center p-2'>
//               <h3>{val_.id}</h3>
//               <h3>{val_.title}</h3>
//               <h3>{val_.author}</h3>
//               <button className='btn btn-danger' onClick={()=>delete_handler(val_.id)}>Delete</button>
//             </div>
//           )
//         })
//       }

//       <div className='w-50'>
//         <input type='text' name='title' value={view.title} onChange={input_handler} placeholder='Enter Title' className='mx-3'></input>
//         <input type='text' name='author' value={view.author} onChange={input_handler} placeholder='Enter Author name'className='mx-3'></input>
//         <button className='btn btn-primary' onClick={submit_handler}>Submit</button>
//       </div>
//     </>
//   )
// }

// export default App


import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [data,setData] = useState([])
  const [view,setView] = useState({})

  const getapi = () =>{
    axios.get(`http://localhost:3001/posts`).then((res)=>{
      console.log(res);
      setData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

  const input_handler = (e) =>{
    setView({...view,[e.target.name]: e.target.value})
   
  }
  
  const submit_handler=()=>{
    axios.post(`http://localhost:3001/posts`,view)
  }

  const delete_handler = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`)
  }
  const view_handler = (val) => {
    setView(val)
  }
  const update_handler = () =>{
    axios.put(`http://localhost:3001/posts/${view.id}`,view).then((res)=>{
      setView(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    getapi()
  },[data])
  return (
    <>
      {
        data?.map((val,id,arr)=>{
          return(
            <div key={id} className='mx-auto d-block border border-1 border-dark w-25 text-center my-2 py-2'>
              <h3>{val.id}</h3>
              <h3>{val.title}</h3>
              <h3>{val.author}</h3>
              <button className='btn btn-success mx-3' onClick={()=>view_handler(val)}>View</button>
              <button className='btn btn-danger' onClick={()=>{delete_handler(val.id)}}>Delete</button>
            </div>
          )
        })
      }
      <div className='mx-auto d-block w-25 text-center'>
        <input type='text' name='title'  value={view.title} placeholder='Enter Title' className='mx-2 my-1' onChange={input_handler}></input>
        <input type='text' name='author' value={view.author} placeholder='Enter author' className='mx-2' onChange={input_handler}></input>
        <button className='btn btn-primary' onClick={submit_handler}>Submit</button>
        <button className='btn btn-success mx-3' onClick={update_handler}>Update</button>
      </div>
    </>
  )
}

export default App

