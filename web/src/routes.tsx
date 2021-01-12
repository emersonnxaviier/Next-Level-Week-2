/*
    o exact faz com que o conteúdo do path="/" só seja exibido se a URL for exatamente igual ao path, ou sejá, /.
*/

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes() {

    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;