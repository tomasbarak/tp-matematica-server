//Get spotify access token

/*
    curl -X POST "https://accounts.spotify.com/api/token" -H "Content-Type: application/x-www-form-urlencoded"      -d "grant_type=client_credentials&client_id=17c584ee17464633bd876e27993e4a09&client_secret=86f590579d084180b23278d10f3b36cd"
*/
import dotenv from 'dotenv'
dotenv.config()

export const getAccessToken = () => {
    return new Promise((resolve, reject) => {
        const q = `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`

        fetch(`https://accounts.spotify.com/api/token?${q}`, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        }).then((res) => {
            res.json().then((data) => {
                resolve(data)
            })
        })
    })
}

