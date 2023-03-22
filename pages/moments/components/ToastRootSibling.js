import React from 'react'
import RootSiblings from 'react-native-root-siblings';
import Toast from './Toast'
let rootSiblings = undefined;

export const showToast=(text)=>{
  if (!rootSiblings){
    rootSiblings = new RootSiblings(
      <Toast text={text} onDismiss={hideToast}/>
    )
  }else{
    rootSiblings.update(
      <Toast text={text} onDismiss={hideToast}/>
    )
  }
}
export const hideToast=()=>{
  if (rootSiblings instanceof RootSiblings) {
    rootSiblings.destroy();
  }
  rootSiblings = undefined
}
