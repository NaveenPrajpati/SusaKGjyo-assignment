import React, { useState } from 'react'

export default function Form({handleCreate,setForm,editData,handleUpdate}) {

    const [formData, setFormData] = useState(editData?editData:{
        name :  '',
        uniq_id :  '',
        age :  0,
        education :  '',
        job_profile :  '',
        years_of_experience :  0,
        location_worked :  '',
        companies_worked :  '',
        technologies_worked :  '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name] :  value,
        }));
      };

      
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(editData).length!=0){
           console.log(formData);
           handleUpdate(formData)
        }else{
            console.log(formData);
            handleCreate(formData)
        }
      };

  return (
    <form onSubmit={handleSubmit} className=' border-2 p-1 flex flex-col gap-1 relative'>
    <button onClick={()=>setForm(false)} className=' absolute right-2 text-red-400'>close</button>
    <label>
      Name : 
      <input type="text" name="name" value={formData.name} onChange={handleChange} required className=' border-[1px]'/>
    </label> 
    <label>
      Unique ID : 
      <input type="text" name="uniq_id" value={formData.uniq_id} onChange={handleChange} readOnly={Object.keys(editData).length!=0?true:false} required className=' border-[1px]'/>
    </label>
    <label>
      Age : 
      <input type="number" name="age" value={formData.age} onChange={handleChange} required className=' border-[1px]'/>
    </label>
    <label>
      Education : 
      <input type="text" name="education" value={formData.education} onChange={handleChange} required className=' border-[1px]'/>
    </label>
    <label>
      Job Profile : 
      <input type="text" name="job_profile" value={formData.job_profile} onChange={handleChange} required className=' border-[1px]'/>
    </label> 
    <label>
      Years of Experience : 
      <input type="number" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} required className=' border-[1px]'/>
    </label>
    <label>
      Location Worked : 
      <input type="text" name="location_worked" value={formData.location_worked} onChange={handleChange} required className=' border-[1px]'/>
    </label>
    <label>
      Companies Worked : 
      <input type="text" name="companies_worked" value={formData.companies_worked} onChange={handleChange} required className=' border-[1px]'/>
    </label>
    <label>
      Technologies Worked : 
      <input type="text" name="technologies_worked" value={formData.technologies_worked} onChange={handleChange} required className=' border-[1px]'/>
    </label>
    <button type="submit" className=' border-2'>{Object.keys(editData).length!=0?'update':'Add'}</button>
  </form>

  )
}
