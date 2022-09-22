import React from "react";
import axios from 'axios';
// import SecureStorage from 'react-native-secure-storage';

import { BASE_URLAPI } from "../config/URLAPI";
import { createACtion } from "../Utils/createAction";

export function useWROnline() {

    const datawronline = React.useMemo(
        () => ({
            sendwr: async (data) => {
                // await axios.post(`${BASE_URLAPI}/api/getnikname`, data);
                axios
                    .post('http://10.202.10.42:3000/api/getnikname', data)
                    /* localhost emulator harus diganti dengan ip local : 10.0.2.2, agar device tidak bingung, soalnya device use localhost */
                    .then(res => {
                        // console.log('res:', res);
                        console.log('WR Berhasil Terkirim!')
                    })
                    .catch(err => {
                        console.log(err.response.data)
                    })
            }
        }),
        [],
    );

    return {
        datawronline
    }
}