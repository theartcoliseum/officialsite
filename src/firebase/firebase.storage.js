import firebase from './firebase.config';
import "firebase/storage";

var storage = firebase.storage();
var storageRef = storage.ref();

const uploadFile = async (file, fullpath) => {
    const promise = new Promise((resolve, reject) => {
        var metadata = {
            contentType: 'image/jpeg'
          };
          var uploadTask = storageRef.child(fullpath).put(file, metadata);
          
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                reject(error);
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
              });
            }
          );
    });
    return promise;
}

export { uploadFile };