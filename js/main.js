// Declarations for our song values
let song;
let playSong;

// Spotify Client Creds
const clientId = "cdfa465ae4d043939eba8e1c971cd536";
const clientSecret = "ac7796cb5ae14d6981c0d024021f9fda";

// 
const getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const getSong = async(track,artist) => { 
    const token = await getToken();
    const result = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist&limit=15`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
            

        }
    });
    const data = await result.json();
    return data.tracks.items[0].preview_url;
}

const clickedEvent = async (figid) => {
    const imgIndex = parseInt(figid.slice(-1)) -1
    const songInfo = document.getElementsByTagName('img')[imgIndex].alt
    console.log(songInfo)
    const track = songInfo.split('-')[0]
    const artist = songInfo.split('-')[1]
    song = await getSong(track, artist)
    if (playSong){
        stopSnippet();
    }
    startSnippet(song);
}

const startSnippet = (url) => {
    playSong = new Audio(url)
    return playSong.play()
}

const stopSnippet = () => {
    playSong.pause()
}