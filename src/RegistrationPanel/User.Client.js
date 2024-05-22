import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'js-sha256';

const supabaseUrl = 'https://pihehysekpxwafqzozmg.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaGVoeXNla3B4d2FmcXpvem1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODU0MTYsImV4cCI6MjAzMTM2MTQxNn0.Soy2pfuHpUmo4FHCcVqanR4Gq6HnyFgfBrH2Fok4m3M';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const addUserToUsersTable = async (
	username,
	email,
	password,
	preferences,
) => {
	try {
		// Insert user into the User table
		const { data: userData, error: userError } = await supabase
			.from('User')
			.insert([
				{
					username: username,
					email: email,
					password: sha256(password),
					preferences: preferences,
				},
			])
			.select();

		if (userError) {
			console.error('Error inserting user data:', userError);
			return { error: userError };
		}

		// Extract the user ID of the newly created user
		const userId = userData[0].id;

		// Prepare the preferences data with the user ID
		const preferencesData = preferences.map((preference) => ({
			user_id: userId,
			preference_value: preference,
		}));

		// Insert preferences into the Preferences table
		const { data: preferencesDataInserted, error: preferencesError } =
			await supabase.from('Preferences').insert(preferencesData);

		if (preferencesError) {
			console.error(
				'Error inserting preferences data:',
				preferencesError,
			);
			return { error: preferencesError };
		}

		console.log('User and preferences data inserted:');
		window.location.href = 'http://localhost:3000/logIn';
		return { userData, preferencesDataInserted };
	} catch (error) {
		console.error('Error:', error);
		return { error };
	}
};
