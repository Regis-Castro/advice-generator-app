import {adviceContent, adviceID, adviceList, boy, main, refreshPageButton} from './variables.js'
import { searchAdviceByID, searchAdviceByQuery } from "./services.js";

const adviceUpdateButton = document.querySelector('.show-another-tip')
const searchAdviceInputText = document.querySelector('input[type=text]')
const searchAdviceInputID = document.querySelector('input[type=number]')


async function getRandomAdvice() {
  const url = 'https://api.adviceslip.com/advice'
  const response = await fetch(url)
  const json = await response.json()

  adviceContent.innerHTML = json.slip.advice
  adviceID.innerHTML = `Tip #${json.slip.id}`
}


searchAdviceInputText.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    let adviceText = e.target.value
    searchAdviceByQuery(adviceText)
  }
})


searchAdviceInputID.addEventListener('change', (e) => {
  let adviceID = e.target.value
  searchAdviceByID(adviceID)
})


refreshPageButton.addEventListener('click', () => {
  adviceList.innerText = ''
  searchAdviceInputText.value = ''
  searchAdviceInputID.value = ''
  
  boy.className = 'boy'
  main.className = ''
  refreshPageButton.className = 'refresh-page'
})

adviceUpdateButton.addEventListener('click', getRandomAdvice)
getRandomAdvice()