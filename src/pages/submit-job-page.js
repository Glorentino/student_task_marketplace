import React, { useEffect, useState } from 'react';
import { db } from '../util/firebase';
import { set, ref, onValue, remove, update} from 'firebase/database';
import { uid } from 'uid';

const SubmitJob = () => {

    const [title, setTitle] = useState('');
    const [titles, setTitles] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('')
    
    const handleOnChange = (e) => {
      setTitle(e.target.value);
    };
    const handleOnChange1 = (e) => {
      setLocation(e.target.value);
    };
    const handleOnChange2 = (e) => {
      setDescription(e.target.value);
    };
    const handleOnChange3 = (e) => {
      setCompany(e.target.value);
    };
    //write
    const createTodo = () => {
      const uuid = uid();
      set(ref(db, `/${uuid}`), {
        title,
        uuid,
        complete: false,
        location,
        company,
        description
      });
      setTitle("");
      setLocation("");
      setDescription("");
    };
    
    // Update
    const handleUpdate = (title) => {
      setIsEdit(true);
      setTempUuid(title.uuid);
      setTitle(title.title);
    };

    const handleSubmitChange = () => {
      update(ref(db, `/${tempUuid}`), {
        title,
        uuid: tempUuid,
      });
      setTitle("");
      setIsEdit(false);
    };

    return (
        <div>
            <title>Tech | SubmitJob </title>
            <h1>Submit Job</h1>
            <form>
            <label>Job Title:   </label> 
            <input type="text"  onChange={handleOnChange} value={title}/>
            <div>
            <div>
            <label>Company: </label>
            <input type="text" onChange={handleOnChange3} value={company}/>
            </div>
            <label>Location: </label> 
            <input type="text"  onChange={handleOnChange1} value={location}/>
            </div>
            <div>
            <div>
            <label>Description: </label>
            </div>
            <input type="text" className='form-box' onChange={handleOnChange2} value={description}/>
            </div>
            </form >
            {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTitle("");
            }}
          >
            X
          </button>
        </>
              ) : (

            <button  className='submit-button' onClick={createTodo}> Submit</button>

            )}
            {titles.map((title) => (
              <>
                <h1>{title.title} </h1>
                <h2> {title.location} {title.company}</h2>
                <p>{title.description} </p>
                <button onClick={() => handleUpdate(title)}>update</button>

              </>
            ))}
        </div>
    );
};
export default SubmitJob;



