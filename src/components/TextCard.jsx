import React from 'react'

export default function TextCard({text,value,edit}) {
  return (
    <div>
    <label htmlFor="" className=' font-bold capitalize'>{text} - </label>
  <input type="text" name="" id="" className=' font-semibold text-slate-500' value={value} readOnly={edit?edit:true}/> 
    </div>
  )
}
