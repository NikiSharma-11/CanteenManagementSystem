import { useContext } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AddFood from './pages/AddFood';
import UpdateFood from './pages/UpdateFood';
import Logout from './pages/Logout';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'; 
import GuestNav from './components/NavBar/GuestNav';
import AdminNav from './components/NavBar/AdminNav';
import UserNav from './components/NavBar/UserNav';
import AuthContext from './context/AuthContext';
import AuthContextProvider from './context/AuthState';
import DisplayFood from './pages/Item/DisplayFood';
import DisplayCart from './pages/Cart/DisplayCart';
import KhaltiPayment from './pages/payment/KhaltiPayment';
import Search from './Search/Search';
import Notification from './pages/Notification/Notification';
import StaffNav from './components/NavBar/StaffNav';
import Orders from './pages/Orders/Orders';
import DisplayUser from './pages/User/DisplayUser';
import UpdateUser from './pages/User/UpdateUser';
import SuccessPage from './pages/payment/SuccessPage';
import PaymentPage from './pages/payment/PaymentPage';
import ViewUser from './pages/Staff/ViewUser';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import ViewTransaction from './pages/Transaction/ViewTransaction';
import UserTransaction from './pages/Transaction/UserTransaction';
import UpdateOrder from './pages/Orders/UpdateOrder';
import UserNotification from './pages/Notification/UserNotification';
import Star from './pages/Reviews/Star';
import AdminDash from './pages/AdminDash';



const NavElement=()=>{
  const{authenticated,role}=useContext(AuthContext);
  let navbar;
  if(!authenticated){
    navbar=<GuestNav/>
  }
  else{
    switch(role){
      case 'admin':
        navbar=<AdminNav/>
        break;
      case 'customer':
        navbar=<UserNav/>
        break;

        case 'staff':
        navbar=<StaffNav/>
        break;

      default:
        navbar=<GuestNav/>
        break;
    }
  }
  return navbar;
}
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavElement/>}> 
     <Route index element={<Home/>}/> 
     <Route path="/about" element={<About/>}/> 
     <Route path="/signUp" element={<SignUp/>}/> 
     <Route path="/login" element={<Login/>}/>
     <Route path="/addFood" element={<AddFood/>}/>
     <Route path="/updateFood/:id" element={<UpdateFood/>}/>
     <Route path="/logout" element={<Logout/>}/>
     <Route path="/displayFood" element={<DisplayFood/>}/>
     <Route path="/displayCart" element={<DisplayCart/>}/>
     <Route path="/khalti" element={<KhaltiPayment/>}/>
     <Route path="/searchFood" element={<Search/>}/>
     <Route path="/notification" element={<Notification/>}/>
     <Route path="/orders" element={<Orders/>}/>
     <Route path="/displayUser" element={<DisplayUser/>}/>
     <Route path="/updateUser/:id" element={<UpdateUser/>}/>
     <Route path="/success" element={<SuccessPage/>}/>
     <Route path="/khaltiPayment" element={<KhaltiPayment/>}/>
     <Route path="/paymentPage/:id" element={<PaymentPage/>}/>
     <Route path="/viewUser" element={<ViewUser/>}/>
     <Route path="/foodDetails/:id" element={<FoodDetails/>}/>
     <Route path="/viewTransaction" element={<ViewTransaction/>}/>
     <Route path="/userTransaction" element={<UserTransaction/>}/>
     <Route path="/updateOrder/:id" element={<UpdateOrder/>}/>
     <Route path="/userNotification" element={<UserNotification/>}/>
     <Route path="/star" element={<Star/>}/>
     <Route path="/adminDash" element={<AdminDash/>}/>
    </Route>
    )

)

function App() {
  return (
    <>
    <Provider store={store}>
    <AuthContextProvider > 
    <RouterProvider router={router}/>
    </AuthContextProvider>
    </Provider>
    
    </>
          
  );
}

export default App;
