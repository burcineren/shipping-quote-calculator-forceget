import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Şifre eşleşmesi kontrolü
    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match' });
      return; 
    }

    // Kullanıcı zaten varsa hata döndür
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return; 
    }

    // Şifreyi hash'le ve kullanıcıyı kaydet
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Token oluştur
    const token = generateToken({ id: user._id, email: user.email });

    // Başarılı yanıt gönder
    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    // Sunucu hatası yanıtı
    res.status(500).json({ error: 'Registration failed', details: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user._id, email: user.email });
    res.status(200).json({ message: 'Login successful', token });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });
    return;
  }
};
