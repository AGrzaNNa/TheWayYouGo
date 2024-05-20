import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
const supabaseUrl = 'https://pihehysekpxwafqzozmg.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaGVoeXNla3B4d2FmcXpvem1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODU0MTYsImV4cCI6MjAzMTM2MTQxNn0.Soy2pfuHpUmo4FHCcVqanR4Gq6HnyFgfBrH2Fok4m3M';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const LoginUserNameFromTable = async (username, email, password) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);
		const { data: User, error } = await supabase
			.from('User')
			.select('id')
			.eq('username', username)
			.eq('email', email);
		// .eq('password', hashedPassword);
		if (User) {
			console.log('User found. User ID:', User);
			return { userId: data.id };
		} else if (error) {
			console.error('Error fetching user data:', error);
			return { error };
		} else {
			console.log('User not found.');
			return { userId: null };
		}
	} catch (error) {
		console.error('Error hashing password:', error);
		return { error };
	}
};
