const { FormateData } = require("../utils");
const { BlobServiceClient } = require('@azure/storage-blob');

// All Business logic will be here
class CategoryService {

    constructor(){}
    

    async uploadSingleFile(req,res){

        try {
            // Define connection string and container name
            const connectionString = process.env.CONNECTION_STRING;
            const containerName = process.env.CONTAINER_NAME;
            console.log("____containerName_______", containerName, connectionString);
      
            // Create BlobServiceClient object
            const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      
            // Get reference to a container
            const containerClient = blobServiceClient.getContainerClient(containerName);
            let timeStampInMs = Math.floor(Date.now() / 1000).toString();
            let fileOriginalName = req.file.originalname.replace(/ /g, "");
            const fileName = `${timeStampInMs}-${fileOriginalName}`
            // Create a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
              blobHTTPHeaders: {
                blobContentType: req.file.mimetype
              }
            });
      
            const blobClient = containerClient.getBlobClient(fileName);
      
            res.status(200).send({
              filePath: blobClient.url,
              message: 'File uploded successfully..'
            });
      
          }
          catch (err) {
            console.log("___CATCH BLOCK____", err);
            res.status(500).send(err.message);
          }
    }

    

}

module.exports = CategoryService;
