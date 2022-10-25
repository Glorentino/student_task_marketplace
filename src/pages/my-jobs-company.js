import React, { useEffect, useState } from 'react';
import { db } from '../util/firebase';
import { set, ref, onValue, remove, update} from 'firebase/database';
import { uid } from 'uid';


const CompanyDisplay= () => {
    const [title, setTitle] = useState('');
    const [titles, setTitles] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [dateOfCompletion, setDateOfCompletion] = useState('');
    const [pickedUp, setPickedUp] = useState('');
    const [userName, setUserName] = useState('');
    const [dateOfPost,setDateOfPost] = useState('');
    const [urlLink, setUrlLink] = useState('');

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
    //read
    useEffect(() => {
      onValue(ref(db, `/company`), (snapshot) => {
        setTitles([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).forEach((title) =>{
            setTitles((oldArray) => [...oldArray, title]);
          });
        }
        
      });
    }, []);

    //write
    const createTodo = () => {
      const uuid = uid();
      set(ref(db, `/company/${uuid}`), {
        title,
        uuid,
        complete: false,
        location,
        company,
        description
      });
      set(ref(db, `/user/${uuid}`), {
        title,
        uuid,
        complete: false,
        location,
        company,
        description,
        
      });
      set(ref(db, `/market/${uuid}`), {
        title,
        uuid,
        complete: false,
        location,
        company,
        description,

      });
      setTitle("");
      setLocation("");
      setCompany("")
      setDescription("");
    };
    
    // Update
    const handleUpdate = (title) => {
      setIsEdit(true);
      setTempUuid(title.uuid);
      setTitle(title.title);
      setDescription(title.description)
    };

    const handleSubmitChange = () => {
      update(ref(db, `/company/${tempUuid}`), {
        title,
        description,
        uuid: tempUuid,
      });
      update(ref(db, `/user/${tempUuid}`), {
        title,
        description,
        uuid: tempUuid,
      });
      update(ref(db, `/market/${tempUuid}`), {
        title,
        description,
        uuid: tempUuid,
      });
      setTitle("");
      setDescription("");
      setIsEdit(false);
    };

    // delete
    const handleDelete = (title) => {
      remove(ref(db, `/company/${title.uuid}`));
      remove(ref(db, `/user${title.uuid}`));
      remove(ref(db, `/market/${title.uuid}`));
    };

    return (
        <div>
            <title>Tech | Job Post </title>
            <h1>Displayed Jobs</h1>

            {isEdit ? (
        <>
                    <form>

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
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTitle("");
              setDescription("");
            }}
          >
            X
          </button>
        </>
              ) : (
            <p></p>
            )}            <table class="table">
            <thead>
            <tr>
                
                <th scope="col">Task</th>
                <th scope="col" >Date of Post</th>
                <th scope="col" >Pick Up?</th>
                <th scope="col">Username</th>
                <th scope="col" >Date Of Completion</th>
                <th scope="col" >Completion Link</th>
                
            </tr>
            </thead>
            {titles.map((title) => (
              <>
                <tr key ={title.title}></tr>
      
                <th >{title.title}</th>
                <td> {title.dateOfPost} </td>
                <td>{title.pickedUp}</td>
                <td> {title.userName}</td>
                <td>{title.dateOfCompletion} </td>
                <td>{title.urlLink} </td>
                <td><button onClick={() => handleUpdate(title)}>update</button></td>
                <td><button onClick={() => handleDelete(title)}>delete</button></td>
              </>
            ))}
            </table>
            <footer className="foot">
              <div className="footer-txt" >Tech Company</div>
            </footer>
        </div>
        
    );
};
export default CompanyDisplay;