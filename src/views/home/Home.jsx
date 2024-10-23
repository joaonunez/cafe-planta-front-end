import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoffee, FaUtensils, FaConciergeBell } from 'react-icons/fa'; // Importa los íconos que desees

const Home = () => {
    return (
        <div className="home-container">
            <div className="background-image">
                <h1>Bienvenido a Café Planta</h1>
                <p>Descubre nuestros deliciosos productos y ofertas exclusivas.</p>

                <div className="product-demo">
                    <h2>Aquí Podrás Encontrar</h2>
                    <div className="product-list">
                        <div className="product-item">
                            <FaCoffee size={50} />
                            <h3>Bebidas</h3>
                            <p>Café, té y más opciones deliciosas.</p>
                        </div>
                        <div className="product-item">
                            <FaUtensils size={50} />
                            <h3>Comida</h3>
                            <p>Snacks y platillos para acompañar tu bebida.</p>
                        </div>
                        <div className="product-item">
                            <FaConciergeBell size={50} />
                            <h3>Combos</h3>
                            <p>Disfruta de nuestras ofertas especiales.</p>
                        </div>
                    </div>
                </div>

                <Link to="/login" className="btn-login">Ir a Iniciar Sesión</Link>
            </div>
        </div>
    );
};

export default Home;
