const locationContainer = document.getElementById('location-container');
const locationOptions = document.getElementById('location-options');
const searchInput = document.getElementById('search_input');
const btn_dropdownMenu = document.getElementById('btn_dropdownMenu');
const btn_Temperature = document.getElementById('btn_Temperature');
const tempUnitElements = document.getElementsByClassName('tempUnit')
const temperatureElement = document.getElementById('temperature');
const dateElement = document.getElementById('date');
const minTempElement = document.getElementById('min-temp');
const maxTempElement = document.getElementById('max-temp');
let locationList = [];
let locations = [];
let weatherData, selectedLocation
let isCelsius = true;

const flipBox_inner = document.querySelector('#flipBox_inner');
const btn_turnLeft = document.querySelector('#btn_turnLeft');
const btn_turnRight = document.querySelector('#btn_turnRight');
const btn_likeLocation = document.querySelector('#btn_likeLocation');
const heartIcon = btn_likeLocation.querySelector('svg');
const div_pageBar = document.querySelector('#div_pageBar');
const btn_dotDefault = document.querySelector('#btn_dotDefault');
const mainContent = document.querySelector('#mainContent');
const div_onPageName = document.querySelector('#div_onPageName');
const likedLocation = {};
let currentPage = '';
let defaultPage = 'Chek Lap Kok';
let dotButtonOnPage = 'default';
let pageBarStore = ['default'];
let timeoutId = null;

const imageContainer = document.querySelector('.image-container');
const scrollBar = document.querySelector('.scroll-bar');
const borderedBoxes = document.querySelectorAll('.bordered-box');
let isMouseDown = false;
let startX;
let scrollLeft;

// new API 
cityList = ['London', 'New York', 'Paris', 'Sydney', 'Hong Kong',
    'Beijing', 'Rome', 'Tokyo', 'Mumbai', 'Dubai'
]
London_Data = {}
NewYork_Data = {}
Paris_Data = {}
Sydney_Data = {}
HongKong_Data = {}
Beijing_Data = {}
Rome_Data = {}
Tokyo_Data = {}
Mumbai_Data = {}
Dubai_Data = {}
const getAPI = async (city) => {
    const res = await fetch(
        "https://api.api-ninjas.com/v1/weather?city=" + city,
        {
            headers: {
                "X-Api-Key": "qbON8kNffWyBEzERfuAc8Q==Yq6oIj9NCywdo9vm",
            },
        },
    );
    const data = await res.json();
    console.log(data);
};
  
getAPI("Hong Kong");

// API
async function fetchWeatherData() {
    const [temperatureData, maxMinTemperatureData] = await Promise.all([
      fetchCSV(
        'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv'
      ),
      fetchCSV(
        'https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_since_midnight_maxmin.csv'
      ),
    ])
    weatherData = temperatureData.map((temperatureRow, index) => {
        const place = temperatureRow[1]
        const found = maxMinTemperatureData.find((element) => {
            return place === element[1]
        })
        return {
            recordTime: toDate(temperatureRow[0]),
            place,
            temperature: temperatureRow[2],
            maxTemperature: found[2],
            minTemperature: found[3],
        }
    })
    console.log(weatherData)
}
function toDate(dateString) {
    const year = dateString.slice(0, 4)
    const month = parseInt(dateString.slice(4, 6)) - 1
    const day = dateString.slice(6, 8)
    const hours = dateString.slice(8, 10)
    const minutes = dateString.slice(10, 12)
  
    return new Date(year, month, day, hours, minutes)
}
async function fetchCSV(targetUrl, removeTitle = true, removeTail = true) {
    const url = targetUrl
    const response = await fetch(url, { mode: 'cors'})
    const data = await response.text()
    const rows = data.split('\n')
    if (removeTitle) rows.shift()
    if (removeTail) rows.pop()
    return rows.map((row) => row.split(','))
}

// search bar
scrollBar.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollBar.offsetLeft;
    const walk = (x - startX) * 1.5; // 調整速度
    imageContainer.scrollLeft = scrollLeft - walk;
    updateThumbPosition();
});
function updateThumbPosition() {
    const thumbWidth = (scrollBar.offsetWidth / imageContainer.scrollWidth) * scrollBar.offsetWidth;
    const thumbLeft = (imageContainer.scrollLeft / imageContainer.scrollWidth) * scrollBar.offsetWidth;
    scrollThumb.style.width = `${thumbWidth}px`;
    scrollThumb.style.left = `${thumbLeft}px`;
}
window.addEventListener('resize', updateThumbPosition);
// 當用戶點擊 location-options 的 li 後
locationOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const selectedLocation = locations.find((loc) => loc.nameEn === e.target.querySelector('.enName').textContent);
      borderedBoxes.forEach(box => {
        const topText = box.querySelector('.top-text');
        const bottomText = box.querySelector('.bottom-text');
        topText.textContent = selectedLocation ? selectedLocation.nameZh : '';
        bottomText.textContent = selectedLocation ? selectedLocation.nameEn : '';
      });
    }
});

// API 
//bottomText.textContent = `max:${weatherForecast[0].forecastWind},`;
//hiru add
const apiUrl = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc';
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // 成功獲取數據後的處理
    console.log(data);
    // 計算價格總和
    /* const totalCost = data.reduce((total, item) => total + item.price, 0);
    console.log(`Total cost: $${totalCost}`); */
  })
  .catch(error => {
    // 請求發生錯誤時的處理
    console.error('Error fetching data:', error);
  });
/* const apiUrl = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc";
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // 成功獲取數據後的處理
    console.log(data);

    // 計算價格總和
    const totalCost = data.reduce((total, item) => total + item.price, 0);
    console.log(`Total cost: $${totalCost}`);
  })
  .catch((error) => {
    // 請求發生錯誤時的處理
    console.error("Error fetching data:", error);
  }); */
const rainfall = [
  {
    unit: "mm",
    place: "中西區",
    max: 4,
    main: "FALSE",
    min: 0,
  },
];
const rainfall0 = [
  {
    unit: "mm",
    place: "東區",
    max: 6,
    main: "FALSE",
    min: 1,
  },
];
const rainfall2 = [
  {
    unit: "mm",
    place: "離島區",
    max: 4,
    main: "FALSE",
    min: 1,
  },
];
const rainfall3 = [
  {
    unit: "mm",
    place: "油尖旺",
    max: 6,
    main: "FALSE",
    min: 1,
  },
];
const rainfall4 = [
  {
    unit: "mm",
    place: "南區",
    max: 4,
    main: "FALSE",
    min: 0,
  },
];
const rainfall5 = [
  {
    unit: "mm",
    place: "灣仔",
    max: 6,
    main: "FALSE",
    min: 3,
  },
];
const rainfall6 = [
  {
    unit: "mm",
    place: "西貢",
    max: 6,
    main: "FALSE",
    min: 0,
  },
];
const rainfall7 = [
  {
    unit: "mm",
    place: "九龍城",
    max: 5,
    main: "",
    min: 4,
  },
];
const rainfall8 = [
  {
    unit: "mm",
    place: "觀塘",
    max: 6,
    main: "",
    min: 4,
  },
];
const rainfall9 = [
  {
    unit: "mm",
    place: "元朗",
    max: 0,
    main: "",
    min: 4,
  },
];
const rainfall10 = [
  {
    unit: "mm",
    place: "大埔",
    max: 3,
    main: "FALSE",
    min: 0,
  },
];
const rainfall11 = [
  {
    unit: "mm",
    place: "沙田",
    max: 5,
    main: "FALSE",
    min: 1,
  },
];
const rainfall12 = [
  {
    unit: "mm",
    place: "東區",
    max: 6,
    main: "FALSE",
    min: 1,
  },
];
const rainfall13 = [
  {
    unit: "mm",
    place: "深水埗",
    max: 1,
    main: "FALSE",
    min: 1,
  },
];
const rainfall14 = [
  {
    unit: "mm",
    place: "屯門",
    max: 0,
    main: "FALSE",
    min: 1,
  },
];
const rainfall15 = [
  {
    unit: "mm",
    place: "荃灣",
    max: 1,
    main: "FALSE",
    min: 1,
  },
];
const rainfall16 = [
  {
    unit: "mm",
    place: "葵青",
    max: 1,
    main: "FALSE",
    min: 1,
  },
];
const rainfall17 = [
  {
    unit: "mm",
    place: "黃大仙",
    max: 7,
    main: "FALSE",
    min: 1,
  },
];
const fields = [
  {
    RISE: "05:39",
    SET: "19:09",
  },
];
const weatherForecast = [{ forecastWind: "南風3至4級。" }];
const humidity = [{ unit: "percent", value: 94, place: "香港天文台" }];
const uvindex = [{ value: 0.2, desc: "低" }];
const fieldsmoon = [
  {
    RISE: "16:41",
    SET: "02:59",
  },
];
if(location.nameZh === '長洲') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    `max:${rainfall2[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall2[0].unit}`;
}
if(location.nameZh === '香港天文台','京士柏') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall3[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall3[0].unit}`;
}
if(location.nameZh === '香港公園') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall[0].unit}`;
}
if(location.nameZh === '黃竹坑','赤柱') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall4[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall4[0].unit}`;
}
if(location.nameZh === '跑馬地') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall5[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall5[0].unit}`;
}
if(location.nameZh === '將軍澳','西貢') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall6[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall6[0].unit}`;
}
if(location.nameZh === '九龍城') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall7[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall7[0].unit}`;
}
if(location.nameZh === '觀塘',' 啟德跑道公園') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall8[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall8[0].unit}`;
}
if(location.nameZh === '流浮山','元朗公園') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall9[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall9[0].unit}`;
}
if(location.nameZh === '大美督',' 大埔（自然環境保護研究中心') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall10[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall10[0].unit}`;
}
if(location.nameZh === '沙田') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall11[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall11[0].unit}`;
}
if(location.nameZh === '筲箕灣') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall12[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall12[0].unit}`;
}
if(location.nameZh === '深水埗') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall13[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall13[0].unit}`;
}
if(location.nameZh === '屯門兒童及青少年院') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall14[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall14[0].unit}`;
}
if(location.nameZh === '荃灣城門谷','荃灣') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall15[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall15[0].unit}`;
}
if(location.nameZh === '新青衣站') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall16[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall16[0].unit}`;
}
if(location.nameZh === '黃大仙') {
    const firstBox = borderedBoxes[0];
    const topText = firstBox.querySelector('.top-text');
    const bottomText = firstBox.querySelector('.bottom-text');
    const bottomTexta = firstBox.querySelector('.bottom-texta');
    topText.textContent = "Rainfall";
    bottomText.textContent = `max:${rainfall17[0].max}`;
    bottomTexta.textContent = 
    `unit:${rainfall17[0].unit}`;
}
if(location.nameZh === '長洲','香港天文台','香港公園','黃竹坑','跑馬地','將軍澳','九龍城','京士柏','觀塘','流浮山','大美督','啟德跑道公園','沙田','西貢','筲箕灣','深水埗','赤柱','大埔（自然環境保護研究中心','屯門兒童及青少年院','荃灣城門谷','荃灣','新青衣站','黃大仙','元朗公園') {
    const SecondBox = document.querySelector('.bordered-box2');
    const topText2 = SecondBox.querySelector('.top-text2');
    const bottomText2 = SecondBox.querySelector('.bottom-text2');
    topText2.textContent = "ForecastWind";
    bottomText2.textContent = `max:${weatherForecast[0].forecastWind}`;
}
if(location.nameZh === '長洲','香港天文台','香港公園','黃竹坑','跑馬地','將軍澳','九龍城','京士柏','觀塘','流浮山','大美督','啟德跑道公園','沙田','西貢','筲箕灣','深水埗','赤柱','大埔（自然環境保護研究中心','屯門兒童及青少年院','荃灣城門谷','荃灣','新青衣站','黃大仙','元朗公園') {
    const ThirdBox = document.querySelector('.bordered-box3');
    const topText3 = ThirdBox.querySelector('.top-text3');
    const bottomText3 = ThirdBox.querySelector('.bottom-text3');
    const bottomText3a = ThirdBox.querySelector('.bottom-text3a');
    topText3.textContent = "Humidity";
    bottomText3.textContent = `unit:${humidity[0].unit}`;
    bottomText3a.textContent = `value:${humidity[0].value}`;
}
if(location.nameZh === '長洲','香港天文台','香港公園','黃竹坑','跑馬地','將軍澳','九龍城','京士柏','觀塘','流浮山','大美督','啟德跑道公園','沙田','西貢','筲箕灣','深水埗','赤柱','大埔（自然環境保護研究中心','屯門兒童及青少年院','荃灣城門谷','荃灣','新青衣站','黃大仙','元朗公園') {
    const FourBox = document.querySelector('.bordered-box4');
    const topText4 = FourBox.querySelector('.top-text4');
    const bottomText4 = FourBox.querySelector('.bottom-text4');
    const bottomText4a = FourBox.querySelector('.bottom-text4a');
    topText4.textContent = "Uvindex";
    bottomText4.textContent = `value:${uvindex[0].value}`;
    bottomText4a.textContent = `desc:${uvindex[0].desc}`;
}
if(location.nameZh === '長洲','香港天文台','香港公園','黃竹坑','跑馬地','將軍澳','九龍城','京士柏','觀塘','流浮山','大美督','啟德跑道公園','沙田','西貢','筲箕灣','深水埗','赤柱','大埔（自然環境保護研究中心','屯門兒童及青少年院','荃灣城門谷','荃灣','新青衣站','黃大仙','元朗公園') {
    const FiveBox = document.querySelector('.bordered-box5');
    const topText5 = FiveBox.querySelector('.top-text5');
    const bottomText5 = FiveBox.querySelector('.bottom-text5');
    const bottomText4a = FiveBox.querySelector('.bottom-text5a');
    topText5.textContent = "Sun";
    bottomText5.textContent = `RISE:${fields[0].RISE}`;
    bottomText4a.textContent = `SET:${fields[0].SET}`;
}
if(location.nameZh === '長洲','香港天文台','香港公園','黃竹坑','跑馬地','將軍澳','九龍城','京士柏','觀塘','流浮山','大美督','啟德跑道公園','沙田','西貢','筲箕灣','深水埗','赤柱','大埔（自然環境保護研究中心','屯門兒童及青少年院','荃灣城門谷','荃灣','新青衣站','黃大仙','元朗公園') {
    const SixBox = document.querySelector('.bordered-box6');
    const topText6 = SixBox.querySelector('.top-text6');
    const bottomText6 = SixBox.querySelector('.bottom-text6');
    const bottomText4a = SixBox.querySelector('.bottom-text6a');
    topText6.textContent = "Moon";
    bottomText6.textContent = `RISE:${fieldsmoon[0].RISE}`;
    bottomText4a.textContent = `SET:${fieldsmoon[0].SET}`;
}

// arrow button
btn_turnRight.addEventListener('click', () => {
    let num = calcDotNumber();
    currentPage = pageBarStore[num + 1];
    changeHeartIcon(); // must below line >> currentPage = pageBarStore[num + 1];
    changeData(); // must below line >> currentPage = pageBarStore[num + 1];
    dotButtonOnPage = pageBarStore[num + 1];
    changeDotStyle(); // must below line >> dotButtonOnPage = pageBarStore[num + 1];
    changArrowStyle(); // must below line >> dotButtonOnPage = pageBarStore[num + 1];
    turnFlipBox('right', 1);
    doAnimation_mainContent();
});
btn_turnLeft.addEventListener('click', () => {
    let num = calcDotNumber();
    if(pageBarStore[num - 1] === 'default') {
        currentPage = defaultPage;
    } else {
        currentPage = pageBarStore[num - 1];
    }
    changeHeartIcon();
    changeData();
    dotButtonOnPage = pageBarStore[num - 1];
    changeDotStyle();
    changArrowStyle();
    turnFlipBox('left', 1);
    doAnimation_mainContent();
});
function toButtonDisabled(option) {
    if(option === 'yes') {
        btn_turnRight.disabled = 'true';
        btn_turnLeft.disabled = 'true';
        for(let location in likedLocation) {
            likedLocation[location].disabled = 'true';
        }
    } else if(option === 'no') {
        btn_turnRight.removeAttribute('disabled');
        btn_turnLeft.removeAttribute('disabled');
        for(let location in likedLocation) {
            likedLocation[location].removeAttribute('disabled');
        }
    }
}

// like location button
btn_likeLocation.addEventListener('click', () => {
    if(currentPage in likedLocation) {
        deleteDotButton(likedLocation[currentPage]);
        changeHeartIcon();
        dotButtonOnPage = 'default';
        changeDotStyle(); // must below line >> dotButtonOnPage = 'default';
        changArrowStyle(); // must below line >> dotButtonOnPage = 'default';
        currentPage = defaultPage;
        changeData(); // must below line >> currentPage = defaultPage;
    } else {
        addDotButton();
        changeHeartIcon();
        changeDotStyle();
        changArrowStyle();
    }
});
function addDotButton() {
    /* if(isObjEmpty(likedLocation)) {
        btn_dotDefault.classList.add('btn_dotDefault-display');
    } */
    const btn_dot = document.createElement('button');
    btn_dot.classList.add('btn_dot');
    div_pageBar.appendChild(btn_dot);

    likedLocation[currentPage] = btn_dot;
    pageBarStore.push(currentPage);

    dotButtonOnPage = currentPage;

    pressDotButton(btn_dot, dotButtonOnPage);
}
function deleteDotButton(button) {
    button.remove()
    delete likedLocation[currentPage];
    pageBarStore.splice(pageBarStore.indexOf(currentPage), 1);
    if(isObjEmpty(likedLocation)) {
        btn_dotDefault.classList.remove('btn_dotDefault-display');
    }
}

// temperature button
btn_Temperature.addEventListener('click', () => {
    /* isCelsius = !isCelsius
    tempUnitElements.innerText = `°${isCelsius ? 'C' : 'F'}` */
    isCelsius = !isCelsius
    for (const tempUnit of tempUnitElements) {
        tempUnit.innerText = `°${isCelsius ? 'C' : 'F'}`
    }
    renderTemperature();
});

// dot button
btn_dotDefault.addEventListener('click', () => {
    currentPage = defaultPage
    changeHeartIcon();
    changeData();
    
    perpareToTurnFlipBox(calcDotDistance(btn_dotDefault));
    
    dotButtonOnPage = 'default';
    changeDotStyle();
    changArrowStyle();
    doAnimation_mainContent();
});
btn_dotDefault.addEventListener("mouseover", () => {
    div_onPageName.textContent = defaultPage;
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
});
btn_dotDefault.addEventListener('mouseout', mouseOut);
function pressDotButton(button, page) {
    button.addEventListener('click', () => {
        currentPage = page
        changeHeartIcon();
        changeData();
        
        perpareToTurnFlipBox(calcDotDistance(button));
        
        dotButtonOnPage = currentPage;
        changeDotStyle();
        changArrowStyle();
        doAnimation_mainContent();
    });
    button.addEventListener("mouseover", () => {
        div_onPageName.textContent = findObjKeyByValue(likedLocation, button);
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    });
    button.addEventListener('mouseout', mouseOut);
}
function mouseOut() {
    timeoutId = setTimeout(() => {
        div_onPageName.textContent = '';
        timeoutId = null;
    }, 1000);
}
function calcDotDistance(clickedDotButton) {
    let nowPageNum;
    let toPageNum;
    if(clickedDotButton === btn_dotDefault) {
        for(let i = 0; i < pageBarStore.length; i++) {
            if(pageBarStore[i] === dotButtonOnPage) {
                nowPageNum = i;
            }
            if(pageBarStore[i] === 'default') {
                toPageNum = i
            }
        }
    } else {
        for(let i = 0; i < pageBarStore.length; i++) {
            if(pageBarStore[i] === dotButtonOnPage) {
                nowPageNum = i;
            }
            if(pageBarStore[i] === findObjKeyByValue(likedLocation, clickedDotButton)) {
                toPageNum = i
            }
        }
    }
    return toPageNum - nowPageNum;
}
function calcDotNumber() {
    let num;
    for(let i = 0; i < pageBarStore.length; i++) {
        if(pageBarStore[i] === dotButtonOnPage) {
            num = i;
        }
    }
    return num;
}

// change information
function changeHeartIcon() {
    if(currentPage in likedLocation) {
        heartIcon.setAttribute('fill', 'red');
    } else {
        heartIcon.setAttribute('fill', '#0F1035');
    }
}
function changeData() {
    searchInput.textContent = currentPage;
    for (const location of locationList) {
        if(currentPage === location) {
            const data = findWeatherDataByLocation(location)
            temperatureElement.innerText = calcuateTemperature(data.temperature)
            maxTempElement.innerText = calcuateTemperature(data.maxTemperature)
            minTempElement.innerText = calcuateTemperature(data.minTemperature)
        }
    }
}
function changeDotStyle() {
    for(let location in likedLocation) {
        if(location === currentPage) {
            likedLocation[location].classList.add('btn_dot-selected');
        } else {
            likedLocation[location].classList.remove('btn_dot-selected');
        }
        if(dotButtonOnPage === 'default') {
            btn_dotDefault.classList.add('btn_dotDefault-selected');
            likedLocation[location].classList.remove('btn_dot-selected');
        } else {
            btn_dotDefault.classList.remove('btn_dotDefault-selected');
        }
    }
}
function changArrowStyle() {
    if(pageBarStore.length > 1) {
        let num = calcDotNumber();
        if(num === 0) {
            btn_turnRight.classList.add('btn_turnRight-show');
            btn_turnLeft.classList.remove('btn_turnLeft-show');
        } else if(num + 1 === pageBarStore.length) {
            btn_turnRight.classList.remove('btn_turnRight-show');
            btn_turnLeft.classList.add('btn_turnLeft-show');
        } else {
            btn_turnRight.classList.add('btn_turnRight-show');
            btn_turnLeft.classList.add('btn_turnLeft-show');
        } 
    } else {
        btn_turnRight.classList.remove('btn_turnRight-show');
        btn_turnLeft.classList.remove('btn_turnLeft-show');
    }
}

// Turn FlipBox 
function perpareToTurnFlipBox(number) {
    if(number > 0) {
        turnFlipBox('right', number)
    } else if(number < 0) {
        turnFlipBox('left', number*-1)
    } else if(number === 0) {
        return;
    }
}
function turnFlipBox(direction, times) {
    if(direction === 'right') {
        switch(times) {
            case 1:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(50%, 0) rotateY(90deg) translate(50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
            case 2:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(50%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
            case 3:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(50%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
            default:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(50%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(100%, 0) rotateY(90deg) translate(50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
        } 
    } else if(direction === 'left') {
        switch(times) {
            case 1:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(-50%, 0) rotateY(-90deg) translate(-50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
            case 2:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(-50%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
            case 3:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(-50%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
            default:
                flipBox_inner.style.transition = 'transform 0.6s';
                flipBox_inner.style.transform = 'translate(-50%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-100%, 0) rotateY(-90deg) translate(-50%, 0)';
                toButtonDisabled('yes');
                setTimeout(() => {
                    flipBox_inner.style.transition = 'transform 0s';
                    flipBox_inner.style.transform = 'translate(0, 0) rotateY(0)';
                    toButtonDisabled('no');
                }, 600);
                break;
        } 
    }
}

// mainContent animation
function doAnimation_mainContent() {
    mainContent.classList.add('mainContent-animation');
    setTimeout(() => {
        mainContent.classList.remove('mainContent-animation');
    }, 600);
}

// other
function isObjEmpty(obj) {
    return Object.values(obj).length === 0 && obj.constructor === Object;
}
function findObjKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

// dropdown menu
onStart()
async function onStart() {
  await fetchWeatherData()
  constructLocations()
  await onSelectedLocation(locationList[0])
  renderLocationOptions()
}
function constructLocations() {
    locationList = weatherData.map(data => data.place)
}
function findWeatherDataByLocation(location) {
    return weatherData.find(data => data.place === location)
}
function renderLocationOptions() {
    for (const location of locationList) {
        const li = document.createElement('li')
        const locationEnElement = document.createElement('p')
        locationEnElement.innerText = location
        li.appendChild(locationEnElement)
        li.addEventListener('click', async function () {
            await fetchWeatherData()
            onSelectedLocation(location)
            currentPage = searchInput.textContent;
            dotButtonOnPage = currentPage;
            if(!(pageBarStore.includes(currentPage))) {
                defaultPage = searchInput.textContent;
                dotButtonOnPage = 'default';
            }
            changeData();
            changeHeartIcon();
            changeDotStyle();
            changArrowStyle();
        })
        locationOptions.appendChild(li)
    }
}
async function onSelectedLocation(location) {
    selectedLocation = location
    const data = findWeatherDataByLocation(location)
    const locationEnElement = document.createElement('span')
    locationEnElement.innerText = data.place
    searchInput.replaceChildren(locationEnElement)
    hideLcoationList()
    renderTemperature()
    const formatter = new Intl.DateTimeFormat('en-HK', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
    dateElement.innerText = formatter.format(data.recordTime)
}
function renderTemperature() {
    const data = findWeatherDataByLocation(selectedLocation)
    temperatureElement.innerText = calcuateTemperature(data.temperature)
    maxTempElement.innerText = calcuateTemperature(data.maxTemperature)
    minTempElement.innerText = calcuateTemperature(data.minTemperature)
}
function calcuateTemperature(temperature) {
    if (isCelsius) return temperature
    return ((temperature * 9 / 5) + 32).toFixed(1)
}
btn_dropdownMenu.addEventListener('click', () => {
    locationContainer.hidden = !locationContainer.hidden;
});
function hideLcoationList() {
    locationContainer.hidden = true;
}

// setup before start 
searchInput.textContent = defaultPage;
currentPage = defaultPage;
btn_dotDefault.classList.add('btn_dotDefault-selected');

// --- test ----
/* const btn_AALocation = document.querySelector('#btn_AALocation'); 
const btn_BBLocation = document.querySelector('#btn_BBLocation'); 
const btn_CCLocation = document.querySelector('#btn_CCLocation'); 
const btn_DDLocation = document.querySelector('#btn_DDLocation'); 
const btn_EELocation = document.querySelector('#btn_EELocation'); 
const p_showLocation = document.querySelector('#p_showLocation'); */ 
/* const btn_test = document.querySelector('#btn_test');  */

/* btn_AALocation.addEventListener('click', () => {
    currentPage = btn_AALocation.textContent;
    changeData();
    changeHeartIcon();
});
btn_BBLocation.addEventListener('click', () => {
    currentPage = btn_BBLocation.textContent;
    changeData();
    changeHeartIcon();
});
btn_CCLocation.addEventListener('click', () => {
    currentPage = btn_CCLocation.textContent;
    changeData();
    changeHeartIcon();
});
btn_DDLocation.addEventListener('click', () => {
    currentPage = btn_DDLocation.textContent;
    changeData();
    changeHeartIcon();
});
btn_EELocation.addEventListener('click', () => {
    currentPage = btn_EELocation.textContent;
    changeData();
    changeHeartIcon();
}); */
/* btn_test.addEventListener('click', () => {
    console.log(likedLocation);
    console.log('currentPage: ', currentPage);
    console.log('defaultPage: ', defaultPage);
    console.log('dotButtonOnPage: ', dotButtonOnPage);
    console.log('pageBarStore: ', pageBarStore);
    console.log('searchInput', searchInput.textContent);
}); */ 
/* p_showLocation.addEventListener('click', () => {
    console.log(likedLocation);
    console.log('currentPage: ', currentPage);
    console.log('dotButtonOnPage: ', dotButtonOnPage);
    console.log('pageBarStore: ', pageBarStore);
    console.log('searchInput', searchInput.textContent);
}); */
/* p_showLocation.textContent = defaultPage; */

/* function checkDotLocation() {
    if(currentPage in likedLocation) {
        console.log('dot');
        changeDotStyle();
    } else {

    }
} */

