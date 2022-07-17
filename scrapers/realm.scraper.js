import dotenv from 'dotenv'
import axios from 'axios'
import PostgresCon from '../postgres.connector.js';
import RequestToken from '../oauthtoken.js';

dotenv.config();

const scrape = async () => {
    const pool = new PostgresCon('warcraft').pool;
    const token = await RequestToken(process.env.BNETID,process.env.BNETSECRET)

    const url = `https://us.api.blizzard.com/data/wow/search/connected-realm?namespace=dynamic-us&locale=en_US&orderby=id&access_token=${token}`;
    const response = await axios.get(url);
    const items = response.data.results;
    pool.connect(async (err, client, done) => {
        items.forEach(item => {
            const realms = item.data.realms;
            realms.forEach(realm => {
                client.query(
                    `INSERT INTO "warcraft_connected_realms" (realm_id, connected_id, name)
                    VALUES ($1, $2, $3)`, [realm.id, item.data.id, realm.name.en_US]
                );
            });
        });
        done();
    })
}

scrape();