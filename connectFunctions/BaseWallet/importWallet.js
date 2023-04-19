import "react-native-get-random-values";
import "@ethersproject/shims";
import "@sotatek-anhdao/react-native-secure-random";
import RNFS from 'react-native-fs';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
let path = RNFS.DocumentDirectoryPath + '/test.txt';

let privateKeyPath = RNFS.DocumentDirectoryPath + '/pk.txt';

// write the file


export function encode(_data, _key){
  const sData = AES.encrypt(_data, _key).toString();
  // console.log("sData", sData);
  return sData;
}
export function decode(_sData, _key){
  const decodeDataBytes = AES.decrypt(_sData, _key);
  // console.log("decodeDataBytes", decodeDataBytes);
  const decodeData = decodeDataBytes.toString(CryptoJS.enc.Utf8)
  // console.log("decodeData ", decodeData);
  return decodeData;
}

export async function savePrivateKey(_pk) {
  // console.log("privateKeyPath: ", privateKeyPath);
  RNFS.writeFile(privateKeyPath, _pk, 'utf8')
    .then((success) => {
      console.log('Save Success');
    })
    .catch((err) => {
      console.log("savePrivateKey", err.message);
    });
}

export async function getPrivateKey() {
  return RNFS.readFile(privateKeyPath, 'utf8') 
  // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
}

export async function deletedPrivateKey() {
  // create a path you want to delete
  return RNFS.unlink(privateKeyPath)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log("deletedPrivateKey", err.message);
    });
}