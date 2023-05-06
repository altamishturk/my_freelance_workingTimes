import React, { useState } from 'react';
import Card from './Card';
import { DOMAIN_NAME } from '../constant';
import moment from 'moment';

function Time({times,setTimes}) {
  const unPaidTimes = times.filter(time => !time.isPaid);
  const paidTimes = times.filter(time => time.isPaid);
  const unPaidMinutes = unPaidTimes?.reduce((a,time) => a + moment(time.endTime).diff(moment(time.startTime),'minutes'),0);
  const paidMinutes = paidTimes?.reduce((a,time) => a + moment(time.endTime).diff(moment(time.startTime),'minutes'),0);
  const total = times?.reduce((a,time) => a + moment(time.endTime).diff(moment(time.startTime),'minutes'),0);
  const [iGot, setIGot] = useState(0);


  const handleDelete = async (timeId) => {
    if(window.confirm('Are You Sure!')){
      const token = localStorage.getItem('token');
      const res = await fetch(`${DOMAIN_NAME}/api/v1/time/${timeId}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({data: ''})
            });

      const resData = await res.json();
      // console.log(resData);
      if (resData.success) {
        alert('deleted successfully!');
        setTimes((prev)=> {
          return prev.filter(time => time._id !== timeId);
        });
      }
      else{
        alert(resData.message);
      }
    }  
  }
    
  return (
    <div className='container mx-auto'>
        <div className="flex flex-col py-4">
          <div className="">
            <span className='font-bold'>Paid Minutes:</span> {paidMinutes}
          </div>
          <div className="">
            <span className='font-bold'>Un Paid Minutes:</span> {unPaidMinutes}
          </div>
          <div className="">
            <span className='font-bold'>Total Minutes:</span> {total}
          </div>
          <div className="">
            <span className='font-bold'>Paid USD:</span> {parseFloat((paidMinutes *(10/60))+iGot).toFixed(2)}
          </div>
          <div className="">
            <span className='font-bold'>Un Paid USD:</span> {parseFloat((unPaidMinutes *(10/60))-iGot).toFixed(2)}
          </div>
          <div className="">
            <span className='font-bold'>Total USD:</span> {parseFloat(total*(10/60)).toFixed(2)}
          </div>
          <div className="">
            <span className='font-bold'>I Got:</span> <input type="number" value={iGot} onChange={(e)=>setIGot(Number(e.target.value))}/>
          </div>
        </div>
        <div className="flex justify-center gap-10 mt-10 flex-wrap">
            {
                times && times.map((time,i) => <Card handleDelete={handleDelete} key={i} time={time}/>)
            }
        </div>
    </div>
  )
}

export default Time;