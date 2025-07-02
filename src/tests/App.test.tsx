/// <reference types="vitest" />
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from '../App';
import { store } from '../store';
import i18n from '../i18n';

describe('App', () => {
  it('renderiza el título principal', () => {
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});