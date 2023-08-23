require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const postgres = require('postgres')

const URL = process.env.DB_URL

const sql = postgres(URL, { ssl: 'require' })

function addWhere(query,condition){

    query.strings=query.strings.map((string)=>{
        if(string.indexOf('WHERE') !== -1){
            return string=string + condition
        }

        return string
    })

}

function addSet(query,set){

    query.strings=query.strings.map((string)=>{
        if(string.indexOf('SET') != -1){
            return string=string + set
        }

        return string
    })

}

async function select(table,columns,condition){
    if(condition){
        const query=columns !=='*' ? sql `SELECT ${sql(columns)} FROM ${sql(table)} WHERE ` : sql `SELECT * FROM ${sql(table)} WHERE `

        addWhere(query,condition)
        
        const resul=await query.execute()
        
        sql.CLOSE
        
        return resul

    }else{
        const query= columns !== '*' ? sql `SELECT ${sql(columns)} FROM ${sql(table)}` : sql `SELECT * FROM ${sql(table)}`
        const result=await query.execute()

        sql.CLOSE

        return result
    }
}



async function update(table,set,condition){
    if(condition){

        const query=sql `UPDATE ${sql(table)} SET `

        addSet(query,set)

        query.strings=query.strings.map((string)=>{
            if(string.indexOf('SET') !== -1){
                return string=string + ' WHERE '
            }
            return string
        })

        addWhere(query,condition)

        await query.execute()
        
        sql.CLOSE
        
        return

    }else{
        const query= sql `UPDATE ${sql(table)} SET `

        addSet(query,set)

        query.execute()

        sql.CLOSE

        return
    }
}

async function deleteLine(table,condition){
    if(condition){
        const query=sql `DELETE FROM ${sql(table)} WHERE ` 

        addWhere(query,condition)
        
        await query.execute()
        
        sql.CLOSE
        
        return

    }else{
        const query=sql `DELETE FROM ${sql(table)}`

        await query.execute()

        sql.CLOSE

        return
    }
}

async function insert(table,insert){

    const keys=Object.keys(insert)

    await sql`insert into ${sql(table)} ${sql(insert, keys)}`
}

const functionsDb={
    select,
    update,
    deleteLine,
    insert
}

if(sql.options.user!=='Core i3'){
    console.log('Connected to database')
}else{
    throw new Error('Connection problem')
}

module.exports=functionsDb




