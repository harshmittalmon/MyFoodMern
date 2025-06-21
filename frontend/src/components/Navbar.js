import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
    const [cartView,setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    const onClose = () => setCartView(false);
    const loadCart = () => {
        setCartView(true)
    }
    const items = useCart();
    return (

        <nav className="navbar navbar-expand-lg bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Foodzania</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto ">
                        <li className="nav-item">
                            <Link className="nav-link active fs-5" aria-current="page" to="#">Home</Link>
                        </li>
                        {
                            (localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="#">My Orders</Link>
                                </li> : ""
                        }


                    </ul>
                    <div className='d-flex '>
                        {
                            (localStorage.getItem("authToken")) ?
                                <div>
                                    <div className='btn bg-white text-success mx-2' onClick={()=>setCartView(true)}> My cart {" "}
                                        <Badge pill bg="danger" >{items.length} </Badge>
                                    </div>
                                    {cartView? <Modal onClose={onClose}><Cart/></Modal>:null}
                                    <div className='btn bg-white text-danger mx-2' onClick={handleLogout}> Logout </div>
                                </div> : <div><Link className="btn bg-white text-success mx-1" to="login">Login</Link>

                                    <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link></div>

                        }


                    </div>
                </div>
            </div>
        </nav>

    )
}
