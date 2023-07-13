import axios from 'axios';
/**
 * 1. use token.js to get access token
 * 2. use access token to get channel access token
 * 3. following code is how to exchange channel access token
 *
 **/
(async () => {
    const url = 'https://api.line.me/oauth2/v2.1/token';
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
    data.append('client_assertion', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA5ZjUwODc2LTFjMTktNDdkZS04NTY3LTY4M2NkODVkNWUxOCJ9.eyJpc3MiOiIxNjYxNDg4NzIwIiwic3ViIjoiMTY2MTQ4ODcyMCIsImF1ZCI6Imh0dHBzOi8vYXBpLmxpbmUubWUvIiwiZXhwIjoxNjg4MTIxODA5LCJ0b2tlbl9leHAiOjI1OTIwMDB9.WRfW1pQd31OD63BGis4-dQ9fs7ivAHZRg6jxuzTbdN3BqhABg8bclwIi56AnF4sfK-YBYKvcNPxW6ORgk_2aC9O8gKdeVgVCS9ogFcli4t3xznILzoKT6eBslNDjGpzFDBFRhHfTIZO1tm6ThbCGObC_FJdxy-TvKPNXs3wgGadcB8PDHJ_VlFtqCEvpJQZQGrsgvkQuO5hcHb1WVmzyZPw1l7lbzJeX4nW9NUfggOllm2nvqlRUl50tfJPtcynIzjwDvJQs6BtRswSXIBu32NYrYS-Q9f3faM1i83bq_xQqw92_YBuSy-Of-wbZEMERhQerbiEL5Tdkb2PBur09Qg');
    axios
        .post(url, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then((response) => {
        console.log(response.data);
    })
        .catch((error) => {
        console.error(error);
    });
})();
