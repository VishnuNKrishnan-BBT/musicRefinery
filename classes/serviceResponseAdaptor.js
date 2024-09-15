import arrayToString from "../utils/arrayToString.js"
import artistsNamesAsArray from "../utils/artistsAsArray.js"

//In case the API response structure changes, update the mappings here.
class ServiceResponseAdaptor {
    constructor(serviceResponse) { //Pass in response from service as is, in full.

        //Mappings
        const audioMetadata = serviceResponse.metadata.music[0]
        this.title = `${audioMetadata.title || 'Untitled'}`
        this.album = `${audioMetadata.album.name || 'Untitled'}`
        this.albumArt = null
        this.artists = arrayToString(artistsNamesAsArray(audioMetadata.artists), ', ') || ''
        this.releaseDate = audioMetadata.release_date || null
        this.duration = audioMetadata.duration_ms || null
        this.genres = arrayToString(artistsNamesAsArray(audioMetadata.genres), ', ') || ''
        this.lyrics = null
        this.label = audioMetadata.label || 'Untitled'
    }

    getFormatted() {
        return this
    }
}

export default ServiceResponseAdaptor