class data {
    // uploadFile is a middleware function that uploads a file to Firebase Storage
    // uploadAndRespond
    static async uploadFile(req, res, next) {
      try {
        const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
        const storage = require("../configs/firebase.connection");
        // Grab the file
        const file = req.file;
        if (file) {
          // Format the filename
          const timestamp = Date.now();
          const orgName = file.originalname.split(".")[0];
          const type =
            file.originalname.split(".")[file.originalname.split(".").length - 1];
          const fileName = `${orgName}_${timestamp}.${type}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, file.buffer);
          const url = await getDownloadURL(storageRef);
          // Store the URL in the request body and call the next function
          req.body.image = url;
          next();
        } else {
          next();
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  
    // uploadAndRespond
    static async uploadAndRespond(req, res) {
      try {
        const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
        const storage = require("../configs/firebase.connection");
        // Grab the file
        const file = req.file;
        if (file) {
          // Format the filename
          const timestamp = Date.now();
          const orgName = file.originalname.split(".")[0];
          const type =
            file.originalname.split(".")[file.originalname.split(".").length - 1];
          const fileName = `${orgName}_${timestamp}.${type}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, file.buffer);
          const url = await getDownloadURL(storageRef);
          res.status(200).send({
            url,
            fileName,
            size: file.buffer.readUInt16LE(0) * 0.000001,
          });
        } else {
          res.status(300).send({ message: "You did not choose a file" });
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  
    // upload multiple files
    static async uploadMultipleFiles(req, res, next) {
      try {
        const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
        const storage = require("../configs/firebase.connection");
  
        const files = req.files; // Get the files from the request object
  
        if (files && files.length > 0) {
          // Create an empty array to store the uploaded file urls
          let urls = [];
  
          // Loop through each file and upload it to Firebase Storage
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
  
            // Format the filename
            const timestamp = Date.now();
            const orgName = file.originalname.split(".")[0];
            const type =
              file.originalname.split(".")[
                file.originalname.split(".").length - 1
              ];
            const fileName = `${orgName}_${timestamp}.${type}`;
            const storageRef = ref(storage, fileName);
  
            // Upload the file to Firebase Storage and get the download URL
            await uploadBytes(storageRef, file.buffer);
            const url = await getDownloadURL(storageRef);
            urls.push(url); // Add the URL to the urls array
          }
  
          // Store the urls in the request body and call the next function
          req.body.images = urls;
          next();
        } else {
          next();
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
  }
  
  module.exports = data;
  