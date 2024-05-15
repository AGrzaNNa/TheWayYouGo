import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = 'https://pihehysekpxwafqzozmg.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaGVoeXNla3B4d2FmcXpvem1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODU0MTYsImV4cCI6MjAzMTM2MTQxNn0.Soy2pfuHpUmo4FHCcVqanR4Gq6HnyFgfBrH2Fok4m3M';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const addUserToUsersTable = async (username, email, password) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const { data, error } = await supabase.from('User').insert([
			{
				username: username,
				email: email,
				password: hashedPassword,
			},
		]);

		if (error) {
			console.error('Error inserting user data:', error);
			return { error };
		}
		console.log('User data inserted:');
		return { data };
	} catch (error) {
		console.error('Error hashing password:', error);
		return { error };
	}
};
