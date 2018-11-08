
const puppeteer = require('puppeteer')
const url = "https://www.liepin.com/"
// const url = ''
let searchWord = '前端'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandobox'],
    dumpio: false,
    headless: false,
  })
  let page = await browser.newPage()
  try {
    await page.goto(url)
    page.setViewport({width: 1200, height: 800})
    await sleep(1000)
    await page.evaluate(async function() {
      var $ = window.$
      var sleep = time => new Promise(resolve => {
        setTimeout(resolve, time)
      })
      $('.input-main input')[0].value = '前端'
      $('.search-btn')[0].click()
      await sleep(2000)
    })
    page.on('load' ,()=> {
      var list = $(".sojob-list li")
      var infos = []
      if(list.length > 0) {
        list.each((index, item) => {
          var it = $(item)
          var title = it.find('h3')[0].innerText
          var money = it.find('.text-warning')[0].innerText
          var area = it.find('.area')[0].innerText
          var edu = it.find('.edu')[0].innerText
          var workYear = it.find('.edu + span')[0].innerText
          var href = it.find('a')[0].href
          var jodId = href.match(/\d+/g)[0]
          var info = {
            jodId,
            title,
            money,
            edu,
            area,
            href
          }
          infos.push(info)
        })
      }
      console.log(infos)
     return infos
    })
  } catch(e) {
    console.log(e)
  }
})()