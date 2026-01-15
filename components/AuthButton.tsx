
import React from 'react';
import { supabase } from '../services/supabaseClient';

export const AuthButton: React.FC = () => {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Error logging in:', error.message);
    };

    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-stone-600 border border-stone-300 hover:bg-stone-50 hover:shadow-sm transition-all text-sm font-medium"
        >
            <i className="fab fa-google text-red-500 text-lg"></i>
            <span>Sign in with Google</span>
        </button>
    );
};
