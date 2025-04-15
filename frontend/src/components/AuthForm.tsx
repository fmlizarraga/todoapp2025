import { useState } from 'react';
import '../styles/auth-form.css';

type AuthFormProps = {
    isRegistering: boolean;
    onLogin: (email: string, password: string) => void;
    onRegister: (name: string, email: string, password: string) => void;
    onToggleForm: () => void;
};

export const AuthForm = ({ isRegistering, onLogin, onRegister, onToggleForm }: AuthFormProps) => {
    // const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegistering) {
            if (password !== confirmPassword) {
                alert('The passwords do not match');
                return;
            }
            if (!acceptedTerms) {
                alert('You must accept the terms and conditions');
                return;
            }
            onRegister(name, email, password);
        } else {
            onLogin(email, password);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>

            {isRegistering && (
                <input
                    type="text"
                    placeholder="Display name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {isRegistering && (
                <>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label className="terms-checkbox">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        I accept the terms and conditions
                    </label>
                </>
            )}

            <button type="submit">
                {isRegistering ? 'Register' : 'Login'}
            </button>

            <p className="toggle-auth">
                {isRegistering ? 'You have an account already?' : 'Don\'t have an account?'}
                <button
                    type="button"
                    className="link-button"
                    onClick={onToggleForm}
                >
                    {isRegistering ? 'Login' : 'Register'}
                </button>
            </p>
        </form>
    );
};
