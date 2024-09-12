class TrackInfo{
    constructor(
        title = 'Untitled',
        album = 'Untitled',
        albumArt = '',
        artists = [],
        releaseDate = null,
        lyrics = ''
    ){
        this.title = title
        this.album = album
        this.albumArt = albumArt
        this.artists = artists
        this.releaseDate = releaseDate
        this.lyrics = lyrics
    }

    getTrackData(){
        this.artists = getArtists()
        return this
    }
}

function getArtists(){
    const givenArtists = this.artists
    let artistNames = []
    givenArtists.forEach(artist => {
        artistNames.push(artist.name)
    })
    return artistNames.join(', ')
}

export default TrackInfo