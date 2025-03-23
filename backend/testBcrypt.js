import bcrypt from 'bcryptjs';

async function testBcrypt() {
  const testPassword = 'sayo12345'; // Ganti dengan password lama yang dipakai user
  const storedHash = '$2b$10$abcdefghijklmnopqrstuvwx'; // Ganti dengan hash password dari database Supabase

  const isMatch = await bcrypt.compare(testPassword, storedHash);
  console.log('🔍 Apakah hash cocok dengan password lama?', isMatch);
}

testBcrypt();
