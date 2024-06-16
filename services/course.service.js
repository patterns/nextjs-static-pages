import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/courses`;
const courseSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('course')));
//TODO local-storage is not needed for a course record
export const courseService = {
    course: courseSubject.asObservable(),
    get courseValue() { return courseSubject.value },



    getAll,
    getById,
    update,
    delete: _delete
};

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // update stored course if the logged in course updated their own record
    if (id === courseSubject.value.id) {
        // update local storage
        const course = { ...courseSubject.value, ...params };
        localStorage.setItem('course', JSON.stringify(course));

        // publish updated course to subscribers
        courseSubject.next(course);
    }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // auto logout if the logged in course deleted their own record
    if (id === courseSubject.value.id) {
        logout();
    }
}
