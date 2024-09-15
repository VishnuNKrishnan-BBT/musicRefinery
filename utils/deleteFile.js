import { unlinkSync } from 'fs'

function deleteFileSync(filePath) {
    try {
        unlinkSync(filePath)
        console.log(`-- File deleted successfully: ${filePath}`)
    } catch (err) {
        console.error(`-- Error deleting file: ${filePath}`, err)
    }
}

export default deleteFileSync
