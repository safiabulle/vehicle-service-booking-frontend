import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<h1>Vehicle Service Booking System</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;