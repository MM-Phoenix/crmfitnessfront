export default function authHeader() {
    let jwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    if (jwtToken) {
        return { Authorization: 'Bearer ' + jwtToken.bearer };
    } else {
        return {};
    }
}
