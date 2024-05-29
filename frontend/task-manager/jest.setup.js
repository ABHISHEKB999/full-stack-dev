// jest.setup.js
import { TextDecoder, TextEncoder } from 'text-encoding';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
