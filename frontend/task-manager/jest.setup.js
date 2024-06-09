import { TextDecoder, TextEncoder } from 'text-encoding';
import '@testing-library/jest-dom';


global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;


jest.mock('firebase/app', () => {
  const originalModule = jest.requireActual('firebase/app');
  return {
    ...originalModule,
    initializeApp: jest.fn(() => ({})),
  };
});

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(() => ({})),
  };
});

jest.mock('firebase/firestore', () => {
  const originalModule = jest.requireActual('firebase/firestore');
  return {
    ...originalModule,
    getFirestore: jest.fn(() => ({})),
  };
});

jest.mock('firebase/storage', () => {
  const originalModule = jest.requireActual('firebase/storage');
  return {
    ...originalModule,
    getStorage: jest.fn(() => ({})),
  };
});

