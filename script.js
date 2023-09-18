import data from './data.json' assert { type: 'json' }

const controlsList = document.querySelector('.controls-list')
const timeframeButtons = [...document.querySelectorAll('.controls-btn')]

controlsList.addEventListener('click', (e) => {
  if (
    e.target.matches('.controls-btn') &&
    !e.target.classList.contains('selected')
  ) {
    timeframeButtons.forEach((button) => button.classList.remove('selected'))
    e.target.classList.add('selected')
    renderData()
  }
})

function renderData() {
  const timeframe = getTimeframe()

  data.forEach((entry) => {
    const category = entry.title.toLowerCase().replace(' ', '-')
    const categoryEl = document.querySelector(`[data-category="${category}"]`)

    const currentValue = entry.timeframes[timeframe].current
    const currentEl = categoryEl.querySelector('.time-current')
    currentEl.innerText = `${currentValue}${currentValue === 1 ? 'hr' : 'hrs'}`

    const previousValue = entry.timeframes[timeframe].previous
    const previousEl = categoryEl.querySelector('.time-previous .value')
    previousEl.innerText = `${previousValue}${
      previousValue === 1 ? 'hr' : 'hrs'
    }`

    let period
    switch (timeframe) {
      case 'daily':
        period = 'Day'
        break
      case 'weekly':
        period = 'Week'
        break
      case 'monthly':
        period = 'Month'
    }

    const periodEl = categoryEl.querySelector('.time-previous .period')
    periodEl.innerText = period
  })
}

function getTimeframe() {
  const [selectedButton] = timeframeButtons.filter((btn) =>
    btn.classList.contains('selected')
  )
  const timeframe = selectedButton.dataset.timeframe
  return timeframe
}

renderData()
