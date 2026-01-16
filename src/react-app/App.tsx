import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Header from './components/Header'
// Lazy load components para melhor performance
const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const AuthProtect = lazy(() => import('./components/AuthProtect'))
const UnsubscribePage = lazy(() => import('./pages/UnsubscribePage'))
const ProcessDetailPage = lazy(() => import('./pages/ProcessDetailPage'))
const ClientPortal = lazy(() => import('./pages/ClientPortal'))
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'))
const CheckoutErrorPage = lazy(() => import('./pages/CheckoutErrorPage'))
const CheckoutCancelPage = lazy(() => import('./pages/CheckoutCancelPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white">Carregando...</p>
    </div>
  </div>
)

export default function App() {
  const location = useLocation()
  const hideHeaderPaths = ['/login']
  const showHeader = !hideHeaderPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-slate-900">
      {showHeader && <Header />}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          <Route path="/process/:id" element={<ProcessDetailPage />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/error" element={<CheckoutErrorPage />} />
          <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Protected Routes */}
          <Route element={<AuthProtect />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}
