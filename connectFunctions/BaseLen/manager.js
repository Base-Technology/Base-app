export async function setState(sender, state){
    const governance = await baseHub.callstatic.getGovernance()
    if(governance != sender.addess)
    await baseHub.connect(sender).setState(state,{gasLimit: 2400000})
    return true
}

