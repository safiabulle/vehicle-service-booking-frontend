import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/customer/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminRoute from "../components/common/AdminRoute";

import VehicleList from "../pages/vehicles/VehicleList";
import AddVehicle from "../pages/vehicles/AddVehicle";
import EditVehicle from "../pages/vehicles/EditVehicle";

import ServiceList from "../pages/services/ServiceList";
import AddService from "../pages/services/AddService";
import EditService from "../pages/services/EditService";

import AppointmentList from "../pages/appointments/AppointmentList";
import BookAppointment from "../pages/appointments/BookAppointment";

import PaymentList from "../pages/payments/PaymentList";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              {user?.role === "ADMIN" ? (
                <AdminDashboard />
              ) : (
                <Dashboard />
              )}
            </ProtectedRoute>
          }
        />

        {/* Vehicles (Customers only) */}

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehicleList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/add"
          element={
            <ProtectedRoute>
              <AddVehicle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/edit/:id"
          element={
            <ProtectedRoute>
              <EditVehicle />
            </ProtectedRoute>
          }
        />

        {/* Services */}

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServiceList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/add"
          element={
            <AdminRoute>
              <AddService />
            </AdminRoute>
          }
        />

        <Route
          path="/services/edit/:id"
          element={
            <AdminRoute>
              <EditService />
            </AdminRoute>
          }
        />

        {/* Appointments */}

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments/book"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        {/* Payments */}

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <PaymentList />
            </ProtectedRoute>
          }
        />

        {/* Authentication */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;