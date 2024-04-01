import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  interface data {
    name?:string,
    email?:string,
    mobileno?:string,
    gender?:string,
    residency?:string, 
  }
  const [form,setform]=useState<data>({gender:"male",residency:"dayscholar"});
  const [ani,setani]=useState<Boolean>(false);
 async function handleclick(){
  
  setani(true);
  let url:String=import.meta.env.VITE_URL;
  console.log(url);
  if(form.email && form.gender && form.name && form.mobileno){ 
    let newurl:String=url+"/api/forminfo"
    console.log(form);
    const res:any =await axios.post(`${newurl}`,form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
  );
    alert(res.data);
    setani(false);
    }
    else {
      alert("Fill all information properly");
      setani(false);
    }
  }



  let a:Array<String>=["1","2","4","2","5","6","5","6","2","3","5","8","2","1","3","4","2","5","4","6","7","3","1","2","4","2","5","6","5","6","2","3","5","1","3","4","2","5","4","1","2","4","2","5","6"]
  let b:Array<String>=["bg-gray-300","bg-sky-600"]
  return (
    <>
    <div  className='flex justify-center items-center relative h-screen  overflow-hidden     bg-gradient-to-r from-cyan-500 to-blue-500'>
    
       {
        a.map((e,index)=>{
        return(
         <>
         <div className='ss'>
      <div className={"s "+`${b[index%2]}` } style={{animationDelay:`${e}s`}}></div>
      </div>
         </>
        )
        })
       }
       
   

      <div className='flex flex-col absolute h-full w-full sm:w-5/6 md:h-2/3 lg:w-4/6 lg:h-3/5 bg-slate-100  z-10 rounded-lg' >
         <div className="flex mt-3">
          <h1 className=' text-center w-full font-semibold text-xl m-2'><span className='text-sky-600'>BIG DATA </span> <span className='text-gray-500'> CENTRE OF EXCELENCE </span></h1>

         </div>
         <div>
         <h2 className=' text-center w-full m-2 text-lg'>Townhall <span className='text-sky-600'>2.0</span></h2>
         </div>
         <div className='flex flex-col '>
          <p className='ml-2'>Name:</p>
          <input type="text"  name='name' className=' m-2 border-solid border-4 rounded-lg mb-2' onChange={(e)=>{
              setform({
                ...form,[e.target.name]:e.target.value}
                          )
          
          }}/>
          <p className='ml-2'>Email:</p>
          <input type="text"  name='email'  className=' m-2 border-solid border-4 rounded-lg mb-2' onChange={(e)=>{
              setform({
                ...form,[e.target.name]:e.target.value}
                          )
          
          }}/>
          <p className='ml-2' >Mobile no:</p>
          <input type="text"  name='mobileno' className=' m-2 border-solid border-4 rounded-lg mb-2' onChange={(e)=>{
              setform({
                ...form,[e.target.name]:e.target.value}
                          );
          }} />
          <div className='md:flex md:mb-2 md:mb-3 mt-3'>
          <p className='m-2'>Gender:</p>
          <select name="gender" id="" className='m-2 bg-violet-100  w-3/6 md:w-full border-2 rounded-md ' onChange={(e)=>{
              setform({
                ...form,[e.target.name]:e.target.value}
                          )
          
          }}>
          <option value="male" >male</option>
          <option value="female">female</option>
          <option value="other" >other</option>
          </select>
          <p className='m-2'>Residency:</p>
          <select name="residency" id="" className='m-2 bg-violet-100 w-3/6 md:w-full border-2 rounded-md' onChange={(e)=>{
              setform({
                ...form,[e.target.name]:e.target.value}
                          )
          
          }}>

          <option value="dayscholar" >dayscholar</option>
          <option value="hostler">hostler</option>
          </select>
          
          <button onClick={handleclick} className='m-2 w-5/6 md:w-full rounded-lg bg-sky-500 text-white'>
            
            
            {ani?
            <>
           <div style={{animationDelay:"2s"}}></div><div style={{animationDelay:"1.5s"}}></div><div style={{animationDelay:"1s"}}></div><div style={{animationDelay:"0.5s"}}></div>
            </>
            :"Submit"}</button>
          </div>
         </div>
      </div>
    </div>
      




    </>
  )
}

export default App
