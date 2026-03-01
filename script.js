function displayTemperature(response){
    let temperature=document.querySelector("#Temperature-current");
    let temp=Math.round(response.data.temperature.current);
    temperature.innerHTML=temp;
    let iconUrl=response.data.condition.icon_url;
    let weatherIcon=document.querySelector("#weather");
    weatherIcon.innerHTML=`<img src=${iconUrl} alt="weather icon">`
    console.log(weatherIcon);
    console.log(response.data);
}

function displayHumidity(response){
    let humidy=document.querySelector("#humidity");
    let windSpeed=document.querySelector("#wind");
    humidy.innerHTML=`${response.data.temperature.humidity}%`;
    windSpeed.innerHTML=`${response.data.wind.speed}km/h`
    displayTemperature(response);
}

function dateDisplay(response){
    let date=new Date();
    let hours=checkHours(date.getHours());
    let minutes=checkMinutes(date.getMinutes());
    let days=["Sunday","Monday","Wednesday","thursday","Friday","Saturday"]
    let day=days[date.getDay()];
    let dateTime=document.querySelector("#date-time");
    dateTime.innerHTML=`${day} ${hours}:${minutes}, ${response.data.condition.description}`
    displayHumidity(response);
}

function checkHours(hours){
    if(hours<10){
        return `0${hours}`;
    }
    else{
        return hours;
    }
}
function checkMinutes(minutes){
    if(minutes<10){
        return `0${minutes}`;
    }
    else{
        return minutes;
    }
}

function displayResponse(response){
    let city=document.querySelector("#city");
    city.innerHTML=response.data.city;
    // console.log(response.data);
    dateDisplay(response);
    
}

function displayWeather(event){
    event.preventDefault();
    let formInput=document.querySelector("#Search-input");
    let apiKey="fa802d0et31047o097e3a46943abb4fe";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${formInput.value}&key=${apiKey}`
    axios.get(apiUrl).then(displayResponse)
}


let form=document.querySelector(".form")
form.addEventListener("submit",displayWeather);