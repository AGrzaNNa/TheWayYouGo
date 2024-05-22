import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'js-sha256';

const supabaseUrl = 'https://pihehysekpxwafqzozmg.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaGVoeXNla3B4d2FmcXpvem1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODU0MTYsImV4cCI6MjAzMTM2MTQxNn0.Soy2pfuHpUmo4FHCcVqanR4Gq6HnyFgfBrH2Fok4m3M';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const addPreferencesToTable = async (preferences) => {
	try {
		const { datas, errors } = await supabase.from('Preferences').insert([
			{
				preferences: preferences,
			},
		]);
		if (errors) {
			console.error('Error inserting preferences data:', errors);
			return { errors };
		}
		console.log('Preference data inserted:');
	} catch (error) {
		console.error('Error adding the preferences:', error);
		return { error };
	}
};
