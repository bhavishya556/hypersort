import React, { useState } from 'react';
import "./singup.css";
import electricity from "../../assets/img/electricity.png";
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../backend/Firebase';

const Singup = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(email)
            console.log(password)
            await firebase.SigninUserWithEmailandPassword(email, password);
            console.log('Account created successfully.');
      
          } catch (error) {
            console.error('Error creating account:', error);
          }
    
    };

    return (
        <div className='singup-con'>
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign in</h2>
                        <form onSubmit={handleFormSubmit} className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Your Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input 
                                    type="password" 
                                    name="pass" 
                                    id="pass" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Login" />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={electricity} alt="sing up image" /></figure>
                        <p className="signup-image-link" onClick={() => navigate("../")}>Create New Account</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singup;
