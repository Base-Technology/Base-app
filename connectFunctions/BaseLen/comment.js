/* 发布评论publication
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseHub ： 对象，Hub和合约
* profileId : int， 评论者的profileId
* contentURI ： 评论内容的的标识
* profileIdPointed ： 被评论publication所在的profile的Id
* pubId ： publication Id
* referenceModuleData ： 初始化 follow module 时传递的参数
* collectModule ： 设置给publication的collect module 地址
* collectModuleData ： 初始化profile 的 collect module时传递的参数
* referenceModule ：  传递给reference module的参数
* referenceModuleInitdata ： 初始化 reference module 时传递的参数
*/
export async function comment(
  sender,
  wallet,
  baseHub,
  profileId,
  contentURI,
  profileIdPointed,
  pubId,
  referenceModuleData,
  collectModule,
  collectModuleData,
  referenceModule,
  referenceModuleInitdata,
) {
  const name = await baseHub.callStatic.getHandle(profileId);
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  if (name == '') {
    console.log('is not id of profile');
    return false;
  }
  const owner = await baseHub.callStatic.ownerOf(profileId)
  if(owner != wallet.address){
      console.log("is not owner")
      return false
   }
  const name2 = await baseHub.callStatic.getHandle(profileIdPointed);
  if (name == '') {
    console.log('targer is not profile');
    return false;
  }
  const pubCount = await baseHub.callStatic.getPubCount(profileIdPointed);
  if (pubCount < pubId) {
    console.log('is not publication of profile');
    return false;
  }

  const methodData = baseHub.interface.encodeFunctionData('comment', [
    {
      profileId: profileId,
      contentURI: contentURI,
      profileIdPointed: profileIdPointed,
      pubIdPointed: pubId,
      referenceModuleData: referenceModuleData,
      collectModule: collectModule,
      collectModuleInitData: collectModuleData,
      referenceModule: referenceModule,
      referenceModuleInitData: referenceModuleInitdata,
    }
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHub.address, methodData, {
      gasLimit: 1000000,
    });
}