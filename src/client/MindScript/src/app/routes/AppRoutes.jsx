import { Navigate, Routes, Route } from "react-router-dom"
import { AppPage } from "../pages/AppPage"
import { SHomePage, SModulesPage, PHomePage, ARequest, PModulesPage, MultiOpt, PManage } from "../pages"
import { WorkEnv } from "../pages/student/WorkEnv"
import { AManage } from "../pages"
import { ASyllabus } from "../pages/admin/ASyllabus"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <AppPage /> } />
        <Route path="student/home" element={ <SHomePage /> } />        
        <Route path="student/modules" element={ <SModulesPage /> } />
        <Route path="student/modules/:group" element={ <SModulesPage /> } />
        <Route path="student/workenv" element={ <WorkEnv /> } />
        <Route path="student/multiopt" element={ <MultiOpt /> } />
        <Route path="professor/home" element={ <PHomePage /> } />
        <Route path="professor/modules" element={ <PModulesPage /> } />
        <Route path="professor/modules/:group" element={ <PModulesPage /> } />
        <Route path="professor/management" element={ <PManage /> } />
        <Route path="admin/management" element={ <AManage /> } />
        <Route path="admin/syllabus" element={ <ASyllabus /> } />        
        <Route path="admin/request" element={ <ARequest /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>

  )
}
