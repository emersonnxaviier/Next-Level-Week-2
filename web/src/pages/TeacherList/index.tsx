import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import allSubject from '../../components/Subject';

import './styles.css';
import api from '../../services/Api';


function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');


    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                weekDay,
                time,
            }
        });
        setTeachers(response.data)

    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">

                <form id="search-teachers" onSubmit={searchTeachers} >
                    <Select
                        name="subject"
                        label="Máteria"
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
                        options={allSubject}
                    />

                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={weekDay}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return (
                            <TeacherItem key={teacher.id} teacher={teacher} />
                        );
                    })
                }
            </main>
        </div>
    );
}

export default TeacherList;