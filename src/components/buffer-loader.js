

module.exports=function(content){
    let data = Buffer.from(content,'utf-8');
    return 'export default Buffer.from("'+data.toString('base64')+'", "base64")';
}
