function transformerExtrato(extrato){

    const extratoArray=extrato.map((item)=>{
        return item.split('&')
    })

    const newExtrato=extratoArray.map((item)=>{
        item=item.map((str)=>{
            str=str.split('#').join('"')
            return str
        })

        return JSON.parse('{' + item.join(',') + '}')
    })

    return newExtrato
}

export default transformerExtrato