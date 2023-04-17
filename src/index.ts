import express from 'express';
import bodyParser from 'body-parser';
import { getAccessToken } from './helpers';
import cors from 'cors';
const app = express();
const port = 8080;
let access_token = '';

//Config express
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cors() );
// Access token shit
setInterval( () => {
    getAccessToken().then( (data: any) => {
        console.log( "-- Access Token Reset" )
        access_token = data.access_token;
    } );
}, 3600000 );

getAccessToken().then((data: any) => {
    console.log(data)
    
    access_token = data.access_token;

    app.listen( port, () => { console.log( "BRUHBRUHBRUHBRUH!!!!" ); } );
})

app.get('/', (req, res) => res.send('This is a fuckin API, why u tryin to get me bro¿'));

app.post('/genreList', (req, res) => {
    const body = req.body;
    console.log(body)
    const {genre, market, limit} = body;
    const url = "https://api.spotify.com/v1/search"
    const query = `q=genre:${genre}&type=track&market=${market}&limit=${limit}`

    fetch(`${url}?${query}`, {
        method: "GET",
        headers: new Headers({
            'Authorization': `Bearer ${access_token}`
        })
    }).then(
        response => response.json()
    ).then((data) => {
        res.send(data.tracks.items)
    })
})