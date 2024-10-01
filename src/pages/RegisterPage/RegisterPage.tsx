import React, { useState } from 'react';
import './RegisterPage.css'; // Подключаем стили

function RegisterPage() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error('Ошибка при регистрации.');
            }

            setSuccess(true);
            setFormData({ username: '', password: '', firstName: '', lastName: '', email: '' });
            setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Не удалось зарегистрироваться. Попробуйте еще раз.');
            setSuccess(false);
        }
    };

    return (
        <div className="register-page">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Вы успешно зарегистрировались!</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="userName" 
                    placeholder="Имя пользователя" 
                    value={formData.userName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Пароль" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Имя" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Фамилия" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}

export default RegisterPage;
