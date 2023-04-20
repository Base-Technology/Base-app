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