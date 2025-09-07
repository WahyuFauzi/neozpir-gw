import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import AuthService from '../service/auth.service';
import { useAuthContext } from '../context/auth.context';
import { useI18n } from '../i18n/I18nContext';

const Register: Component = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [emailError, setEmailError] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [passwordError, setPasswordError] = createSignal('');
  const [confirmPasswordError, setConfirmPasswordError] = createSignal('');
  const { auth, setAuth } = useAuthContext();
  const { t } = useI18n();
  const navigate = useNavigate();
  const authService = new AuthService();

  createEffect(() => {
    if (auth()?.session) {
      navigate('/');
    }
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'registerPage.emailInvalid';
    }
    return '';
  };

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return 'registerPage.passwordTooShort';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'registerPage.passwordNoNumber';
    }
    if (!/[a-zA-Z]/.test(pwd)) {
      return 'registerPage.passwordNoLetter';
    }
    return '';
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const emailValidationMessage = validateEmail(email());
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError('');
    }

    const pwdValidationMessage = validatePassword(password());
    if (pwdValidationMessage) {
      setPasswordError(pwdValidationMessage);
      return;
    } else {
      setPasswordError('');
    }

    if (password() !== confirmPassword()) {
      setConfirmPasswordError('registerPage.confirmPasswordMismatch');
      return;
    } else {
      setConfirmPasswordError('');
    }

    try {
      await authService.createUser(email(), password(), name());
      const user = await authService.getCurrentUser();
      if (user) {
        const jwt = await authService.getJwt();
        setAuth({ session: user, providedToken: jwt });
      }
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="min-w-lg px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">{t('registerPage.title')}</h3>
        <form onSubmit={handleSubmit}>
          <div class="mt-4">
            <div>
              <label class="block" for="name">
                {t('registerPage.nameLabel')}
              </label>
              <input
                type="text"
                placeholder={t('registerPage.namePlaceholder')}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                required
              />
            </div>
            <div class="mt-4">
              <label class="block" for="email">
                {t('registerPage.emailLabel')}
              </label>
              <input
                type="email"
                placeholder={t('registerPage.emailPlaceholder')}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
              />
              {emailError() && <p class="text-red-500 text-xs mt-1">{t(emailError())}</p>}
            </div>
            <div class="mt-4">
              <label class="block">{t('registerPage.passwordLabel')}</label>
              <input
                type="password"
                placeholder={t('registerPage.passwordPlaceholder')}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                required
              />
              {passwordError() && <p class="text-red-500 text-xs mt-1">{t(passwordError())}</p>}
            </div>
            <div class="mt-4">
              <label class="block">{t('registerPage.confirmPasswordLabel')}</label>
              <input
                type="password"
                placeholder={t('registerPage.confirmPasswordPlaceholder')}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={confirmPassword()}
                onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                required
              />
              {confirmPasswordError() && (
                <p class="text-red-500 text-xs mt-1">{t(confirmPasswordError())}</p>
              )}
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('registerPage.registerButton')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
