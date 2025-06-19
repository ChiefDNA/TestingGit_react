import React, { useRef, useState } from 'react';
import useResponsiveClasses from '../hooks/useResponsiveClasses';


function Registration({replacement, isValidContact, UserAlert}) {
    const [form, setForm] = useState({
        username: '',
        dateOfBirth: '',
        contact: '',
        address: '',
        password: ''
    });


    const shortRefs = useRef([]);
    const longRefs = useRef([]);

    useResponsiveClasses([
        {
            elements: shortRefs.current.filter(Boolean),
            className: 'short',
            maxWidth: 600,
        },
        {
            elements: longRefs.current.filter(Boolean),
            className: 'long',
            maxWidth: 600,
        }
    ]);

    const handleChange = (e, pin) => {
        replacement(e, pin);
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isValidContact(form.contact)){
            UserAlert(document.querySelector('#contact'), "Enter a valid phone number or email address");
            return;
        }

        fetch('http:127.0.0.1:8000/accounts/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            bdy: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => console.log('User register:', data))
        .catch(console.error);
    };

        
    return (
        <div className="container">
            <div className="heading">
                <div className="placing row">
                    <h2>Welcome to TestingGit</h2>
                    <hr />
                </div>
            </div>

            <div className="form-space register">
                <div className="form-boundary">
                    <div className="form-wrap">
                        <h3>Provide Details Below</h3>
                        <form id="registerForm" onSubmit={handleSubmit} className="register-form">
                            <div className="form-item lbl">
                                <label id="user_info">Personal Details:</label>
                            </div>
                            <div className="form-item short" ref={(el) => (shortRefs.current[0] = el)}>
                                <input id="username" type="text" className='form-items' aria-labelledby='user_info' placeholder="Username" value={form.username} onChange={(e) => handleChange(e,1)} required />
                            </div>
                            <div className="form-item long" ref={(el) => (longRefs.current[0] = el)}>
                                <input id="dateOfBirth" type="date" className='form-items' aria-labelledby='user_info' placeholder="Date Of Birth" value={form.dateOfBirth} onChange={(e) => handleChange(e,5)} required />
                            </div>
                            <div className="form-item lbl">
                                <label id="temporary-info">Reach-out Details:</label>
                            </div>
                            <div className="form-item long" ref={(el) => (longRefs.current[1] = el)}>
                                <input id="contact" type="text" className='form-items' aria-labelledby='temporary-info' placeholder="Phone\Email" value={form.contact} onChange={(e) => handleChange(e,3)} required />
                            </div>
                            <div className="form-item short" ref={(el) => (shortRefs.current[1] = el)}>
                                <input id="address" type="text" className='form-items' aria-labelledby='temporary-info' placeholder="Address" value={form.address} onChange={(e) => handleChange(e,4)} required />
                            </div>
                            <div className="form-item lbl">
                                <label id="psswrd">Create a strong password:</label>
                            </div>
                            <div className="form-item">
                                <input id="password" type="password" className='form-items' aria-labelledby='psswrd' placeholder="Password" value={form.password} onChange={(e) => handleChange(e,2)} required />
                            </div>
                            <div className="form-item">
                                <button type="submit" className="form-items btn">Register Self</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )

}

export default Registration;