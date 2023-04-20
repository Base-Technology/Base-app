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
