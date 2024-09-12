
import createFolder from './utils/createFolder.js'
import identifySong from './utils/identifySong.js'
import updateMetaData from './utils/updateMetadata.js'



createFolder('./songs/updated')

const origFilePath = `./songs/Peysaamal (Mounam Sollum Vaarthaigal).mp3`

identifySong(origFilePath)
    .then(result => {
        console.log(`-- Match found!`)
        console.log(`-- Song details: ${result.title} | From ${result.album} | By ${result.artists}`)
        updateMetaData(origFilePath, `./songs/updated/${result.title} (${result.album}).mp3`, result)  // <TODO: Do not hardcode audio format>
    })
    .catch(error => {
        console.error('-- Error identifying song:', error.status ? error.status : error)
        console.log('-- Lookup failed')
    })