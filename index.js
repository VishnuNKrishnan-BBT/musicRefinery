
import createFolder from './utils/createFolder.js'
import deleteFileSync from './utils/deleteFile.js'
import downloadImage from './utils/downloadImage.js'
import getAlbumArt from './utils/getAlbumArt.js'
import getFilesInFolder from './utils/getFilesList.js'
import identifySong from './utils/identifySong.js'
import updateMetaData from './utils/updateMetadata.js'



createFolder('./songs/updated')

const files = await getFilesInFolder('./songs')

let totalCount = files.length
let processedCount = 0
let passedCount = 0
let failedCount = 0

const incPassCount = () => {
    passedCount++
}

const incFailCount = () => {
    failedCount++
}

files.map((obj, i) => {
    console.log(`${i}) ${obj}`)
})

async function identifyAndUpdateAll(songsList) {
    for (const element of songsList) {
        console.log(`\n-- Sl. No: ${processedCount + 1} ================ STATS: Success: ${passedCount} | Failed: ${failedCount} | Progress: ${((processedCount / totalCount) * 100).toFixed(2)}%\n`)
        await identifySong(`./songs/${element}`)
            .then(result => {
                console.log(`-- Match found!`)
                console.log(`-- Song details: ${result.title} | From ${result.album} | By ${result.artists}`)
                //getAlbumArt(result.title, result.album)
                updateMetaData(`./songs/${element}`, `./songs/updated/${result.title}.mp3`, result, incPassCount, incFailCount)  // <TODO: Do not hardcode audio format>
            })
            .catch(error => {
                failedCount++
                console.error('-- Error identifying song:', error.status ? error.status : error)
                console.log('-- Lookup failed')
            }).finally(() => {
                processedCount++
            })
    }
}

identifyAndUpdateAll(files)
//downloadImage('https://i.scdn.co/image/ab67616d0000b273af634982d9b15de3c77f7dd9', 'assets/tempImg.jpg')