import { useEffect, useState } from "react"
import { Link,useLocation,useNavigate, useParams } from "react-router-dom"
import AcoesCards from "../acoes/acoesCard"
import AcoesForms from "../acoes/acoesForms"
import Filtro from "../acoes/filtro"
import Exclusão from "../confirmacao/exclusao"
import Styles from './Conta.module.css'
import Message from '../layout/message'
import Loader from "../layout/loader"
import validarString from '../../regex/Regex.js'


function Conta(){

    const [Conta,setConta]=useState()
    const [Contas,setContas]=useState()
    const [mostrarExclusao,setMostrarExclusao]=useState(false)
    const [acao,setAcao]=useState({})
    const [aparecerFormsDepositar,setAparecerFormsDepositar]=useState(false)
    const [aparecerFormsSacar,setAparecerFormsSacar]=useState(false)
    const [aparecerExtrato,setAparecerExtrato]=useState(false)
    const [filtro,setFiltro]=useState({})
    const [aparecerMensagemDeValorInvalido,setAparecerMensagemDeValorInvalido]=useState(false)
    const [aparecerMensagemDeFaltaDeInformacao,setAparecerMensagemDeFaltaDeInformacao]=useState(false)
    const [aparecerMensagemDeNomeDepositoInvalido,setAparecerMensagemDeNomeDepositoInvalido]=useState(false)
    const [aparecerMensagemDeNomeSaqueInvalido,setAparecerMensagemDeNomeSaqueInvalido]=useState(false)
    const [aparecerMensagemDeDepositoRealizado,setAparecerMensagemDeDepositoRealizado]=useState(false)
    const [aparecerMensagemDeSaqueRealizado,setAparecerMensagemDeSaqueRealizado]=useState(false)
    
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    const location=useLocation()
   
    let messageEditadoComSucesso=''
   
    if(location.state){
        messageEditadoComSucesso=location.state.messageEditadoComSucesso        
    }

    const idConta=useParams()

    const history=useNavigate()


    useEffect(()=>{
        fetch(`http://localhost:5000/contas/${idConta.id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setConta(data))
    },[idConta])


    useEffect(()=>{
        fetch('http://localhost:5000/contas',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setContas(data))
    },[])


    function mostrarMensagemDeExclusao(){
        
        desaparecerExtrato()
        desaparecerFormsSaca()
        desaparecerFormsDeposita()
        setMostrarExclusao(true)
    }

    function tirarMensagemDeExclusao(){
        setMostrarExclusao(false)
    }

    function excluirConta(){
        fetch(`http://localhost:5000/contas/${idConta.id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setContas(Contas.filter(conta=>conta.id!==idConta.id)))
        .then(()=>history('/Contas',{state:{messageExclusao:'Conta excluida com sucesso!'}})).catch(error=>console.log(error))
        setMostrarExclusao(false)
    }

    function adicionarDeposito(){

    if(Conta.saldo<0){
        acao.valor-=(acao.valor * (10/100))
    }

    if(!acao.valor || !acao.nomeAcao){

        setAparecerMensagemDeFaltaDeInformacao(true)

        setTimeout(()=>{
            setAparecerMensagemDeFaltaDeInformacao(false)  
        },3000)

    }else if(acao.nomeAcao.match(validarString)){

        setAparecerMensagemDeNomeDepositoInvalido(true)

        setTimeout(()=>{
            setAparecerMensagemDeNomeDepositoInvalido(false)  
        },3000)
        
    }else if(acao.valor<=0){

        setAparecerMensagemDeValorInvalido(true)

        setTimeout(()=>{
            setAparecerMensagemDeValorInvalido(false)  
        },3000)

    }else{
        acao.tipo='Deposito'
            acao.id=Conta.acoes.length===0 ? acao.id=1 : acao.id=Conta.acoes[Conta.acoes.length-1].id+1
            Conta.saldo+=parseFloat(acao.valor)
            acao.desaparecerNoFront=false
            acao.dataDaAcao=today.toISOString().substring(0,10)
       
            Conta.acoes=[...Conta.acoes,acao]

            fetch(`http://localhost:5000/contas/${idConta.id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Conta)
            }).then(resp => resp.json()).then(data=>{
                setConta(data)
                setAcao({})
                setAparecerFormsDepositar(false)
                setAparecerMensagemDeDepositoRealizado(true)
            })

            setTimeout(()=>{
                setAparecerMensagemDeDepositoRealizado(false)  
            },3000)
    }

        }
        

    function adicionarSaque(){

        if(!acao.valor || !acao.nomeAcao){

            setAparecerMensagemDeFaltaDeInformacao(true)
    
            setTimeout(()=>{
                setAparecerMensagemDeFaltaDeInformacao(false)  
            },3000)
              
        }else if(acao.nomeAcao.match(validarString)){

            setAparecerMensagemDeNomeSaqueInvalido(true)
    
            setTimeout(()=>{
                setAparecerMensagemDeNomeSaqueInvalido(false)  
            },3000)
            
        }else if(acao.valor<=0){
            setAparecerMensagemDeValorInvalido(true)
            setTimeout(()=>{
                setAparecerMensagemDeValorInvalido(false)  
            },3000)

        }else{

            acao.tipo='Saque'
            acao.id=Conta.acoes.length===0 ? acao.id=1 : acao.id=Conta.acoes[Conta.acoes.length-1].id+1
            acao.desaparecerNoFront=false
        
            Conta.saldo-=parseFloat(acao.valor)
        
            Conta.acoes=[...Conta.acoes,acao]
            acao.dataDaAcao=today.toISOString().substring(0,10)
     

            fetch(`http://localhost:5000/contas/${idConta.id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Conta)
            }).then(resp => resp.json()).then(data=>{
                setConta(data)
                setAcao({})
                setAparecerFormsSacar(false)
                setAparecerMensagemDeSaqueRealizado(true)
                
            })

            setTimeout(()=>{
                setAparecerMensagemDeSaqueRealizado(false)  
            },3000)

        }
        
    }

    function aparecerFormsDeposita(){
        setAparecerFormsDepositar(true)
        setAparecerFormsSacar(false)
        setAparecerExtrato(false)
        
    }

    function desaparecerFormsDeposita(){
        setAparecerFormsDepositar(false)
    }

    function aparecerFormsSaca(){
        setAparecerFormsSacar(true)
        setAparecerFormsDepositar(false)
        setAparecerExtrato(false)
    }

    function desaparecerFormsSaca(){
        setAparecerFormsSacar(false)
    }

    
    function aparecer_extrato(){
        setAparecerFormsSacar(false)
        setAparecerFormsDepositar(false)
        setAparecerExtrato(true)
    }

    function desaparecerExtrato(){
        setAparecerExtrato(false)
    }

    function removerAcaoDoFront(id){

       
        for(let i=0; i<Conta.acoes.length;i++){
            if(Conta.acoes[i].id===id){
                Conta.acoes[i].desaparecerNoFront=true
            }
        }
        fetch(`http://localhost:5000/contas/${idConta.id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(Conta)
            }).then(resp => resp.json()).then(data=>setConta(data))
    }

    function deletarContaCaloteiro(){

        fetch(`http://localhost:5000/contas/${idConta.id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(resp=>resp.json()).then(data=>setContas(Contas.filter(conta=>conta.id!==idConta.id)))
        .then(()=>history('/Contas',{state:{messageExclusaoCaloteiro:'Conta Excluida,pague suas contas caloteiro!'}})).catch(error=>console.log(error))

    }

    return(
        <div>

            {!Conta && (<Loader/>)}


            { mostrarExclusao &&(<Exclusão excluir={excluirConta} tirarMensagem={tirarMensagemDeExclusao}/>)}

            { aparecerMensagemDeValorInvalido && (<Message message='Valor inválido' type='error'  />)}

            { aparecerMensagemDeFaltaDeInformacao && (<Message message='Informações não preenchidas' type='error'  />) }

            {aparecerMensagemDeNomeDepositoInvalido && (<Message message='Nome deposito inválido' type='error'  />)}

            {aparecerMensagemDeNomeSaqueInvalido && (<Message message='Nome Saque inválido' type='error'  />)}

            {aparecerMensagemDeDepositoRealizado && (<Message message='Deposito realizado com sucesso' type='sucesso'  />)}

            {aparecerMensagemDeSaqueRealizado && (<Message message='Saque realizado com sucesso' type='sucesso'  />)}

            {messageEditadoComSucesso && (<Message message={messageEditadoComSucesso} type='sucesso'/>)}
                 
        <div className={Styles.ContaPrincipal} >

            {Conta && (
                <div className={Styles.Conta}>
                <h2>{Conta.nomeConta}</h2>
                <p><span>Proprietário:</span> {Conta.nomeProprietario}</p>
                <p><span>Saldo:</span> R${Conta.saldo}</p>
                <p><span>CPF:</span> {Conta.cpfProprietario}</p>
                <p><span>Data de nascimento:</span> {Conta.dataNascimento}</p>
                <p><span>Tipo Conta:</span> {Conta.tipoConta.tipo}</p>
                <div className={Styles.buttons}>
                {Conta.saldo<0 && (<p className={Styles.contaNegativada}>Sua conta está negativada,seus depositos terão um desconto de 10%</p>)}
                <button onClick={mostrarMensagemDeExclusao}>Excluir conta</button>
                <Link to={`/EditarConta/${idConta.id}`}><button>Editar conta</button></Link>
                </div>
             
                <div className={Styles.tituloAcoes}>
                    <div className={Styles.acoes} >
                    <h3>Depositar:</h3>
                    {!aparecerFormsDepositar ? ( <button onClick={aparecerFormsDeposita} className={Styles.button}>Depositar</button>):(<button onClick={desaparecerFormsDeposita} className={Styles.button}>Fechar</button>)

                    }
                    </div>
                    {aparecerFormsDepositar && (<AcoesForms text='Depósito' Acao='Depositar' Conta={Conta} acao={acao} setAcao={setAcao} ex='Salario' setConta={setConta} funcao={adicionarDeposito}/>)}
                    
                </div>
              

                <div className={Styles.tituloAcoes}>
                    <div className={Styles.acoes}>
                        <h3>Sacar:</h3>
                        {!aparecerFormsSacar ? (<button onClick={aparecerFormsSaca} className={Styles.button}>Sacar</button>): (<button onClick={desaparecerFormsSaca} className={Styles.button}>Fechar</button>)}
                        
                    </div>
                    {aparecerFormsSacar && ( <AcoesForms text='Saque' Acao='Sacar' Conta={Conta} acao={acao} setAcao={setAcao} ex='Conta de luz' setConta={setConta} funcao={adicionarSaque} deletarConta={deletarContaCaloteiro}/>)}
                   
                </div>
                <div className={Styles.tituloAcoes}>
                <div className={Styles.acoes}>
                    <h3>Ver extrato:</h3>
                    {!aparecerExtrato ? (<button onClick={aparecer_extrato} className={Styles.button}>Ver extrato</button>): (<button onClick={desaparecerExtrato} className={Styles.button}>Fechar</button>)}
                    
                </div >
                {aparecerExtrato && (
                    <>
                    <Filtro filtro={filtro} setFiltro={setFiltro} ></Filtro>
                    <div className={Styles.cardsAcoes}>
                        {Conta && 
                            Conta.acoes.map(acao=>{
                                if((filtro.dataFiltrada === acao.dataDaAcao || !filtro.dataFiltrada) && (!filtro.tipoDaAcao || filtro.tipoDaAcao.tipo === acao.tipo || filtro.tipoDaAcao.tipo==='Todos') && (!filtro.nomeFiltrada || filtro.nomeFiltrada === acao.nomeAcao) ){
                                    return(<AcoesCards key={acao.id} id={acao.id} nomeAcao={acao.nomeAcao} valor={acao.valor} dataDaAcao={acao.dataDaAcao} tipo={acao.tipo} remover={removerAcaoDoFront} desaparecer={acao.desaparecerNoFront}/>)
                                }
                                return true;
                            })
                        }  
                </div>
                    
                    </>
                )}
                

                </div>
                </div>
             
                
            )}

            
        </div>
        </div>
    )
}

export default Conta

