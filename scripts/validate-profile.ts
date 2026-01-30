import fs from 'fs';
import path from 'path';
import { ProfileSchema } from '../src/types/profile';

const profilePath = path.join(process.cwd(), 'src', 'data', 'profile.json');

console.log(`Validating profile data at: ${profilePath}`);

try {
  const rawData = fs.readFileSync(profilePath, 'utf-8');
  const jsonData = JSON.parse(rawData);
  
  const result = ProfileSchema.safeParse(jsonData);
  
  if (result.success) {
    console.log('✅ profile.json is valid!');
    process.exit(0);
  } else {
    console.error('❌ profile.json validation failed:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error reading or parsing profile.json:', error);
  process.exit(1);
}
