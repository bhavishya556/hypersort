import React, { useState } from 'react';
import "./singup.css";
import electricity from "../../assets/img/electricity.png";
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../backend/Firebase';

const Singup = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();

    // State variables for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        // Password validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Check if password and repeat password match
        if (password !== rePassword) {
            setError('Passwords do not match');
            return;
        }

        // Clear any previous error
        setError('');

        // Sign up user with email and password
        try {
            console.log(email)
            console.log(password)
            await firebase.SignupUserWithEmailandPassword(email, password);
            console.log('Account created successfully.');
      
          } catch (error) {
            console.error('Error creating account:', error);
          }
    };

    

    const GooglehandleSubmit = () => {
        firebase.singinWithGoogle();

    };

    return (
        <div className='singup-con'>
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
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
                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input 
                                    type="password" 
                                    name="re_pass" 
                                    id="re_pass" 
                                    placeholder="Repeat your password" 
                                    value={rePassword} 
                                    onChange={(e) => setRePassword(e.target.value)}
                                />
                            </div>
                            
                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={electricity} alt="sing up image" /></figure>
                        <p className="signup-image-link" onClick={() => navigate("./singin")}>I am already a member</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singup;
