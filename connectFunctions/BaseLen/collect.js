/* 收藏publication
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseHub ： 对象，Hub和合约
* collectorProfile : int， 收藏者的profileId
* profileId ： 被收藏publication所在的profile的Id
* pubId ： publication Id
* data：传递给collect module的参数
*/
export async function collect(sender, wallet, baseHub,collectorProfile, profileId,pubId, data){
    const name = await baseHub.callStatic.getHandle(profileId)
    if(name == ''){
        console.log('targer is not profile')
        return false
    }
    const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
    const owner = await baseHub.callStatic.ownerOf(collectorProfile)
    if(owner != wallet.address){
        console.log("is not owner")
        return false
     }
    const pubCount = await baseHub.callStatic.getPubCount(profileId)
    if(pubCount < pubId){
        console.log("is not publication of profile")
        return false
    }

    const methodData = baseHub.interface.encodeFunctionData('collect', [
        profileId,pubId, data,collectorProfile
      ]);
      const tx = await wallet
        .connect(sender)
        .execute(baseHub.address, methodData, {
          gasLimit: 1000000,
        });
}
