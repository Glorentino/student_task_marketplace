import React, { useEffect, useState } from 'react';
import { db } from '../util/firebase';
import { set, ref, onValue, remove, update} from 'firebase/database';
import { uid } from 'uid';
import './login.css';

const MyJobs = () => {
    const [title, setTitle] = useState('');
    const [titles, setTitles] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [urlLink, setUrlLink] = useState('');
    const [complete, setComplete] = useState(false);
    const [dateOfCompletion, setDateOfCompletion] = useState('');
    const [pickedUp, setPickedUp] = useState('');
    const [userName, setUserName] = useState('');


    const handleOnChange = (e) => {
      setUrlLink(e.target.value);
    };

    //read
    
    useEffect(() => {
      onValue(ref(db, `/user`), (snapshot) => {
        setTitles([]);
        const data = snapshot.val();

        if (data !== null) { 
    
          Object.values(data).forEach((title) =>{
            setTitles((oldArray) => [...oldArray, title]);
          })};
        
      });
    }, []);

   


    // delete
    const handleDelete = (title) => {
      remove(ref(db, `/user/${title.uuid}`));
      update(ref(db, `/company/${title.uuid}`),{
        pickedUp:null,
        userName:null,
        dateOfCompletion:null
      })
      
    };
    // Update
    const handleUpdate = (title) => {
      setIsEdit(true);
      setTempUuid(title.uuid);
      setTitle(title.title);
      setUserName(title.userName);
      setDateOfCompletion(title.dateOfCompletion);
      setPickedUp(title.pickedUp);
      setCompany(title.company);
      setLocation(title.location);
      setDescription(title.description);
      setUrlLink(title.urlLink);
      remove(ref(db, `/user/${title.uuid}`));
      remove(ref(db, `/market/${title.uuid}`));

    };
      
    const handleSubmitChange = () => {
      update(ref(db, `/company/${tempUuid}`), {
        title,
        userName,
        dateOfCompletion,
        pickedUp,
        uuid: tempUuid,
        urlLink,
        complete:!title.complete, 
      });
      remove(ref(db, `/user/${title.uuid}`));
      remove(ref(db, `/market/${title.uuid}`));
      setTitle("");
      setUserName("");
      setDateOfCompletion("");
      setCompany("")
      setDescription("");
      setUserName("");
      setPickedUp("");
      setUrlLink("");
      setIsEdit(false);
      
    };
    


    return (
        <div>
            <title>Tech | My Jobs </title>
            <h1>My Jobs</h1>
            <p>Reminder: Once job has been removed you will not be add it back. Contact an Admin.</p>
            {isEdit ? (
        <>
            <form>
            <label>Url:    </label> 
            <input type="text" onChange={handleOnChange} value={urlLink}/>

            </form >
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTitle("");
              setDescription("");
              setUrlLink("");

            }}
          >
            X
          </button>
        </>
              ) : (
            <p></p>
            )}
            <table class="table">
            <thead>
            <tr>
                <th scope="col">Task</th>
                <th scope="col" >Company</th>
                <th scope="col">Location</th>
                <th scope="col" >Description</th>
                <th scope="col" >Complete?</th>
          
            </tr>
            </thead>
            {titles.map((title) => (
              <>
                <tr key ={title.title}></tr>
                <th >{title.title}</th>
                <td> {title.location}</td>
                <td>{title.company}</td>
                <td>{title.description} </td>
                <td><button onClick={() => handleUpdate(title)}>Complete</button>
                </td>
                <td>
                <button onClick={() => handleDelete(title)}>delete</button>
                </td>
    
                </>

            ))}
            
            </table>

            <footer className="foot">
              <a className="footer-txt" >Tech Company</a>
            </footer>
        </div>
    );
};
export default MyJobs;


