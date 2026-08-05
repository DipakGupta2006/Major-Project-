import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const SetMasterPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;

    const [masterPassword, setMasterPassword] = useState('');
    const [confirmMasterPassword, setConfirmMasterPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axiosInstance.post('/set-master-password', {
                userId,
                masterPassword,
                confirmMasterPassword,
            });

            if (res.data.success) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-yellow-500/20">
                <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center">
                    Set Master Password
                </h2>
                <p className="text-gray-400 text-sm text-center mb-6">
                    This password protects your vault. Don't forget it.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-300 text-sm mb-1 block">
                            Master Password
                        </label>
                        <input
                            type="password"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                            value={masterPassword}
                            onChange={(e) => setMasterPassword(e.target.value)}
                            placeholder="Min 8 characters"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm mb-1 block">
                            Confirm Master Password
                        </label>
                        <input
                            type="password"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                            value={confirmMasterPassword}
                            onChange={(e) => setConfirmMasterPassword(e.target.value)}
                            placeholder="Re-enter master password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Setting...' : 'Set Master Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetMasterPassword;