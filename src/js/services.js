import {adviceContent, adviceID, adviceList, boy, container, main, refreshPageButton} from './variables.js'


async function searchAdviceByID(slip_id) {
  const url = `https://api.adviceslip.com/advice/${slip_id}`
  const response = await fetch(url)
  const json = await response.json()

  if (slip_id > 224) {
    adviceContent.innerHTML = json.message.text
    adviceID.innerHTML = json.message.type
  } else {
    adviceID.innerHTML = `Dica #${json.slip.id}`
    adviceContent.innerHTML = json.slip.advice
  }
}


async function searchAdviceByQuery(query) {
  adviceList.innerText = ''
  const url = `https://api.adviceslip.com/advice/search/${query}`
  const response = await fetch(url)
  const json = await response.json()

  let todosResultados = json.slips

  if (todosResultados == undefined) {
    container.className = 'tip'
    adviceList.innerText = 'no tips found'
    container.appendChild(adviceList)
  } else {
    todosResultados.forEach(cadaResultado => {
      container.className = 'tip'
      adviceList.innerText += `${cadaResultado.id}) ${cadaResultado.advice} 
      
      `
      container.appendChild(adviceList)
    })
  }

  boy.className = 'boy-after-searching'
  main.className = 'main-after-searching'
  refreshPageButton.className = 'refresh-page-after-searching'
}

export { searchAdviceByID, searchAdviceByQuery }