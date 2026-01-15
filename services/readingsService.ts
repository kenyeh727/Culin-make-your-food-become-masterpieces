
import { supabase } from './supabaseClient';

export interface Reading {
    id: string;
    user_id: string;
    mode: 'Tarot' | 'Lenormand';
    user_query: string;
    cards_drawn: string[];
    ai_analysis: string;
    image_urls: string[];
    timestamp: string;
}

export const saveReading = async (reading: Omit<Reading, 'id' | 'timestamp' | 'user_id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error('User not logged in, cannot save reading');
        return null;
    }

    const { data, error } = await supabase
        .from('readings_history')
        .insert([
            { ...reading, user_id: user.id }
        ])
        .select();

    if (error) {
        console.error('Error saving reading:', error);
        return null;
    }
    return data?.[0];
};

export const getReadings = async (): Promise<Reading[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('readings_history')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(20);

    if (error) {
        console.error('Error fetching readings:', error);
        return [];
    }
    return data as Reading[];
};
