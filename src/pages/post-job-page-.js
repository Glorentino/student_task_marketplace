import React, { useState } from 'react';
import { db } from '../util/firebase';
import { set, ref, remove, update} from 'firebase/database';
import { uid } from 'uid';

const JobPost= () => {
    const [title, setTitle] = useState('');
    const [titles, setTitles] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [urlLink, setUrlLink] = useState('');
    const [dateOfCompletion, setDateOfCompletion] = useState('');
    const [pickedUp, setPickedUp] = useState('');
    const [userName, setUserName] = useState('');
    const [dateOfPost,setDateOfPost] = useState('');
    
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
    const handleOnChange4 = (e) => {
      setDateOfPost(e.target.value);
    };

    //write
    const createTodo = () => {
      const uuid = uid();
      set(ref(db, `/company/${uuid}`), {
        title,
        uuid,
        complete: false,
        location,
        company,
        description,
        urlLink,
        userName,
        dateOfCompletion,
        pickedUp,
        dateOfPost
      });
      set(ref(db, `/market/${uuid}`), {
        title,
        uuid,
        complete: false,
        location,
        company,
        description,
        urlLink,
        userName,
        dateOfCompletion,
        pickedUp,
        dateOfPost
      });
      setTitle("");
      setLocation("");
      setCompany("")
      setDescription("");
      setUserName("");
      setDateOfCompletion("");
      setPickedUp("");
      setDateOfPost("");
    };
    
    // Update
    const handleUpdate = (title) => {
      setIsEdit(true);
      setTempUuid(title.uuid);
      setTitle(title.title);
    };

    const handleSubmitChange = () => {
      update(ref(db, `/company/${tempUuid}`), {
        title,
        uuid: tempUuid,
      });
      setTitle("");
      setIsEdit(false);
    };

    // delete
    const handleDelete = (title) => {
      remove(ref(db, `/company/${title.uuid}`));
      remove(ref(db, `/user/${title.uuid}`));
      remove(ref(db, `/market/${title.uuid}`));
    };

    return (
        <div>
            <title>Tech | Job Post </title>
            <h1>Post A Job</h1>
            <form>
            <div>
              <label>Date: </label>
              <input type="text"  onChange={handleOnChange4} value={dateOfPost}/>
            </div>
            <div>
            <label>Task: </label> 
            <input type="text"  onChange={handleOnChange} value={title}/>
            </div>
            <div>
            <label>Location: </label> 
            <input type="text" onChange={handleOnChange1} value={location}/>
            </div>
            <div>
            <label>Company: </label>
            <input type="text" onChange={handleOnChange3} value={company}/>
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
            <button className='submit-button' onClick={createTodo}>Submit</button>
            )}
            {titles.map((title) => (
              <><h1>{title.dateOfPost}</h1>
                <h1>{title.title} </h1>
                <h2> {title.location} {title.company}</h2>
                <p>{title.description} </p>
                <button onClick={() => handleUpdate(title)}>update</button>
                <button onClick={() => handleDelete(title)}>delete</button>
              </>
            ))}
            <footer className="foot">
              <div className="footer-txt" >Tech Company</div>
            </footer>
        </div>
    );
};
export default JobPost;