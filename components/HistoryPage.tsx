
import React, { useEffect, useState } from 'react';
import { getReadings, Reading } from '../services/readingsService';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js';

// Simple navigation prop type since we will be adding Router later, 
// but for now we might just render conditionally or expect a navigate function
// Actually, since I am adding Router, I should use Link or useNavigate
import { useNavigate } from 'react-router-dom';

const HistoryPage: React.FC = () => {
    const [readings, setReadings] = useState<Reading[]>([]);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                fetchReadings();
            } else {
                setLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchReadings();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchReadings = async () => {
        setLoading(true);
        const data = await getReadings();
        setReadings(data);
        setLoading(false);
    };

    if (!session) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 font-serif">
                <h2 className="text-2xl font-bold text-stone-800 mb-4">Please log in to view your history.</h2>
                <button onClick={() => navigate('/')} className="text-chef-600 hover:underline">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 font-sans p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif font-bold text-stone-900">Your Readings</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 transition-all font-medium text-sm shadow-sm"
                    >
                        <i className="fas fa-arrow-left"></i>
                        Back to Home
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chef-600"></div>
                    </div>
                ) : readings.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-stone-100">
                        <i className="fas fa-book-open text-4xl text-stone-300 mb-4"></i>
                        <p className="text-lg text-stone-500">No readings found yet.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 text-chef-600 font-semibold hover:underline"
                        >
                            Start your first reading
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {readings.map((reading) => (
                            <div key={reading.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-chef-100 text-chef-700 text-xs font-bold mb-2">
                                            {reading.mode}
                                        </span>
                                        <h3 className="text-xl font-bold text-stone-800">{reading.user_query}</h3>
                                    </div>
                                    <span className="text-sm text-stone-400">
                                        {new Date(reading.timestamp).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="prose prose-stone max-w-none text-stone-600 mb-4 text-sm line-clamp-3">
                                    {reading.ai_analysis}
                                </div>

                                {/* Card Display (Simplified) */}
                                {reading.cards_drawn && reading.cards_drawn.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {reading.cards_drawn.map((card, idx) => (
                                            <div key={idx} className="bg-stone-100 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 whitespace-nowrap">
                                                {card}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
