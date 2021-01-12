/*
        o props.children retorna qual o conteúdo passado dentro da tag PageHeader(os inputs), por isso 
    não é necessário criar outra interface.
*/
import React from 'react';
import { Link } from 'react-router-dom';


import LogoImage from '../../assets/images/logo.svg';
import BackIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;    //propriedade obrigatoria, 
    description?: string; // a antes dos : significa que a prop não é obrigatória.
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

    return (
        <header className="page-header">

            <div className="top-bar-container">
                <Link to="/">
                    <img src={BackIcon} alt="voltar" />
                </Link>
                <img src={LogoImage} alt="proffy" />
            </div>

            <div className="header-content">
                <strong> {props.title} </strong>
                {props.description && <p>{props.description}</p>}  {/* se existir uma description, mostre-a, se não, não mostre nada, uma das formas de usar no lugar do if ternario.*/}

                {props.children}
            </div>

        </header>
    );

}

export default PageHeader;