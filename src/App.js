import { BrowserRouter as Router,Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import { useState } from "react";
import CartPage from "./pages/CartPage";
import OrderSuccesfulPage from "./pages/OrderSuccesfulPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";

function App() {
  const [cart,setCart] = useState([])
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  return (
   <div>
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}/>
        <Route path="/sepet" element={<CartPage cart={cart} setCart={setCart} setIsOrderSuccessful={setIsOrderSuccessful}></CartPage>}/>
        <Route path="/login" element={<LoginPage cart={cart} ></LoginPage>}/>
        <Route path="/register" element={<RegisterPage cart={cart} ></RegisterPage>}/>
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage cart={cart} />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<ProductPage cart={cart}></ProductPage>}/>
        <Route path="/order-success" element={isOrderSuccessful ? <OrderSuccesfulPage cart={cart} /> : <Navigate to="/" />} />

        <Route path="/products/:id" element={<ProductDetail cart={cart}
        setCart={setCart}
        ></ProductDetail>}/>



      </Routes>
    </Router>
   </div>
  );
}

export default App;
