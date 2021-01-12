import React from 'react';
import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/Api';

import './styles.css';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {


    // criar nova conexão
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong> {teacher.name} </strong>
                    <span> {teacher.subject} </span>
                </div>

            </header>

            <p> {teacher.bio} </p>

            <footer>
                <p>
                    Preço/Hora
                <strong> R$ {teacher.cost} </strong>
                </p>

                <a
                    target="_blank"
                    onClick={createNewConnection}
                    href={`http://wa.me/${teacher.whatsapp}`}
                >
                    <img src={WhatsappIcon} alt="whatsapp" />
                    Entrar em contato
                </a>
            </footer>

        </article>
    );
}

export default TeacherItem;