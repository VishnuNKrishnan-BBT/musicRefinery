import { access, constants } from 'fs/promises'

async function checkWritePermission(filePath) {
    try {
        await access(filePath, constants.W_OK)
        console.log(`${filePath} is writable.`)
    } catch (err) {
        console.error(`${filePath} is not writable.`)
    }
}

export default checkWritePermission