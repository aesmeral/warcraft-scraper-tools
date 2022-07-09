import dotenv from 'dotenv'
import axios from 'axios'
import PostgresCon from '../postgres.connector.js';
import RequestToken from '../oauthtoken.js';

dotenv.config();

const scrape = async () => {
    const client = new PostgresCon('warcraft').client;
    await client.connect();
    const token = await RequestToken(process.env.BNETID,process.env.BNETSECRET)
    let startingItem = 1;
    let items = [];
    do {
        let url = `https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&orderby=id&_pageSize=1000&id=[${startingItem},]&_page=1&access_token=${token}`
        const response = await axios.get(url);
        items = response.data.results;
        if(items.length > 0){
            startingItem = items[items.length - 1].data.id + 1;
            items.forEach(item => {
                client.query(
                    `INSERT INTO "warcraft_items" (id, name)
                     VALUES ($1, $2)
                     ON CONFLICT (id) DO NOTHING `, [item.data.id, item.data.name.en_US]
                );
            })
            console.log(`new starting point ${startingItem}, # of items: ${items.length}`);
        } 
    } while (items.length > 0)
    await client.end();
}

scrape();

