import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
} from './types';

import axios from 'axios';
import {setAlert} from './alert';

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        console.log('Enviando datos de registro:', body);

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/`, body, config);

        console.log('Respuesta del servidor:', res);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
             dispatch(setAlert('Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam', 'green'));
            console.log('Registro exitoso:', res.data);
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
            dispatch(setAlert('Error al crear la cuenta', 'red'));

            console.log('Registro fallido con estado:', res.status);
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        })

    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'red'));
        console.log('Error en la solicitud de registro:', err);
    }
};

export const activate = (uid, token) => async dispatch =>{

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try{

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/activation/`, body, config);

        if(res.status === 204){
            dispatch({
                type: ACTIVATION_SUCCESS
            });
            dispatch(setAlert('Cuenta activada correctamente', 'green'));
        }else{
            dispatch({
                type: ACTIVATION_FAIL
            });
            dispatch(setAlert('Error al activar la cuenta', 'red'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING

        })
    }catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setAlert('Error conectando con el servidor, intenta mas tarde.', 'red'));
    }
}

