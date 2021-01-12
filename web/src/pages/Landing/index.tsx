import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import api from '../../services/Api';

function Landing() {

    const [totalConections, setTotalConnections] = useState(0);


    // sempre que a página iniciar isso faz uma busca  no banco de dados pelo total de conexões já realizadas.
    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, []);


    return (
        <div id="page-landing">

            <div id="page-landing-content" className="container">

                <div className="logo-container">
                    <img src={LogoImg} alt="Proffy" />
                    <h2> Sua plataforma de estudos online.</h2>
                </div>

                <img
                    src={LandingImg}
                    alt="Plataforma de estudos"
                    className="hero-image"
                />


                <div className="buttons-container">

                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas" />
                        Dar aulas
                    </Link>

                </div>


                <span className="total-connections">
                    Total de {totalConections} {totalConections !== 1 ? 'conexões' : 'conexão'} já realizada{totalConections !== 1 ? 's' : null} <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>

            </div>

        </div>
    );

}

export default Landing;