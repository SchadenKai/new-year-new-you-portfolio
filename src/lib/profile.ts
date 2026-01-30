import profileData from '../data/profile.json';
import { Profile, ProfileSchema } from '../types/profile'; // Assuming I named the file src/types/profile.ts

// Runtime check to be safe
const result = ProfileSchema.safeParse(profileData);

if (!result.success) {
  console.error("Profile data validation failed at runtime:", result.error);
}

// Cast to simple Profile interface
export const profile = profileData as unknown as Profile; 
