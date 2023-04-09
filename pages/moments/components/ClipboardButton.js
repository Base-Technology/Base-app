import React, { useState } from 'react'
import {
  TouchableOpacity,
  Text
} from 'react-native'
import Clipboard from '@react-native-community/clipboard'
export default ClipboardButton = (props)=>{
  const [copied,setCopied] = useState(false)
  function onCopy(){
    Clipboard.setString(props.copyText)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  return <TouchableOpacity onPress={onCopy}>
    {
      copied ? <Text>复制成功</Text> : React.Children.map(props.children, child => {
        return child
      })
    }
  </TouchableOpacity>
}