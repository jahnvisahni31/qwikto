'use client';
import React, { useState } from "react";
import style from '../../Styles/user.module.css';
import './changePassword.css';
import BASE_URL from "@/appConfig";

export default function ChangePasswordForm({ token, onClose }) {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/customer/changePassword`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
            });

            if (response.ok) {
                setMessage('Password updated successfully!');
                setTimeout(() => {
                    setMessage("");
                    onClose();
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to update password.');
                setTimeout(() => setMessage(""), 2000);
            }
        } catch (error) {
            setMessage('Error updating password.');
        }
    };

    return (
        <div classNameName={style.changePasswordForm}>
            <div className="containerForChangePassword">
            <p classNameName={style.error}>{message}</p>
                <div className="heading">Change Passsword</div>
                <form className="form" action="">
                    <div className="input-field">
                        <input
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            type="text"
                            name="text"
                            id="password"
                            placeholder="Current Password"
                        />
                    </div>
                    <div className="input-field">
                        <input
                             type="password"
                             value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                             required
                            autoComplete="off"
                            name="txt"
                            id="passwod"
                            placeholder="New Password"
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="off"
                            name="text"
                            id="password"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="btn-container">
                        <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                        <button className="btn" type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
