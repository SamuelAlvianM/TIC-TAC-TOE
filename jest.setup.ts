import '@testing-library/jest-dom';


expect.extend({});

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/navigation', () => require('next-router-mock'));
