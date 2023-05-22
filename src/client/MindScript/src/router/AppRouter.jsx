import { Route, Routes, Navigate } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { AppRoutes } from "../app/routes/AppRoutes"
import { useSelector } from "react-redux"
import { CheckingAuth } from "../ui/components/CheckingAuth"
import { useCheckAuth } from "../hooks"

export const AppRouter = () => {


  const status = useCheckAuth();;

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === 'authenticated')

          // Si esta autenticado pueden exisitr las Rutas App
          ? <Route path="/*" element={<AppRoutes />} />
          // Rutas registro y login
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      {/* Cualquier otra ruta que no esté definida los redirige a: */}
      <Route path='/*' element={<Navigate to='/auth/login' />} />

    </Routes>
  )
}
