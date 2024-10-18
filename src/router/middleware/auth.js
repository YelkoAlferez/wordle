export function authMiddleware(to, from, next) {
  const isAuthenticated = localStorage.getItem('authToken');

  if (to.name === 'Login' && isAuthenticated) {
      next({ name: 'Home' });
  } else if (!isAuthenticated && to.name !== 'Login') {
      next({ name: 'Login' });
  } else {
      next(); 
}
