import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {createClient} from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
const port = 3000;

// Setup Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {autoRefreshToken: false, persistSession: false},
  },
);

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fungsi untuk mengirim email OTP
const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Vooid Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Kode OTP Reset Password',
      text: `Kode OTP Anda adalah: ${otp}. Berlaku selama 10 menit.`,
    });

    console.log('OTP berhasil dikirim ke:', email);
  } catch (error) {
    console.error('Gagal mengirim OTP:', error);
  }
};

// 1. Generate and Send OTP
app.post('/request-otp', async (req, res) => {
  const {email} = req.body;
  console.log('Received OTP request for:', email);

  try {
    // 1️⃣ Cek apakah ada OTP yang masih aktif di database
    const currentTime = new Date().toISOString();
    const {data: existingOtp, error: checkError} = await supabase
      .from('password_reset_otp')
      .select('*')
      .eq('email', email)
      .gte('expires', currentTime) // Pastikan OTP masih berlaku
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // Kesalahan selain data tidak ditemukan
      console.error('Database error (check OTP):', checkError);
      return res.status(500).json({error: 'Database error'});
    }

    if (existingOtp) {
      // 2️⃣ Jika OTP masih valid, langsung kirim ulang OTP yang ada
      console.log('Existing OTP is still valid, resending the same OTP');
      await sendOtpMail(email, existingOtp.otp);
      return res.status(200).json({message: 'OTP resent successfully'});
    }

    // 3️⃣ Jika OTP ada tetapi sudah expired, hapus OTP lama
    await supabase.from('password_reset_otp').delete().eq('email', email);

    // 4️⃣ Buat OTP baru
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60000).toISOString(); // Expired dalam 10 menit

    const {data, error} = await supabase.from('password_reset_otp').insert([
      {
        email: email,
        otp: otp,
        expires: expires,
      },
    ]);

    if (error) {
      console.error('Database error (insert OTP):', error);
      return res.status(500).json({error: 'Failed to generate OTP'});
    }

    // 5️⃣ Kirim email OTP baru
    console.log('Sending new OTP to:', email);
    await sendOtpMail(email, otp);
    console.log('OTP email sent successfully');

    res.status(200).json({message: 'OTP sent successfully'});
  } catch (error) {
    console.error('Request OTP error:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

// 2. Verify OTP
app.post('/verify-otp', async (req, res) => {
  const {email, otp} = req.body;
  console.log(`Verifying OTP for: ${email} - OTP: ${otp}`);

  try {
    const {data, error} = await supabase
      .from('password_reset_otp')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .gte('expires', new Date().toISOString())
      .single();

    console.log('Verify OTP Result:', {data, error});

    if (error || !data) {
      return res.status(400).json({error: 'Invalid or expired OTP'});
    }

    res.status(200).json({valid: true, email}); // Pastikan email dikembalikan
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// 3. Reset Password
app.post('/reset-password', async (req, res) => {
  const {email, newPassword} = req.body;
  console.log('📩 Email dari request:', email || 'undefined');
  console.log('🔑 Password dari request:', newPassword || 'undefined');

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({error: 'Email and password fields are required'});
  }

  try {
    const {data: users, error: listError} =
      await supabase.auth.admin.listUsers();

    if (listError) throw listError;

    console.log('🔎 Daftar Users:', users);

    const user = users.users.find(u => u.email === email.trim());

    if (!user) {
      console.log('❌ User tidak ditemukan:', email);
      return res.status(400).json({error: 'User not found'});
    }

    console.log('✅ User ditemukan:', user);

    const {error: updateError} = await supabase.auth.admin.updateUserById(
      user.id,
      {
        password: newPassword.trim(),
      },
    );

    if (updateError) throw updateError;

    await supabase.from('password_reset_otp').delete().eq('email', email);

    res.status(200).json({message: 'Password reset successfully'});
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({error: error.message});
  }
});

const handleChangePassword = async (email, newPassword) => {
  try {
    // 🔎 1️⃣ Dapatkan `user_id` berdasarkan email
    const {data: user, error: userError} = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !user) {
      throw new Error('User not found');
    }

    const userId = user.id;

    // 🔍 2️⃣ Cek apakah ada password lama di tabel `users_passwords`
    const {data: oldPasswordData, error: oldPasswordError} = await supabase
      .from('users_passwords')
      .select('previous_password')
      .eq('user_id', userId)
      .single();

    if (oldPasswordError) {
      console.warn('⚠ Tidak ada password lama yang tersimpan, lanjutkan reset');
    } else {
      // 🔑 3️⃣ Bandingkan password baru dengan password lama
      const isSamePassword = await bcrypt.compare(
        newPassword,
        oldPasswordData.previous_password,
      );
      if (isSamePassword) {
        return {
          success: false,
          error: 'Password baru tidak boleh sama dengan password lama',
        };
      }
    }

    // 🔐 4️⃣ Hash password baru
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 🔄 5️⃣ Update password di Supabase Auth
    const {error: updateError} = await supabase.auth.admin.updateUserById(
      userId,
      {
        password: newPassword,
      },
    );

    if (updateError) {
      throw new Error('Gagal memperbarui password');
    }

    // 📝 6️⃣ Simpan hash password lama ke `users_passwords`
    const {error: savePasswordError} = await supabase
      .from('users_passwords')
      .upsert({user_id: userId, previous_password: hashedPassword});

    if (savePasswordError) {
      console.warn('⚠ Gagal menyimpan password lama:', savePasswordError);
    }

    return {success: true};
  } catch (error) {
    console.error('❌ Reset Password Error:', error);
    return {success: false, error: error.message};
  }
};

app.post('/change-password', async (req, res) => {
  const {userId, oldPassword, newPassword} = req.body;
  console.log('🔄 Permintaan Ubah Password:', {
    userId,
    oldPassword,
    newPassword,
  });

  if (!userId || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({error: 'User ID, password lama, dan password baru diperlukan'});
  }

  try {
    // 1️⃣ Ambil password hash lama dari tabel users_passwords
    const {data: oldPasswords, error: oldPasswordError} = await supabase
      .from('users_passwords')
      .select('previous_password')
      .eq('user_id', userId)
      .order('created_at', {ascending: false}) // Ambil password terbaru
      .limit(1);

    if (oldPasswordError) throw oldPasswordError;
    if (!oldPasswords.length) {
      return res.status(400).json({error: 'Password lama tidak ditemukan'});
    }

    const oldPasswordHash = oldPasswords[0].previous_password;
    console.log('🔒 Hash password lama:', oldPasswordHash);

    // 2️⃣ Bandingkan password lama dengan input user
    const isValidOldPassword = await bcrypt.compare(
      oldPassword.trim(),
      oldPasswordHash,
    );
    console.log('🔍 Apakah password lama valid?', isValidOldPassword);

    if (!isValidOldPassword) {
      return res.status(400).json({error: 'Password lama salah'});
    }

    // 3️⃣ Cek apakah password baru sama dengan password lama
    const isSamePassword = await bcrypt.compare(
      newPassword.trim(),
      oldPasswordHash,
    );
    if (isSamePassword) {
      return res
        .status(400)
        .json({error: 'Password baru tidak boleh sama dengan sebelumnya'});
    }

    // 4️⃣ Hash password baru
    const hashedNewPassword = await bcrypt.hash(newPassword.trim(), 10);

    // 5️⃣ Update password di Supabase Auth
    const {error: updateError} = await supabase.auth.admin.updateUserById(
      userId,
      {
        password: newPassword.trim(),
      },
    );

    if (updateError) throw updateError;

    // 6️⃣ Simpan hash password baru ke tabel
    const {error: insertError} = await supabase
      .from('users_passwords')
      .insert([{user_id: userId, previous_password: hashedNewPassword}]);

    if (insertError) throw insertError;

    res.status(200).json({message: 'Password berhasil diubah'});
  } catch (error) {
    console.error('❌ Change Password Error:', error);
    res.status(500).json({error: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
