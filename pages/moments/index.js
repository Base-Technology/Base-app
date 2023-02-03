import React from 'react';
import ArrowDown from "../../assets/arrow-ios-downward-outline.svg";
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import { Tooltip, Button } from '@ui-kitten/components';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  }, {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    content: `Over the past month, BendDAO saw significant growth inMAYCs，BAYCs,CloneX,and Moonbirds.
    41% of the total MAYCs in the BendDAO collateral were`
  },

];

const Item = ({ title, content }) => {
  const [visible, setVisible] = React.useState(false);
  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>
      TOGGLE TOOLTIP
    </Button>
  );
  return (
    <View style={styles.item}>
      <View style={styles.itemc}>
        <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray', marginRight: 10 }}>
        </View>
      </View>
      <View style={{ paddingRight: 20 }}>
        <View>
          <Text style={styles.title}>Base News</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View>
          <Text style={{ color: 'rgba(255,255,255,0.5)' }}>3 minutes ago</Text>
        </View>
      </View>


    </View >
  );
}

const Momnet = () => {
  const renderItem = ({ item }) => (
    <Item {...item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'row'
  },
  itemc: {
    display: 'flex',
    flexDirection: 'row',

  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#fff'
  },
  content: {
    color: 'rgba(255,255,255,0.9)'
  },
  time: {
    color: '#fff'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Momnet;