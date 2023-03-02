import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_arrow_back.svg";
import SearchIcon from "../../assets/icon_search.svg";
import ScheduleIcon from "../../assets/icon_schedule.svg";
import CloseIcon from "../../assets/icon_close.svg";
import DeleteIcon from "../../assets/icon_delete.svg";
import RefreshIcon from "../../assets/icon_refresh.svg";
import UpIcon from "../../assets/icon_arrow_up.svg";
import DownIcon from "../../assets/icon_arrow_down.svg";


const Search = (props) => {
  const [historyList, setHistory] = useState(['Base Wallet', 'Acy', 'Way Network', 'Fox']);
  const [showAllHistory, setShowAllHistory] = useState(false);
  return (
    <View>
      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <BackIcon width={20} height={20} fill={"#fff"} />
        </View>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', flex: 1, marginLeft: 10, marginRight: 10, height: 35, borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
          <SearchIcon width={20} height={20} fill={"#fff"} />

          <TextInput onSubmitEditing={()=>props.navigation.navigate('SearchDetail')} style={{ color: '#8c8c8c', fontSize: 12 }} defaultValue="How Fox Tech stands out?" />
        </View>

      </View>
      {/* History */}
      <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>History</Text>
          <View style={{ marginRight: 10 }}>
            <DeleteIcon width={15} height={15} fill={"#8c8c8c"} />
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          {
            historyList.map((item, index) => {
              return (index < 3 || showAllHistory) && <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ScheduleIcon style={{ marginRight: 10 }} width={15} height={15} fill="#8c8c8c" />
                    <Text style={{ color: '#fff' }}>{item}</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => setHistory(data =>data.filter(itemF=>itemF!=item))}>

                    <CloseIcon style={{ marginRight: 10 }} width={15} height={15} fill="#8c8c8c" />
                  </TouchableWithoutFeedback>

                </View>
              </View>;
            })
          }
          <TouchableWithoutFeedback onPress={() => setShowAllHistory(data => !data)}>

            <Text style={{ color: '#8c8c8c', textAlign: 'center' }}> {
              showAllHistory && 'Pack Up '} All Search History</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {/* Discover */}
      <View style={{ paddingHorizontal: 15, marginTop: 40 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 14 }}>Discover</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <RefreshIcon width={15} height={15} fill={"#8c8c8c"} />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ flex: 1 }}>Base App</Text>
            <Text style={{ flex: 1 }}>Acy Wallet Coming soon</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ flex: 1 }}>Zero-Knowledge</Text>
            <Text style={{ flex: 1 }}>Way Network</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ flex: 1 }}>Way Luggage</Text>
            <Text style={{ flex: 1 }}>Secure Interchain Data Availability</Text>
          </View>
        </View>

      </View>
      {/* Trends for You */}
      <View style={{ paddingHorizontal: 20, marginTop: 40, paddingRight: 25 }}>
        <View>
          <Text style={{ fontSize: 14 }}>Trends For You</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#ff0000', marginRight: 10 }}></View>
            <Text>Base Wallet</Text>
          </View>
          <View>
            <UpIcon width={15} height={15} fill='#ff6600' />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#ff6600', marginRight: 10 }}></View>
            <Text>Sets and changes the Roller list (further work).</Text>
          </View>
          <View>
            <DownIcon width={15} height={15} fill='#707070' />

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#ffcc00', marginRight: 10 }}></View>
            <Text>Adds new ERC20 tokens.</Text>
          </View>
          <View>
            <DownIcon width={15} height={15} fill='#707070' />

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#707070', marginRight: 10 }}></View>
            <Text>Deposit/Withdraw to L1 user’s root account.</Text>
          </View>
          <View>
            <UpIcon width={15} height={15} fill='#ff6600' />

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#707070', marginRight: 10 }}></View>
            <Text>Only the governor can pass the governance to the new governor</Text>
          </View>
          <View>
            <UpIcon width={15} height={15} fill='#ff6600' />

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#707070', marginRight: 10 }}></View>
            <Text>Deposit/Withdraw to L1 user’s root account.</Text>
          </View>
          <View>
            <UpIcon width={15} height={15} fill='#ff6600' />

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#707070', marginRight: 10 }}></View>
            <Text>Deposit/Withdraw to L1 user’s root account.</Text>
          </View>
          <View>
            <UpIcon width={15} height={15} fill='#ff6600' />

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 5, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 5, width: 5, borderRadius: 100, backgroundColor: '#707070', marginRight: 10 }}></View>
            <Text>Deposit/Withdraw to L1 user’s root account.</Text>
          </View>
          <View>
            <UpIcon width={15} height={15} fill='#ff6600' />

          </View>
        </View>
      </View>
    </View>
  )
}
export default Search;

