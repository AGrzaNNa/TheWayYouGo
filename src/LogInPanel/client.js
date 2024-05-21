import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'js-sha256';
const supabaseUrl = 'https://pihehysekpxwafqzozmg.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaGVoeXNla3B4d2FmcXpvem1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODU0MTYsImV4cCI6MjAzMTM2MTQxNn0.Soy2pfuHpUmo4FHCcVqanR4Gq6HnyFgfBrH2Fok4m3M';
export const supabase = createClient(supabaseUrl, supabaseKey);
export const LoginUserNameFromTable = async (username, email, password) => {
	try {
		const { data: User, error } = await supabase
			.from('User')
			.select('id')
			.eq('username', username)
			.eq('email', email)
			.eq('password', sha256(password));
		if (User) {
			console.log('User found. User ID:', User[0].id);
			return User[0].id;
		} else if (error) {
			console.error('Error fetching user data:', error);
			return '0';
		} else {
			console.log('User not found.');
			return '0';
		}
	} catch (error) {
		console.error('Error hashing password:', error);
		return '0';
	}
};
