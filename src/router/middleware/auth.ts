// authMiddleware.ts
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router' // Importa los tipos necesarios desde Vue Router

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const isAuthenticated = localStorage.getItem('authToken')

  if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' })
  } else if (!isAuthenticated && to.name !== 'Login') {
    next({ name: 'Login' })
  } else if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Home') {
    next({ name: 'Home' })
  }
}
