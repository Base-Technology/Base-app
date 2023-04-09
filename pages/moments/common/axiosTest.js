import RNFS, { readFileRes } from 'react-native-fs'

import axios from 'axios'

let request = axios.create();
request.defaults.timeout = 10000

const timer = 400

let abc = RNFS.DocumentDirectoryPath + '/test.txt'

// 手机壁纸
const getImageAddress=(num)=>{
  return new Promise((resolve, reject)=>{
    request.get('http://api.wpbom.com/api/wallpa.php?msg='+num)
    .then((response)=>{
      // console.log('response=====',response.data);
      let a = response.data.split('±')
      let b = a[a.length - 2].split('img=')
      let c = b[b.length - 1]
      resolve(c)
      
      // console.log('c===',c);
    }).catch((e)=>{
      reject()
    })
  })
}
export const getImageAddressText=()=>{
   setInterval(() => {
    let random = parseInt(Math.random() * 10 + 1)
    getImageAddress(random).then((res)=>{
      console.log('手机壁纸');
      RNFS.appendFile(abc, res + ',', 'utf8').then((res)=>{
      }).catch((e)=>{
      })
    })
  }, timer);
}


// 美图
const getImage1=()=>{

  let random = parseInt(Math.random() * 4)

  let url = [
    'https://api.iyk0.com/sjmn/',
    'https://api.iyk0.com/mtt/',
    'https://api.iyk0.com/mn/',
    'https://api.iyk0.com/mtyh/'


    
    // 'https://api.iyk0.com/xjj/',
    // 'https://api.iyk0.com/mn/2/',
  ]

  return new Promise((resolve, reject)=>{
    request.get(url[random])
    .then((response)=>{
     console.log('美图');
      resolve(response.request.responseURL)
    }).catch((e)=>{
      reject()
    })
  })
}
let mtPath = RNFS.DocumentDirectoryPath + '/meitu.txt'
export const getImage1Test=()=>{
  setInterval(() => {
   getImage1().then((res)=>{
     RNFS.appendFile(mtPath, res + ',', 'utf8').then((res)=>{
     }).catch((e)=>{
     })
   })
 }, timer);
}


// P站
const getImage2=()=>{
  return new Promise((resolve, reject)=>{
    request.get('https://api.iyk0.com/luoli')
    .then((response)=>{
     console.log('P站');
      resolve(response.request.responseURL)
    }).catch((e)=>{
      reject()
    })
  })
}
let pPath = RNFS.DocumentDirectoryPath + '/p.txt'
export const getImage2Test=()=>{
  setInterval(() => {
    getImage2().then((res)=>{
     RNFS.appendFile(pPath, res + ',', 'utf8').then((res)=>{
     }).catch((e)=>{
     })
   })
 }, timer);
}



//二次元
const getImage3=()=>{
  let random = parseInt(Math.random() * 2)

  let url = [
    'https://api.iyk0.com/ecy/api.php/',
    'https://apis.jxcxin.cn/api/dmimg',
  ]

  return new Promise((resolve, reject)=>{
    request.get(url[random])
    .then((response)=>{
     console.log('二次元');
      resolve(response.request.responseURL)
    }).catch((e)=>{
      reject()
    })
  })
}
let erciyuanPath = RNFS.DocumentDirectoryPath + '/erciyuan.txt'
export const getImage3Test=()=>{
  setInterval(() => {
    getImage3().then((res)=>{
     RNFS.appendFile(erciyuanPath, res + ',', 'utf8').then((res)=>{
     }).catch((e)=>{
     })
   })
 }, timer);
}




//视频
const getImage4=()=>{
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
    request.get(url[random])
    .then((response)=>{
      resolve(response.data)
    }).catch((e)=>{
      reject()
    })
  })
}
let videoPath = RNFS.DocumentDirectoryPath + '/video.json'
// console.log('videoPath',videoPath);
export const getImage4Test=()=>{
  setInterval(() => {
    getImage4().then((res)=>{
      console.log('resresres=',res);
      if (res && res.code == '200' && res.img){
        RNFS.appendFile(videoPath, JSON.stringify(res) + ',', 'utf8').then((res)=>{
        }).catch((e)=>{
        })
      }
   })
 }, timer);
}