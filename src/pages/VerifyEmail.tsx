import type { Component } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { useSearchParams, useNavigate } from '@solidjs/router';
import { useI18n } from '../i18n/I18nContext';
import AuthService from '../service/auth.service';

const VerifyEmail: Component = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [verificationStatus, setVerificationStatus] = createSignal(t('verifyEmailPage.verifying'));
  const authService = new AuthService();

  createEffect(async () => {
    const userId = searchParams.userId;
    const secret = searchParams.secret;

    if (userId && secret) {
      try {
        await authService.completeEmailVerification(userId as string, secret as string);
        setVerificationStatus('Email verified successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setVerificationStatus(t('verifyEmailPage.failed'));
        console.error('Verification error:', error);
      }
    } else {
      setVerificationStatus(t('verifyEmailPage.invalidLink'));
    }
  });

  return (
    <section class="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-lg w-full space-y-8 p-8 bg-white rounded-xl shadow-lg z-10">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('verifyEmailPage.title')}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">{verificationStatus()}</p>
      </div>
    </section>
  );
};

export default VerifyEmail;
