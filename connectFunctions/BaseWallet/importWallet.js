// import 助记词 
// 根据助记词生成私钥
// 更具私钥找寻对应的base wallet
// require the module
import RNFS from 'react-native-fs';
// let RNFS = require('react-native-fs');

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
let path = RNFS.DocumentDirectoryPath + '/test.txt';

let privateKeyPath = RNFS.DocumentDirectoryPath + '/pk.txt';

// write the file




export function savePrivateKey_pre() {
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export async function savePrivateKey(_pk) {
  console.log("privateKeyPath: ", privateKeyPath);
  RNFS.writeFile(privateKeyPath, _pk, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export async function getPrivateKey() {
  RNFS.readFile(privateKeyPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      console.log('GET RESULT', result);
      return result;
    })
  return -1;
}

export async function deletedPrivateKey() {
  // create a path you want to delete
  return RNFS.unlink(privateKeyPath)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
}