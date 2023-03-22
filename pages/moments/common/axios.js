import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs'
import {showToast,hideToast} from '../components/ToastRootSibling'

import axios from 'axios'

let request = axios.create();
request.defaults.timeout = 10000

/**获取当前地址 */
export const getAddressInfo=(latitude,longitude)=>{
  return new Promise((resolve,reject)=>{
    showToast('正在加载...')
    request.get(`http://restapi.amap.com/v3/geocode/regeo?key=9b466e014d14281af221cbc464ddc267&location=${latitude},${longitude}&radius=1000&extensions=all&batch=false&roadlevel=0`)
    .then((response)=>{
      if (response.data.info =='OK'){
        if (Array.isArray(response.data.regeocode.addressComponent.city)){
          resolve(response.data.regeocode.addressComponent.province)
        }
        resolve(response.data.regeocode.addressComponent.city)
      }else {
        resolve('北京')
      }
      hideToast()
    }).catch(()=>{
      resolve('北京')
      hideToast()
    })
  })
}

/**获取天气 */
export const getWeatherInfo=(cityname)=>{
  showToast('正在加载...')
  return new Promise((resolve,reject)=>{
    request.get('https://query.asilu.com/weather/baidu/?city=' + cityname)
    .then((response)=>{
      resolve(response.data)
      hideToast()
    }).catch(()=>{
      hideToast()
    })
  })
}

/**获取电脑壁纸图片 */
export const getDN_imageInfo=()=>{
  return new Promise((resolve,reject)=>{
    showToast('正在加载...')
    request.get('https://api.asilu.com/bg/')
    .then((response)=>{
      resolve(response.data)
      hideToast()
    }).catch((e)=>{
      console.log('e===',e);
      hideToast()
    })
  })
}

/**获取笑话图片 */
export const getJoker_imageInfo=(page)=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get(`https://way.jd.com/showapi/tpxh?time=2015-07-10&page=${page}&maxResult=20&appkey=7e9979a264855fff26bea74a253fee06`)
    .then((response)=>{
      if (response.data.code == 10000){
        resolve(response.data.result.showapi_res_body)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}

// // 获取远端图片
// axios({
//   method:'get',
//   url:'http://bit.ly/2mTM3nY',
//   responseType:'stream'
// })
//   .then(function(response) {
//   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
// });

/**获取笑话图片 */
export const getNewData=(item,start)=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get(`https://way.jd.com/jisuapi/get?channel=${item}&num=20&start=${start * 20}&appkey=7e9979a264855fff26bea74a253fee06`)
    .then((response)=>{
      if (response.data.code == 10000){
        if (response.data.result.status == 0){
          resolve(response.data.result.result)
        }
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}

/**获取视频 */
export const getVideoData=()=>{
  let random = parseInt(Math.random() * 6)
  let url = [
    'https://api.iyk0.com/dsp/?type=网红',
    'https://api.iyk0.com/dsp/?type=明星',
    'https://api.iyk0.com/dsp/?type=热舞',
    'https://api.iyk0.com/dsp/?type=风景',
    'https://api.iyk0.com/dsp/?type=游戏',
    'https://api.iyk0.com/dsp/?type=动物'
  ]
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get(url[random])
    .then((response)=>{
      console.log('response.data=',response.data);
      if (response.data.code == 200){
        resolve(response.data)
      }else {
        resolve({})
      }
      hideToast()
    }).catch((e)=>{
      resolve({})
      hideToast()
    })
  })
}

/**获取看图猜成语 */
export const getImageContent=()=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get('https://api.iyk0.com/ktc/')
    .then((response)=>{
      if (response.data.code == 200){
        resolve(response.data)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}

/**获取一言 */
export const getOneWorld=()=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get('https://v2.alapi.cn/api/hitokoto?token=QAmJCzjq1B8v1eAh')
    .then((response)=>{
      if (response.data.code == 200){
        resolve(response.data.data)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}

/**获取舔狗 */
export const getDogDetail=()=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get('https://v2.alapi.cn/api/dog?token=QAmJCzjq1B8v1eAh')
    .then((response)=>{
      if (response.data.code == 200){
        resolve(response.data.data)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}
/**获取神回复 */
export const getGoldBack=()=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get('http://api.tianapi.com/txapi/godreply/index?&num=1&key=bee76a2202b7c21dd90c5163cb8b4506')
    .then((response)=>{
      if (response.data.code == 200 && response.data.newslist[0]){
        resolve(response.data.newslist[0])
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}

/**获取暖文 */
export const getTextWarm=(lastId)=>{
  console.log('lastId===',lastId);
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get(`https://qianming.sinaapp.com/index.php/AndroidApi10/index/cid/qutu/lastId/${lastId}`)
    .then((response)=>{
      if (lastId == 0){
        if (response.data.totalRow > 0){
          resolve(response.data.rows)
        }else {
          reject()
        }
      }else {
        if (response.data.length > 0){
          resolve(response.data)
        }else {
          reject()
        }
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}
/**获取美文 */
export const getBeatiText=(page)=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get(`https://v2.alapi.cn/api/mryw/list?token=QAmJCzjq1B8v1eAh&page=${page}`)
    .then((response)=>{
      if (response.data.code == 200){
        resolve(response.data.data)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}
/**获取美文 */
export const getENCNText=()=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get('http://route.showapi.com/1211-1?showapi_appid=49376&showapi_sign=9716aac181fa4252896941e392c9dbcb&count=10')
    .then((response)=>{
      if (response.data.showapi_res_code == 0 && response.data.showapi_res_body.ret_code == 0){
        resolve(response.data.showapi_res_body.data)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}
/**获取音乐 */
// 热歌榜，新歌榜，飙升榜，抖音榜，电音榜
export const getMusic=()=>{
  return new Promise((resolve, reject)=>{
    showToast('正在加载...')
    request.get('https://api.uomg.com/api/rand.music?sort=热歌榜&format=json')
    .then((response)=>{
      if (response.data.code == 1 && response.data.data){
        resolve(response.data.data)
      }else {
        reject()
      }
      hideToast()
    }).catch((e)=>{
      reject()
      hideToast()
    })
  })
}


