export const getContentFromHtmlText = (html)=>{
  // content=content.replace(/<\/?p[^>]*>/gi,'')
  return html.match(/<p(.*?)<\/p>/g).map(function(val){
    let a = val.replace(/<\/?[^>]*>/gi,'')
    a = a.replace(/&.*?;/gi,' ')

    // a = a.replace(/&nbsp;/gi,' ')
    // a = a.replace(/&amp;/gi,' ')
    return a
 });
}
export const getNContentFromHtmlText = (html)=>{
  // content=content.replace(/<\/?p[^>]*>/gi,'')
  return html.match(/<p(.*?)<\/p>/g).map(function(val){
    let a = val.replace(/<\/?[^>]*>/gi,'\n')
    a = a.replace(/&.*?;/gi,' ')

    // a = a.replace(/&nbsp;/gi,' ')
    // a = a.replace(/&amp;/gi,' ')
    return a
 });
}
export const getImagesFromHtmlText = (html)=>{
  //匹配图片（g表示匹配所有结果i表示区分大小写）
  let imgReg = /<img.*?(?:>|\/>)/gi;
  //匹配src属性
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  let srcReg1 = /w=[\'\"]?([^\'\"]*)[\'\"]?/i;
  let srcReg2 = /h=[\'\"]?([^\'\"]*)[\'\"]?/i;
  let arr = html.match(imgReg);
  if (arr){
    let images = []
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg);
      let width = arr[i].match(srcReg1);
      let height = arr[i].match(srcReg2);

      if (src && width && height && src[1] && width[1] && height[1]){
        let obj = {}
        obj.src = src[1]
        obj.width = width[1]
        obj.height = height[1]
        images.push(obj)
      }
     }
     return images
  }
  return []
}