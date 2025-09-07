import { test, expect } from '@playwright/test';

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register');
  });

  test('should display validation errors for empty fields on submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Email is invalid')).toBeVisible();
    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible();
  });

  test('should display validation error for invalid email format', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('Password123');
    await page.getByLabel('Confirm Password').fill('Password123');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Email is invalid')).toBeVisible();
  });

  test('should display validation error for password too short', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('short');
    await page.getByLabel('Confirm Password').fill('short');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Password must be at least 8 characters long')).toBeVisible();
  });

  test('should display validation error for password without number', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Passwordabcd');
    await page.getByLabel('Confirm Password').fill('Passwordabcd');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Password must contain at least one number')).toBeVisible();
  });

  test('should display validation error for password without letter', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123456789');
    await page.getByLabel('Confirm Password').fill('123456789');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Password must contain at least one letter')).toBeVisible();
  });

  test('should display validation error for mismatched passwords', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Password123');
    await page.getByLabel('Confirm Password').fill('Password456');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  // This test assumes a successful registration redirects to the home page ('/')
  // and that the backend is mocked or running to handle the registration.
  test('should successfully register a user and redirect to home', async ({ page }) => {
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Password123');
    await page.getByLabel('Confirm Password').fill('Password123');
    await page.getByRole('button', { name: 'Register' }).click();

    // Assuming successful registration redirects to the home page
    await expect(page).toHaveURL('http://localhost:5173/');
  });
});
