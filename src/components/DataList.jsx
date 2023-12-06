// DataList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextCard from './TextCard';
import Form from './Form';

const DataList = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    // name: '',
    // uniq_id: '',
    // age: 0,
    // education: '',
    // job_profile: '',
    // years_of_experience: 0,
    // location_worked: '',
    // companies_worked: '',
    // technologies_worked: '',
  });

const [form,setForm]=useState(false)
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/get');
      console.log(response.data.data)
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleCreate = (data) => {
      axios.post('http://localhost:4000/api/add', data).then(res=>{
        console.log(res.data)
      fetchData();
      setForm(false)
      })
      .catch(err=>{console.log(err)})
  };

  const handleUpdate = async (data) => {
    await axios.put(`http://localhost:4000/api/update/${data.uniq_id}`, data).then(res=>{
      console.log(res.data)
    fetchData();
    setEditData({})
    setForm(false)
    })
    .catch(err=>{console.log(err)})
  };

  const handleDelete = async (uniq_id) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete/${uniq_id}`);
      fetchData();
      
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h1 className=' text-red-400'>Data List</h1>
      {form?<Form handleCreate={handleCreate} setForm={setForm} editData={editData?editData:{}}  handleUpdate={handleUpdate}/>:
      <button onClick={()=>setForm(true)} className='border-2 p-5 rounded-lg'>add data</button>
      }
      <div className=' flex gap-2 flex-wrap'>
    
        {data.map((item,index) => (
            <div className=' border-2 p-2 rounded-lg flex-col flex' key={index}>
           <TextCard text={'uniq_id'} value={item.uniq_id}/>
           <TextCard text={'name'} value={item.name}/>
           <TextCard text={'age'} value={item.age}/>
           <TextCard text={'education'} value={item.education}/>
           <TextCard text={'job_profile'} value={item.job_profile}/>
           <TextCard text={'years_of_experience'} value={item.years_of_experience}/>
           <TextCard text={'companies_worked'} value={item.companies_worked}/>
           <TextCard text={'location_worked'} value={item.location_worked}/>
          <div className=' mt-5 flex justify-end'>

            <button className=' p-1 border-2 rounded-xl bg-red-500 text-white' onClick={() => handleDelete(item.uniq_id)}>Delete</button>
            <button className=' p-1 border-2 rounded-xl bg-blue-500 text-white' onClick={() =>{ setEditData(item)
            setForm(true)
            }}>Edit</button>
          </div>
            </div>
        ))}
      </div>

    </div>
  );
};

export default DataList;
