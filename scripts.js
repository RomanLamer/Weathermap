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
    let city = document.querySelector('input').value;
    if (city != '') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then(response => {return response.json()}).then(data => {
    document.getElementById('name').innerText =  data.name;
    document.getElementById('country').innerText =  data.sys.country;
    document.getElementById('deg1').innerText =  Math.round(data.main.temp-273)+"°";
    console.log(data)
    let cuurentDay = 0;
    let myTime;
    if (new Date().getHours()-3 + data.timezone / 3600 >= 0) {
        myTime =new Date().getHours()-3 + data.timezone / 3600
    }else{
        myTime =new Date().getHours()-3 + data.timezone / 3600 +24
        cuurentDay = -1
    }
    let AmPm = "a.m."
    if (myTime > 12) {
        myTime = myTime - 12;
        AmPm = "p.m.";
    }
    let time  = `${myTime}:${new Date().getMinutes()<10?"0"+new Date().getMinutes(): new Date().getMinutes()} ${AmPm}`    
    document.getElementById('time').innerHTML = time;
    setInterval(()=>{
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
        for (let i = 0; i < 7 ; i++) {
        let li =  document.createElement('li');li.classList.add('list_item');
        let mydiv = document.createElement('div');mydiv.classList.add('listDegrees');mydiv.innerHTML = Math.round(content.hourly[myTime+i+1].temp - 273)+"°";
        let myp = document.createElement('p');myp.classList.add('listTime');myp.innerHTML= i === 0 ?"Now" : myTime+i > 23? myTime+i-24+":00": myTime+i + ":00";
        let cont = document.createElement('div');cont.classList.add('cont')
        let myimg = document.createElement('img');myimg.src = `https://openweathermap.org/img/wn/${content.hourly[myTime+i+1].weather[0]['icon']}@2x.png`;
        li.appendChild(myp)
        li.appendChild(cont)
        cont.appendChild(myimg)
        cont.appendChild(mydiv)
        document.getElementById('Today').appendChild(li)
        }
        for (let i = 0; i <= 6 ; i++) {
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        let li =  document.createElement('li');li.classList.add('list_item');
        let mydiv = document.createElement('div');mydiv.classList.add('listDegrees');mydiv.innerHTML =  Math.round(content.daily[i].temp.day - 273)+"°";
        let myp = document.createElement('p');myp.classList.add('listTime');myp.innerHTML=days[new Date().getDay() +myDay -1+i];
        let cont = document.createElement('div');cont.classList.add('cont')
        let myimg = document.createElement('img');myimg.src = `https://openweathermap.org/img/wn/${content.daily[i].weather[0]['icon']}@2x.png`;
        li.appendChild(myp)
        li.appendChild(cont)
        cont.appendChild(myimg)
        cont.appendChild(mydiv)
        document.getElementById('Week').appendChild(li)
        }
    })
    }).then(()=>{ if ( document.getElementById('name').innerText != "undefined") {
    document.querySelector('.card').classList.remove('none')
    document.querySelector('.back').classList.remove('none')   
    }else{
        alert("Invalid city name");
    }
});       
}else{
    alert("Invalid city name")}
})
document.querySelector('.back').addEventListener('click',()=>{
    document.querySelector('.card').classList.add('none')
    document.getElementById('Week').innerHTML= "";
    document.getElementById('Today').innerHTML= "";
    document.querySelector('input').value = ""
        
})

//3f42f0c2fce8618134591d05ef21004a
