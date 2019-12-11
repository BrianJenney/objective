// Manually Generated (should move this to SSR)
// Each Store should have it's own JWT secret set in the store
export const createAnonymousToken = () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZV9jb2RlIjoiT0JKIiwiYWNjb3VudF90eXBlIjoiYW5vbnltb3VzIiwiaWF0IjoxNTE2MjM5MDIyfQ.tPAZ7Y_cFmpsHlnE_jgLagJwlEc-BXi7DKyesQ9PTuA';
  } else {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZV9jb2RlIjoiT0JKIiwiYWNjb3VudF90eXBlIjoiYW5vbnltb3VzIiwiaWF0IjoxNTE2MjM5MDIyfQ.XOFHobfWcaZ4xD-e4xnckPx9Y_BLUK-Tj5vwRUYDmJ0';
  }
};