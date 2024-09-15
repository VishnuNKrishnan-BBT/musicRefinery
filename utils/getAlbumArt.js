import albumArt from 'album-art'
import downloadImage from './downloadImage.js'

function getAlbumArt(title = '', album = '') {
    return new Promise((resolve, reject) => {
        albumArt(album, { album: album })
            .then(res => {
                console.log(`-- Downloading album art for ${title}...`)
                downloadImage(res, `./assets/${title}.jpg`)
                    .then(() => {
                        console.log('-- Album art downloaded successfully.')
                        resolve()  // Resolve the promise when the download is successful
                    })
                    .catch(err => {
                        console.error('-- Error downloading album art:', err)
                        reject(err)  // Reject the promise if there's an error during download
                    })
            })
            .catch(() => {
                console.log('-- Album art not found, downloading default image.')
                downloadImage(`https://res.cloudinary.com/dqh32m4vp/image/upload/v1726354009/Vishnu_s_Music_Collection_q9dien.png`, `./assets/${title}.jpg`)
                    .then(() => {
                        console.log('-- Default album art downloaded successfully.')
                        resolve()  // Resolve the promise after downloading default image
                    })
                    .catch(err => {
                        console.error('-- Error downloading default album art:', err)
                        reject(err)  // Reject if the default image download fails
                    })
            })
    })
}


export default getAlbumArt