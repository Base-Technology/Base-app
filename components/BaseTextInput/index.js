import {useState} from 'react';
import { TextInput } from "react-native";

const CurrentTextInput=(props)=>{
    const [font,setFont]=useState(14);
    const onChange=(value)=>{
        setFont(value&&18||14)
    }    
        return <TextInput {...props} style={{fontSize:font,...props.style}} onChangeText={onChange} />
}
export default CurrentTextInput;