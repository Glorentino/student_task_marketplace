import React from "react";


const Login1 = (props) => {

    
    
    const { email, setEmail, 
        password,
        setPassword, 
        login, 
        register,
        hasAccount,
        setHasAccount,              
        upload,
        user1,
        photoURL,
        handleChange,
        handleClick} = props;
    
    return(
        < section className="login">
            <div className="loginContainer">
                <label> Username</label>
                <input type="text" 
                    autoFocus 
                    required 
                    value={email} 
                     onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input 
                type="password" 
                required 
                value={password} 
                 onChange={(e) => setPassword(e.target.value)}/>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClick={login}>Sign In </button>
                            <p>Don't have an account? 
                            <span onClick={() => setHasAccount(!hasAccount)}> Sign Up</span></p>   
                        </>
                    ) : (
                        <>  
                            <button onClick={register}>Sign Up </button>
                            <p>Have an account ? 
                            <span onClick={() => setHasAccount(!hasAccount)}> Sign in </span> </p>   
                        </>
                    )}
                </div>
            </div>
        </section>
    )
};
export default Login1;