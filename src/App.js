
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddClient from './components/AddClient';
// import NewHome from './components/NewHome';
import CreateInvoice from './components/CreateInvoice';
import FindClient from './components/FindClient';
import AddNewClient from './components/AddNewClient';
import Create_Invoice2 from './components/Create_Invoice2';
import UserProfile from './components/UserProfile';
import Clients from './components/Clients';
import EditClient from './components/EditClient';
import Privacypolicy from './components/Privacypolicy';
import FinalStep from './components/FinalStep';
import Preview from './components/Preview';
import Invoices from './components/Invoices';
// import ViewInvoice from './components/ViewInvoice';
import ViewSingInvoice from './components/ViewSingInvoice';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/addclient' element={<AddClient></AddClient>}></Route>
        {/* <Route path='/newhome' element={<NewHome></NewHome>}></Route> */}
        <Route path='/createinvoice' element={<CreateInvoice></CreateInvoice>}></Route>
        <Route path='/findclient' element={<FindClient></FindClient>}></Route>
        <Route path='/addnewclient' element={<AddNewClient></AddNewClient>}></Route>
        <Route path='/createinvoice2/:id' element={<Create_Invoice2></Create_Invoice2>}></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/clients' element={<Clients></Clients>}></Route>
        <Route path='/editclient/:id' element={<EditClient></EditClient>}></Route>
        <Route path='/privacypolicy' element={<Privacypolicy></Privacypolicy>}></Route>
        <Route path='/finalstep/:id' element={<FinalStep></FinalStep>}></Route>
        <Route path='/preview/:id' element={<Preview></Preview>}></Route>
        <Route path='/invoices' element={<Invoices></Invoices>}></Route>
        {/* <Route path='/viewinvoice/:id' element={<ViewInvoice></ViewInvoice>}></Route> */}
        <Route path='/viewsingleinvoice/:id' element={<ViewSingInvoice></ViewSingInvoice>}></Route>
      </Routes>
    </div>
  )
}

export default App;
