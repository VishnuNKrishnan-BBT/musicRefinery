import ffmpeg from 'fluent-ffmpeg'
import checkWritePermission from './checkWritePermission.js'

function updateMetaData(originalPath, newPath, metadata = {}) {
    // checkWritePermission(originalPath)
    console.log(`-- Updating metadata...`)
    // Update metadata using FFmpeg
    ffmpeg(originalPath)
        .outputOption('-map_metadata', '-1') //Remove all existing metadata
        .outputOption('-id3v2_version', '3')
        .outputOption('-metadata', `title=${metadata.title}`)
        .outputOption('-metadata', `artist=${metadata.artists}`)
        .outputOption('-metadata', `album=${metadata.album}`)
        .outputOption('-metadata', `year=${metadata.releaseDate}`)
        .outputOption('-metadata', `genre=${metadata.genres}`)
        .outputOption('-c', 'copy') // Copy the audio and video streams without re-encoding
        .output(newPath) // Ensure you're specifying the output file
        .on('end', () => { console.log('-- Metadata updated successfully') })
        .on('error', (err) => { console.error('-- Error updating metadata:', err) })
        .run() // Make sure to call `.run()` to execute the FFmpeg command
}

export default updateMetaData