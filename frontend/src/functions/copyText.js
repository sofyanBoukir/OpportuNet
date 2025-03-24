export const copyText = (text,setNotificatiom) =>{
    setNotificatiom(null)
    navigator.clipboard.writeText(text)
    .then(() => setNotificatiom({type:'success',message:'Link copied to cliboard'}))
}