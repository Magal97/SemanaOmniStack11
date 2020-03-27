import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import heroesImage from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();
    
    async function handleLogin(e){
        e.preventDefault();

        try{
            const respose = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', respose.data.name);
            history.push('/profile');
        }catch(err){
            alert('ONG não encontrada');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input placeholder="Sua ID"
                    value = {id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    );
}