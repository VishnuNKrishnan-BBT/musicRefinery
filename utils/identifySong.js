import 'dotenv/config'
import fs from 'fs'
import crypto from 'crypto'
import axios from 'axios'
import FormData from 'form-data'
import trimAudio from './trimAudio.js'
import ServiceResponseAdaptor from '../classes/serviceResponseAdaptor.js'

function identifySong(filePath) {

    // WORKFLOW
    // Trim audio to 20 seconds.
    // Send trimmed sample to ACR Cloud.
    // Format response using ServiceResponseAdaptor.
    // Return formatted metadata object.

    //Available in .env. But unreadable here.
    const ACCESS_KEY = '0ef15c5e7b4bac3a419c2c8f301c166a'
    const ACCESS_SECRET = 'yaAmVUNahg8p6OPtCHCKAClQAkgFe0kB0Jdr71FT'
    const ENDPOINT = 'https://identify-ap-southeast-1.acrcloud.com/v1/identify'

    console.log(`-- Audio file received: ${filePath}`)
    return new Promise((resolve, reject) => {
        const httpMethod = 'POST'
        const httpUri = '/v1/identify'
        const dataType = 'audio'
        const signatureVersion = '1'
        const timestamp = Math.floor(Date.now() / 1000)

        // Construct the string to sign for the HMAC signature
        const stringToSign = `${httpMethod}\n${httpUri}\n${ACCESS_KEY}\n${dataType}\n${signatureVersion}\n${timestamp}`

        // Create the signature using HMAC-SHA1
        const signature = crypto.createHmac('sha1', ACCESS_SECRET)
            .update(stringToSign)
            .digest('base64')

        // Trim the audio file to 10 seconds
        console.log(`-- Trimming audio...`)
        const trimmedFilePath = '../sample.mp3'
        trimAudio(filePath, trimmedFilePath)
            .then(trimmedPath => {
                // Read the trimmed audio file
                fs.readFile(trimmedPath, (err, fileData) => {
                    if (err) {
                        console.log(`!! Error while trimming audio!`)
                        return reject(err)
                    }

                    // Create form data for the request
                    const form = new FormData()
                    form.append('sample', fileData, {
                        filename: 'trimmed_sample.mp3',
                        contentType: 'audio/mpeg',
                    })
                    form.append('access_key', ACCESS_KEY)
                    form.append('data_type', dataType)
                    form.append('signature_version', signatureVersion)
                    form.append('signature', signature)
                    form.append('sample_bytes', fileData.length)
                    form.append('timestamp', timestamp)

                    // Make the POST request to ACR Cloud API
                    console.log(`-- Checking database for a match...`)
                    axios.post(ENDPOINT, form, {
                        headers: form.getHeaders(),
                    })
                        .then(response => {
                            if (!response.data.metadata) {
                                reject({ success: false, status: 'No match found.' })
                            } else {
                                const formattedAudioInfo = new ServiceResponseAdaptor(response.data).getFormatted()
                                resolve(formattedAudioInfo)
                            }
                        })
                        .catch(error => reject(error))
                })
            })
            .catch(error => reject(error))
    })
}

export default identifySong