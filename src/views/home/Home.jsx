import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoffee, FaUtensils, FaConciergeBell } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="home-container d-flex justify-content-center align-items-center bg-dark text-light">
            <div className="container text-center p-4">
                <div className="background-image">
                    <h1 className="h3 h-md-1 mb-4 text-warning">Bienvenido a <span className="text-warning">Café Planta</span></h1>
                    <p className="lead mb-4">Descubre nuestros deliciosos productos y ofertas exclusivas.</p>

                    <div className="product-demo mb-3">
                        <h2 className="mb-4">Aquí Podrás Encontrar Copete</h2>
                        <div className="d-flex flex-column flex-md-row justify-content-center">
                            <div className="product-item p-3 m-2 bg-secondary rounded shadow-sm text-center">
                                <FaCoffee size={50} className="text-warning mb-3" />
                                <h3 className="h5">Bebidas</h3>
                                <p>Café, té y más opciones deliciosas.</p>
                            </div>
                            <div className="product-item p-3 m-2 bg-secondary rounded shadow-sm text-center">
                                <FaUtensils size={50} className="text-warning mb-3" />
                                <h3 className="h5">Comida</h3>
                                <p>Snacks y platillos para acompañar tu bebida.</p>
                            </div>
                            <div className="product-item p-3 m-2 bg-secondary rounded shadow-sm text-center">
                                <FaConciergeBell size={50} className="text-warning mb-3" />
                                <h3 className="h5">Combos</h3>
                                <p>Disfruta de nuestras ofertas especiales.</p>
                            </div>
                        </div>
                    </div>

                    <Link to="/login" className="btn btn-warning btn-lg">Ir a Iniciar Sesión</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
