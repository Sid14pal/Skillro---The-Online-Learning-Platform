let date = new Date();
const todaysDay = date.getDate();
const todaysMonth = date.getMonth();
const todaysWeekDay = date.getDay();
const year = date.getFullYear();

const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
const monthDays = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const htmlTodaysDay = document.querySelector('.todaysDay');
const htmlTodaysWeekDay = document.querySelector('.todaysWeekDay');
const htmlMonth = document.querySelector('.month');
const htmlYear = document.querySelector('.year');
const htmlDatesDiv = document.querySelector('.dates');
const htmlSelections = document.querySelector('#selections');

const howManyDaysInMonth = daysInMonth(todaysMonth, year);
const numWeek = getFirstDayInMonth(todaysMonth, year);


htmlTodaysDay.innerHTML = todaysDay;
htmlTodaysWeekDay.innerHTML = weekDays[todaysWeekDay];
htmlMonth.innerHTML = monthDays[todaysMonth];
htmlYear.innerHTML = year;


function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayInMonth(month, year) {
    return new Date(year, month).getDay();
}

function createElement(n, d) {
    for (let i = 0; i < n; i++) {
        let div = document.createElement('div');
        div.className = 'number';
        div.innerHTML = '';
        htmlDatesDiv.append(div);
    }
    for (let i = 1; i <= d; i++) {

        let div = document.createElement('div');
        div.className = 'number';
        div.innerHTML = i;
        htmlDatesDiv.append(div);
    }
}
createElement(numWeek, howManyDaysInMonth);

const numbers = Array.from(document.querySelectorAll('.number'));

numbers.forEach(function (number) {
    if (number.innerHTML === todaysDay.toString()) {
        number.classList.add('today');
    }
});

function monthImg(monthImg) {
    const htmlConteiner = document.querySelector('.container');
    const htmlText = document.querySelector('.text');
    switch (monthImg) {
        case 1:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2019/12/15/18/24/winter-4697776_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2019/12/15/18/24/winter-4697776_960_720.jpg")';
            break;
        case 2:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/11/12/22/42/santa-claus-1819933_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/11/12/22/42/santa-claus-1819933_960_720.jpg")';
            break;
        case 3:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/02/27/16/10/spring-276014_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/02/27/16/10/spring-276014_960_720.jpg")';
            break;
        case 4:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/12/04/14/46/magnolia-trees-556718_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295436_960_720.jpg")';
            break;
        case 5:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/12/17/21/30/wild-flowers-571940_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/12/17/21/30/wild-flowers-571940_960_720.jpg")';
            break;
        case 6:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2014/12/15/17/16/pier-569314_960_720.jpg")';
            break;
        case 7:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_960_720.jpg")';
            break;
        case 8:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/08/30/12/13/beach-1630540_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/08/30/12/13/beach-1630540_960_720.jpg")';
            break;
        case 9:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/09/06/15/16/autumn-1649362_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/09/06/15/16/autumn-1649362_960_720.jpg")';
            break;
        case 10:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_960_720.jpg")';
            break;
        case 11:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2019/10/31/06/58/avenue-4591121_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2019/10/31/06/58/avenue-4591121_960_720.jpg")';
            break;
        case 12:
            htmlConteiner.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/03/09/09/21/snowflake-1245748_960_720.jpg")';
            htmlText.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2016/03/09/09/21/snowflake-1245748_960_720.jpg")';
            break;
    }
}
monthImg(todaysMonth + 1);

htmlSelections.addEventListener('submit', function (e) {
    e.preventDefault();
    const htmlOptionsMonth = document.querySelector('#options-month');
    const htmlYearInput = document.querySelector('#year-input');

    if (htmlOptionsMonth.value != 'Month' && htmlYearInput.value != '') {
        date = new Date(`${htmlOptionsMonth.value} ${htmlYearInput.value}`);

        const newYear = parseInt(htmlYearInput.value);
        const newMonth = monthDays.indexOf(htmlOptionsMonth.value);

        const setMonthNum = daysInMonth(newMonth, newYear);
        const setWeekDay = getFirstDayInMonth(newMonth, newYear);
        htmlDatesDiv.innerHTML = '';
        htmlDatesDiv.innerHTML = `
            <div class="day">S</div>
            <div class="day">M</div>
            <div class="day">T</div>
            <div class="day">W</div>
            <div class="day">T</div>
            <div class="day">F</div>
            <div class="day">S</div>
        `;

        createElement(setWeekDay, setMonthNum);

        monthImg(newMonth + 1);

        document.querySelector('.text h2').style.display = 'none';
        htmlMonth.innerHTML = monthDays[newMonth];
        htmlYear.innerHTML = newYear;

    }
    htmlOptionsMonth.value = 'Month';
    htmlYearInput.value = '';
})