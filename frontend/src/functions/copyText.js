export const copyText = async (text,setNotificatiom) =>{
    setNotificatiom(null)    
    await navigator.clipboard.writeText(text)
    .then(() => setNotificatiom({type:'success',message:'Link copied to cliboard'}))
}