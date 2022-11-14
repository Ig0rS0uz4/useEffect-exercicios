import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("")

  useEffect(()=>{
    if(tarefas.length>0){
      const tarefaString = JSON.stringify(tarefas)
      localStorage.setItem("tarefa", tarefas)
    }
  },[tarefas])


  useEffect(()=>{
    const tarefaGet = localStorage.getItem("tarefa")

    if(tarefaGet !== null){
      const tarefasArray = JSON.parse(tarefaGet)
      setTarefa(tarefasArray)
    }
  },[])

  const onChangeInput = (event) => {
    setInputValue(event.target.value)
  }
//============= 01 =================
  const criaTarefa = () => {
    const novaTarefa ={
      id: Date.now(),
      texto: inputValue,
      completa: false
    }
    console.log(tarefas)
    const copiaDoEstado = [...tarefas]

    copiaDoEstado.push(novaTarefa)

    setTarefa(copiaDoEstado)
    setInputValue("")
  }
//================== 02 ===================
  const selectTarefa = (id) => {
    const copiaTarefa = [...tarefas]
   
    const tarefaEncontrada = copiaTarefa.find((tarefa) =>{
      return tarefa.id === id
    })
    tarefaEncontrada.completa = !tarefaEncontrada.completa
   
    console.log(tarefaEncontrada)
    
    setTarefa(copiaTarefa)
    setInputValue("")
  }
//================ 03 ===============
  const onChangeFilter = (event) => {
    setFiltro(event.target.value)
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });


  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={onChangeInput} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </TarefaList>
    </div>
  )
}


export default App
