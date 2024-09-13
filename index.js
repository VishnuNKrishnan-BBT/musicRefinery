
import createFolder from './utils/createFolder.js'
import getFilesInFolder from './utils/getFilesList.js'
import identifySong from './utils/identifySong.js'
import updateMetaData from './utils/updateMetadata.js'



createFolder('./songs/updated')

const files = await getFilesInFolder('./songs')

async function identifyAndUpdateAll(songsList) {
    for (const element of songsList) {
        await identifySong(`./songs/${element}`)
            .then(result => {
                console.log(`-- Match found!`)
                console.log(`-- Song details: ${result.title} | From ${result.album} | By ${result.artists}`)
                updateMetaData(`./songs/${element}`, `./songs/updated/${result.title} (${result.album}).mp3`, result)  // <TODO: Do not hardcode audio format>
            })
            .catch(error => {
                console.error('-- Error identifying song:', error.status ? error.status : error)
                console.log('-- Lookup failed')
            })
    }
}

identifyAndUpdateAll(files)