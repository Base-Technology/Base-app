import axios from 'axios';
import { mailAddress } from '../constants/mail';

export async function register(mail, password, verification_code) {
    try {
        const response = await axios.post(`${mailAddress}/register`, {
            mail,
            password,
            verification_code,
        });
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function login(mail, password) {
    try {
        const response = await axios.post(`${mailAddress}/login`, {
            mail,
            password,
        });
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function verificationCode(mail) {
    try {
        const response = await axios.post(`${mailAddress}/verification-code`, {
            mail,
        });
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}