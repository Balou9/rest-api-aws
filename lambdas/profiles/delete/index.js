const { S3 } = require('aws-sdk')
const s3 = new S3({
  apiVersion: '2006-03-01',
  params: { Bucket: process.env.BUCKET_NAME }
})

module.exports.handler = async function (event, context) {
  try {
    if (!event.profileName) {
      return { statusCode: 400 }
    }
    
    await s3.deleteObject({
      Key: event.profileName
    }).promise()

    return { statusCode: 204 }
  } catch (err) {
    return { statusCode: 500 }
  }
}
