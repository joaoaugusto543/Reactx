newExtractUserGiving.map((item)=>{
            itemArray=item.split('#')

            const newItem=itemArray.map((item,index)=>{
                console.log(index % 2)
                if(index % 2 !== 0){
                    return '"' + item + '"' 
                }else{
                    return item
                }
            })

            

            console.log(JSON.parse(newItem.join('')))
        })