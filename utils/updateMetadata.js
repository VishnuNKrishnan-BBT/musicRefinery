import ffmpeg from 'fluent-ffmpeg'
import checkWritePermission from './checkWritePermission.js'

function updateMetaData(originalPath, newPath, metadata = {}){
    // checkWritePermission(originalPath)
    console.log(`-- Updating metadata...`)
    // Update metadata using FFmpeg
    ffmpeg(originalPath)
        .outputOptions([
            // '-metadata', 'title=New Title',    // Title metadata
            // '-metadata', 'artist=New Artist',  // Artist metadata
            // '-metadata', 'album=New Album',    // Album metadata
            '-metadata', 'year=2024',          // Year metadata
            '-metadata', `genre=${metadata.title}`       // Genre metadata
            ])
        .output(newPath) // Ensure you're specifying the output file
        .on('end', () => { console.log('-- Metadata updated successfully') })
        .on('error', (err) => { console.error('-- Error updating metadata:', err) })
        .run() // Make sure to call `.run()` to execute the FFmpeg command
}

export default updateMetaData