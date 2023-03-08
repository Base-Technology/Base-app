import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView } from "react-native";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_arrow_back.svg";
import SearchIcon from "../../assets/icon_search.svg";
import PostScreen from "../me/post";
import MembersScreen from "../me/members";


const Search = ({ navigation }) => {
  const [tabsData, setTabsData] = useState([
    {
      active: false,
      name: 'Posts'
    },
    {
      active: false,
      name: 'Users'
    }
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View>
      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <BackIcon width={20} height={20} fill={"#fff"} />
        </View>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', flex: 1, marginLeft: 10, marginRight: 10, height: 35, borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
          <SearchIcon width={20} height={20} fill={"#fff"} />

          <TextInput style={{ color: '#8c8c8c', fontSize: 12 }} defaultValue="How Fox Tech stands out?" />
        </View>

      </View>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          {
            tabsData.map((item, index) =>
              <TouchableWithoutFeedback onPress={() => setSelectedIndex(index)}>

                <Text style={{ color: 'rgba(255,255,255,0.6)', marginRight: 10, borderBottomWidth: 2, borderBottomColor: index == selectedIndex && '#422DDD' || 'rgba(0,0,0,0)' }}>{item.name}</Text></TouchableWithoutFeedback>)
          }

        </View>
      </View>
      <ScrollView>
        {
          selectedIndex == 1 && <MembersScreen /> ||
          <PostScreen />
        }
      </ScrollView>

    </View>
  )
}
export default Search;

