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
    document.getElementById('deg').innerText =  Math.round(data.main.temp-273)+"°";
    document.getElementById('deg1').innerText =  Math.round(data.main.temp-273)+"°";
    document.getElementById('icon').src =  `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
    console.log(data);
    
}).then(document.querySelector('.card').classList.remove('none'));
})

//3f42f0c2fce8618134591d05ef21004a
