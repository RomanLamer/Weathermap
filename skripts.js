document.onclick = function (event) {
    let tar =  event.target;
    if (tar.classList.value === 'nav_item') {
            document.querySelectorAll('.nav_item').forEach((e)=>{
                e.classList.value = 'nav_item' 
            });
        tar.classList.add('active');
        document.querySelectorAll('.list').forEach((e)=>{
        e.classList.value = 'list none'
        })
        document.getElementById(tar.innerText).classList.remove('none');
        document.getElementById(tar.innerText).classList.add('wisble');
    }
}

const API_KEY = "3f42f0c2fce8618134591d05ef21004a"; 
const btn  = document.querySelector('button');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const city = document.querySelector('input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then(response => {return response.json()}).then(data => {
    document.getElementById('name').innerText =  data.name;
    document.getElementById('country').innerText =  data.sys.country;
    document.getElementById('deg1').innerText =  Math.round(data.main.temp-273)+"°";
    document.getElementById('icon').src =  `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
    console.log(data)
    setInterval(()=>{
        let cuurentDay = 0;
        let myTime;
        if (new Date().getHours()-3 + data.timezone / 3600 >= 0) {
            myTime =new Date().getHours()-3 + data.timezone / 3600
        }else{
            myTime =new Date().getHours()-3 + data.timezone / 3600 +24
            cuurentDay = -1
        }
        let AmPm = "AM"
        if (myTime > 12) {
            myTime = myTime - 12;
            AmPm = "PM";
        }
        let time  = `${myTime}:${new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()} ${AmPm}`    
        document.getElementById('time').innerHTML = time;
        let day;
        switch (new Date().getDay() +cuurentDay) {
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
        
            case 5:
                day = "Friday";
                break;
        
            case 6:
                day = "Saturday";
                break;
        
            case 7:
                day = "Sunday";
                break;
        
        }
        let month;
        switch (new Date().getMonth()+1) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
        
            case 5:
                month = "May";
                break;
        
            case 6:
                month = "June";
                break;
        
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
        
        }
        document.getElementById('day').innerHTML = `${day},${month} ${new Date().getDate()+cuurentDay}th`;})
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
    exclude=hourly&appid=${API_KEY}`).then(response =>{return response.json()}).then(content=>{
        console.log(content)
        let myTime;
        let myDay = 0;
        if (new Date().getHours()-3 + data.timezone / 3600 >= 0) {
            myTime =new Date().getHours()-3 + data.timezone / 3600
        }else{
            myTime =new Date().getHours()-3 + data.timezone / 3600 +24
            myDay = -1
        }
        document.getElementById('deg').innerText =  Math.round(content.hourly[myTime].temp - 273)+"°";
        for (let i = 0; i < 6 ; i++) {
        document.getElementById(`mydeg${i}`).innerHTML = Math.round(content.hourly[myTime+i+1].temp - 273)+"°";
        document.getElementById(`currentTime${i}`).innerHTML = myTime+i+1 + ":00";   
        document.getElementById(`icon${i}`).src =  `https://openweathermap.org/img/wn/${content.hourly[myTime+i+1].weather[0]['icon']}@2x.png`;
        }
        for (let i = 0; i <= 6 ; i++) {
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        document.getElementById(`myDay${i}`).innerHTML = Math.round(content.daily[i].temp.day - 273)+"°";
        document.getElementById(`currentDay${i}`).innerHTML = days[new Date().getDay() +myDay -1+i];   
        document.getElementById(`iconDay${i}`).src =  `https://openweathermap.org/img/wn/${content.daily[i].weather[0]['icon']}@2x.png`;
        }
    })
    }).then(document.querySelector('.card').classList.remove('none'));
})

//3f42f0c2fce8618134591d05ef21004a
