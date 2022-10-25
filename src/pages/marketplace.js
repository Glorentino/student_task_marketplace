import React, { useEffect, useState } from 'react';
import { db } from '../util/firebase';
import { ref, onValue, update} from 'firebase/database';



const JobPosted = () => {
  const [title, setTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('')
  const [dateOfCompletion, setDateOfCompletion] = useState('');
  const [pickedUp, setPickedUp] = useState('');
  const [userName, setUserName] = useState('');
  const [titles, setTitles] = useState([]);


  const handleOnChange = (e) => {
    setPickedUp(e.target.value);
  };
  const handleOnChange1 = (e) => {
    setUserName(e.target.value);
  };
  const handleOnChange2 = (e) => {
    setDateOfCompletion(e.target.value);
  };



    useEffect(() => {
        onValue(ref(db, `/market`), (snapshot) => {
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
      };
  
      const handleSubmitChange = () => {
        update(ref(db, `/company/${tempUuid}`), {
          title,
          userName,
          dateOfCompletion,
          pickedUp,
          uuid: tempUuid,
          
        });
        update(ref(db, `/user/${tempUuid}`), {
          title,
          userName,
          dateOfCompletion,
          pickedUp,
          uuid: tempUuid,
          location,
          company,
          description,
          
        });
        setTitle("");
        setUserName("");
        setDateOfCompletion("");
        setCompany("")
        setDescription("");
        setUserName("");
        setPickedUp("");
        setIsEdit(false);
      };

    return (
        <div>
            <title>Tech | JobPosted </title>
            <h1>MarketPlace</h1>

            {isEdit ? (
        <>
            <form>
            <label>Picked up?   </label> 
            <input type="text" onChange={handleOnChange} value={pickedUp}/>
            
            <div>
            <label>Username: </label>
            <input type="text" onChange={handleOnChange1} value={userName}/>
            </div>
            <div>
            <label>Date of Completion: </label> 
            <input type="text"  onChange={handleOnChange2} value={dateOfCompletion}/>
            </div>

            </form >
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTitle("");
              setUserName("");
              setDateOfCompletion("");
              setPickedUp("");
              setCompany("");
              setDescription("");
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
                <th scope="col">Date of Post</th>
                <th scope="col" >Company</th>
                <th scope="col">Location</th>
                <th scope="col" >Description</th>
                <th scope="col" >Pick Up?</th>
            </tr>
            </thead>
            
            {titles.map((title) => (
              <>
                <h3> </h3>
                <tr key ={title.title}></tr> 
                <th >{title.title}</th>
                <td>{title.dateOfPost}</td>
                <td>{title.company}</td>
                <td>{title.location}</td>
                <td>{title.description}</td>
                <td><button onClick={() => handleUpdate(title)}>Pick Up</button></td>
                
               

              </>
            ))}
            </table>
            <footer className="foot">
              <div className="footer-txt" >Tech Company</div>
            </footer>
        </div>
    );
};
export default JobPosted;