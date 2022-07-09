import axios from 'axios'

const requestToken = async (BnetID, BnetSecret) => {
    const url = "https://us.battle.net/oauth/token?grant_type=client_credentials";
    const credentials = {
        auth : {username: BnetID, password: BnetSecret}
    };
    const response = await axios.post(url, {}, credentials);
    return response.data.access_token;
}

export default requestToken;