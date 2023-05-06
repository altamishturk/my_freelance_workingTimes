import React, { useState } from 'react';
import image from "../assits/no_image.png";
import moment from "moment";


function Card({time,handleDelete}) {
  const [show,setShow] = useState(false);

  

  return (
    <div style={{opacity: time.isPaid? .2:1}} className='relative w-[400px] border shadow-sm p-4 rounded-md'>
        {
          show && <div className="absolute top-0 left-0 p-4">
                    <button onClick={()=>handleDelete(time._id)} className='bg-red-600 text-white px-4 py-2 rounded-md'>Delete</button>
                  </div>
        }
        <div className="">
          <img src={time.image?.url || image} alt="" />
        </div>
        <div className="flex flex-col">
          <span>Date: {moment(time.startTime).format("MMMM Do YYYY")}</span>
          <span>From: {moment(time.startTime).format("h:m a")}</span>
          <span>To: {moment(time.endTime).format("h:m a")}</span>
          <span>Total Time: {moment(time.endTime).diff(moment(time.startTime),"minutes")} Minutes</span>
        </div>
        <hr />
        <div onClick={()=>setShow(!show)} className="mt-3">
          {time.description || "Not Set"}
        </div>
    </div>
  )
}

export default Card;