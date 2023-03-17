import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs'
import {showToast} from '../components/ToastRootSibling'

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}


export const saveImageToPhoto = async(imageUrl,callBack)=>{
  downLoad(imageUrl,'png',callBack)
}
export const saveVideoToPhoto = async (videouRL,callBack)=>{
  downLoad(videouRL,'mp4',callBack)
}
const downLoad = async (url,type,callBack)=>{
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    // 提示
    showToast("请打开相册权限：打开后即可把图片和视频保存到相册哦")
    callBack()
    return;
  }
  showToast('正在保存...')
  if(url.startsWith("http")){
    // 网络图片
    let timestamp = (new Date()).getTime();
    let random = String(((Math.random() * 1000000) | 0))
    let dirs = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : 'file://' + RNFS.ExternalStorageDirectoryPath;
    const toPath = `${dirs}/${timestamp+random}.${type}`;
    const options = {
      fromUrl: url,
      toFile: toPath,
      background: true,
      begin: (res) => {
      },
      progress: (res) => {
      }
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise.then(res => {
        const filePath = toPath.startsWith('file://') ? toPath : 'file://' + toPath 
        CameraRoll.save(filePath).then(function(result) {
          showToast('已保存到相册')
          RNFS.unlink(toPath)
          callBack()
        }).catch(function(error) {
            console.log(' saveToCameraRollerror', error);
            showToast('保存失败')
            callBack()
        });
      }).catch(err => {
        callBack()
      });
    } catch (e) {
      callBack()
    }
  }else {
    // 我的下载中的图片
    const filePath = url.startsWith('file://') ? url : 'file://' + url 
    CameraRoll.save(filePath).then(function(result) {
      showToast('已保存到相册')
      RNFS.unlink(toPath)
      callBack()
    }).catch(function(error) {
        console.log(' saveToCameraRollerror', error);
        callBack()
    });
  }
}
