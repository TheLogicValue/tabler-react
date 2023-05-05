import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './HomePage'
import {
  Empty,
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
  ForgotPasswordPage,
  LoginPage,
  ProfilePage,
  RegisterPage
} from 'pages'

import {
  ButtonPage,
  DataTablesPage,
  IconPage,
  LoadersPage,
  ModalPage,
  TabsPage
} from 'pagesComponents'

import {
  CardsDesignPage,
  CondensedNavPage,
  PricingCardsPage,
  VerticalNavPage
} from 'interface'

const basename = process.env.REACT_APP_BASENAME

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<HomePage />} />        
        <Route path="empty" element={<Empty />} />
        <Route path="400" element={<Error400 />} />
        <Route path="401" element={<Error401 />} />
        <Route path="403" element={<Error403 />} />
        <Route path="404" element={<Error404 />} />
        <Route path="500" element={<Error500 />} />
        <Route path="503" element={<Error503 />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="register" element={<RegisterPage />} />        
        <Route path="button" element={<ButtonPage />} />
        <Route path="dataTables" element={<DataTablesPage />} />
        <Route path="icon" element={<IconPage />} />
        <Route path="loaders" element={<LoadersPage />} />
        <Route path="modal" element={<ModalPage />} />
        <Route path="tabs" element={<TabsPage />} />       
        <Route path="cards" element={<CardsDesignPage />} />
        <Route path="condensed-nav" element={<CondensedNavPage />} />
        <Route path="pricing-cards" element={<PricingCardsPage />} />
        <Route path="vertical-nav" element={<VerticalNavPage />} />        
        <Route path="*" element={<Navigate to={basename} />} />
      </Routes>
    </BrowserRouter>
  )
}