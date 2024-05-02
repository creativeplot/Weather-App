


// getting the device location
function getDeviceLocation() {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject('Geolocation not supported by browser')
        }
    })
}



// handling promisse and assigning values
// this function handles the function that gets the device location, takes the location info and put it inside the wheater URL
async function localWeatherData() {
    const position = await getDeviceLocation();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const timeZoneData = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,uv_index&hourly=temperature_2m,apparent_temperature,cloud_cover,precipitation_probability,is_day&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=${timeZoneData}`);

    const data = await response.json();


    return data
}


async function wheaterInfoAssignment() {

    const { current, daily, hourly } = await localWeatherData()


    // selecting html tag for main temperature info
    const mainTemperature = document.querySelector('.current-temperature');

    // get main temperature info and selecting only one decimal
    const temperature = current.temperature_2m.toString().split('.')[0];

    // assigning main temperature info to html tag text
    mainTemperature.innerText = temperature + '°';


    // temperature feeling
    const feelsLike = document.querySelector('.feels-like');

    const apparentTemperature = current.apparent_temperature.toString().split('.')[0];

    feelsLike.innerText = apparentTemperature + '°';


    // day min and max temperature
    const minTemp = document.querySelector('.min-temp');
    const maxTemp = document.querySelector('.max-temp');

    const dayMin = daily.temperature_2m_min[0].toString().split('.')[0];
    const dayMax = daily.temperature_2m_max[0].toString().split('.')[0];

    minTemp.innerText = dayMin + '°';
    maxTemp.innerText = dayMax + '°';




    // ----------------------------------------------


    // Day or Night


    // data is day or night
    const isDay = current.is_day;

    // get main icon
    const mainIcon = document.querySelector('#main-icon');





   // -----------------------------------------------





    // Cloud Covering

    // Sky State terms
    // 0-30%  Sunny/Clear
    // 30-60% Partly cloudy
    // 60-70% Partly sunny
    // 70-90% Mostly cloudy
    // 90-100% Overcast


    // text container
    const skyState = document.querySelector('.weather-state')


    // hourly cloud percentage
    const cloudPercentage = hourly.cloud_cover;

    // get time in a 24 hours format
    let now = new Date();

    // Get hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Ensure two-digit formatting
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // hourly cloud cover info for today that match the current hour
    const cloudCoverRightNow = cloudPercentage.slice(0, 24).map((centageValue, indexCloud) => {
        if(indexCloud === hours){
            return centageValue
        }
    }).filter(values => values != undefined)[0];

    // display cloud info according to current time.
    switch(true){
        case cloudCoverRightNow >= 0 && cloudCoverRightNow <= 30:
                    if(isDay){
                        skyState.innerText = 'Sunny'
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-sun-fill');
                    }else {
                        skyState.innerText = 'Clear'
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-moon-fill')
                    }
                    break;

                    case cloudCoverRightNow >= 30 && cloudCoverRightNow <= 60:
                    skyState.innerText = 'Partly Cloudy'
                    if(isDay){
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-sun-cloudy-fill');
                    }else {
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-moon-cloudy-fill')
                    }
                    break;

                    case cloudCoverRightNow >= 60 && cloudCoverRightNow <= 70:
                    if(isDay){
                        skyState.innerText = 'Partly Sunny';
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-sun-cloudy-fill');
                    }else {
                        skyState.innerText = 'Partly Clear';
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-moon-cloudy-fill')
                    }
                    break;

                    case cloudCoverRightNow >= 70 && cloudCoverRightNow <= 90:
                    skyState.innerText = 'Mostly Cloudy'
                    if(isDay){
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-sun-cloudy-fill');
                    }else {
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-moon-cloudy-fill')
                    }
                    break;

                    case cloudCoverRightNow >= 90 && cloudCoverRightNow <= 100:
                    skyState.innerText = 'Cloudy'
                    if(isDay){
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-cloudy-2-fill');
                    }else {
                        mainIcon.className = '';
                        mainIcon.classList.add('ri-cloudy-2-fill')
                    }
                    break;
    }




   // -----------------------------------------------




    // Precipitation Probability
    const PrecipitationContainer = document.querySelector('.precipitation-probabi');  


    const rainProbability = hourly.precipitation_probability;


    // Format time in 24-hour format 
    const dayTime = `${hours}:${minutes}`;


    switch(true){
        case dayTime >= '00:00' && dayTime <= '00:59':
            PrecipitationContainer.innerText = rainProbability[0] + '%';
            break;

        case dayTime >= '01:00' && dayTime <= '01:59':
            PrecipitationContainer.innerText = rainProbability[1] + '%';
            break;

        case dayTime >= '02:00' && dayTime <= '02:59':
            PrecipitationContainer.innerText = rainProbability[2] + '%';
            break;

        case dayTime >= '03:00' && dayTime <= '03:59':
            PrecipitationContainer.innerText = rainProbability[3] + '%';
            break;

        case dayTime >= '04:00' && dayTime <= '04:59':
            PrecipitationContainer.innerText = rainProbability[4] + '%';
            break;

        case dayTime >= '05:00' && dayTime <= '05:59':
            PrecipitationContainer.innerText = rainProbability[5] + '%';
            break;

        case dayTime >= '06:00' && dayTime <= '06:59':
            PrecipitationContainer.innerText = rainProbability[6] + '%';
            break;

        case dayTime >= '07:00' && dayTime <= '07:59':
            PrecipitationContainer.innerText = rainProbability[7] + '%';
            break;

        case dayTime >= '08:00' && dayTime <= '08:59':
            PrecipitationContainer.innerText = rainProbability[8] + '%';
            break;

        case dayTime >= '09:00' && dayTime <= '09:59':
            PrecipitationContainer.innerText = rainProbability[9] + '%';
            break;

        case dayTime >= '10:00' && dayTime <= '10:59':
            PrecipitationContainer.innerText = rainProbability[10] + '%';
            break;

        case dayTime >= '11:00' && dayTime <= '11:59':
            PrecipitationContainer.innerText = rainProbability[11] + '%';
            break;

        case dayTime >= '12:00' && dayTime <= '12:59':
            PrecipitationContainer.innerText = rainProbability[12] + '%';
            break;

        case dayTime >= '13:00' && dayTime <= '13:59':
            PrecipitationContainer.innerText = rainProbability[13] + '%';
            break;

        case dayTime >= '14:00' && dayTime <= '14:59':
            PrecipitationContainer.innerText = rainProbability[14] + '%';
            break;

        case dayTime >= '15:00' && dayTime <= '15:59':
            PrecipitationContainer.innerText = rainProbability[15] + '%';
            break;

        case dayTime >= '16:00' && dayTime <= '16:59':
            PrecipitationContainer.innerText = rainProbability[16] + '%';
            break;

        case dayTime >= '17:00' && dayTime <= '17:59':
            PrecipitationContainer.innerText = rainProbability[17] + '%';
            break;

        case dayTime >= '18:00' && dayTime <= '18:59':
            PrecipitationContainer.innerText = rainProbability[18] + '%';
            break;

        case dayTime >= '19:00' && dayTime <= '19:59':
            PrecipitationContainer.innerText = rainProbability[19] + '%';
            break;

        case dayTime >= '20:00' && dayTime <= '20:59':
            PrecipitationContainer.innerText = rainProbability[20] + '%';
            break;

        case dayTime >= '21:00' && dayTime <= '21:59':
            PrecipitationContainer.innerText = rainProbability[21] + '%';
            break;

        case dayTime >= '22:00' && dayTime <= '22:59':
            PrecipitationContainer.innerText = rainProbability[22] + '%';
            break;

        case dayTime >= '23:00' && dayTime <= '23:59':
            PrecipitationContainer.innerText = rainProbability[23] + '%';
            break;
    }



// ------------------------------------------------



    // UV Index

    // uv index number category
    // <2 = low /  green and yellow
    // 3-5 = moderate / yellow and red
    // 6-7 = high / just red
    // 8-10 = very high / red and light blue
    // 11+ = extreme / just light blue

    const uvLevel = document.querySelector('.uv-index-level');
    const uvIndexValue = current.uv_index;

    switch(true){
        case uvIndexValue >= 0.00 && uvIndexValue <= 2.00:
            uvLevel.innerText = 'Low';
            break;
        case uvIndexValue >= 2.00 && uvIndexValue <= 5.99:
            uvLevel.innerText = 'Moderate';
            break;
        case uvIndexValue >= 6.00 && uvIndexValue <= 7.99:
            uvLevel.innerText = 'High';
            break;
        case uvIndexValue >= 8.00 && uvIndexValue <= 10.99:
            uvLevel.innerText = 'Very High';
            break;
        case uvIndexValue > 10.99:
            uvLevel.innerText = 'Extreme';
            break;
    }




    // ----------------------------------------------



    // HOURLY SECTION,


    // get current time
    const currentDayTime = new Date();

    // Get time two hours in advance from the current time
    // I calculate the currentDayTime two hours ahead by adding 2 hours worth of milliseconds (2 * 60 * 60 * 1000) to currentDayTime, getTime() method returns the number of milliseconds since January 1, 1970, which allows me to perform arithmetic on the time.
    const hoursAheadOne = new Date(currentDayTime.getTime() + (2 * 60 * 60 * 1000));

    // get only the two first numbers to assigning them to temperature index value later
    const increasedHours1 = hoursAheadOne.getHours();


    const hoursAheadTwo = new Date(hoursAheadOne.getTime() + (1 * 60 * 60 * 1000));

    const increasedHours2 = hoursAheadTwo.getHours();


    const hoursAheadThree = new Date(hoursAheadTwo.getTime() + (2 * 60 * 60 * 1000));

    const increasedHours3 = hoursAheadThree.getHours();


    const hoursAheadFour = new Date(hoursAheadThree.getTime() + (1 * 60 * 60 * 1000));

    const increasedHours4 = hoursAheadFour.getHours();



    // Getting Just the first two numbers of hoursAhead
    const hoursFormattedOne = hoursAheadOne.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[0];

    const hoursFormattedTwo = hoursAheadTwo.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[0];

    const hoursFormattedThree = hoursAheadThree.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[0];

    const hoursFormattedFour = hoursAheadFour.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[0];


    // Getting Just 12 clock term of hoursAhead
    const twelveClockTerm1 = hoursAheadOne.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[1];

    const twelveClockTerm2 = hoursAheadTwo.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[1];

    const twelveClockTerm3 = hoursAheadThree.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[1];

    const twelveClockTerm4 = hoursAheadFour.toLocaleString('default', {
        hour: 'numeric',
    }).split(' ')[1];



    // TIME UPDATE
    // p html tags container
    const bottomHours = document.querySelector('.hour-bottom-container').children;

    // p html tags put in an array
    const pTags = Array.from(bottomHours);

    // display hours change dynamically
    pTags.forEach((tag, index) => {

        switch(true){
            case index === 0:
                if (twelveClockTerm1 === 'AM') {

                    tag.innerText = hoursFormattedOne + ':00 am' // these zeros are here because i dont want minutes updates showing on the bottom

                } else {
                    
                    tag.innerText = hoursFormattedOne + ':00 pm'
                }
                break;

            case index === 1:
                if (twelveClockTerm2 === 'AM') {

                    tag.innerText = hoursFormattedTwo + ':00 am'

                } else {

                    tag.innerText = hoursFormattedTwo + ':00 pm'
                }
                break;

            case index === 2:
                if (twelveClockTerm3 === 'AM') {

                    tag.innerText = hoursFormattedThree + ':00 am'

                } else {

                    tag.innerText = hoursFormattedThree + ':00 pm'

                }
                break;

            case index === 3:
                if (twelveClockTerm4 === 'AM') {

                    tag.innerText = hoursFormattedFour + ':00 am'

                } else {

                    tag.innerText = hoursFormattedFour + ':00 pm'
                }
                break;
        }
    });





    // ICON UPDATE
    // Time now term update
    const timeNow = new Date().toLocaleString(
        'default', {
            hour: 'numeric',
        }
    ).split(' ')[1];


    const cloudCover = cloudPercentage.slice(0, 24);

    const cloudCoverNextDay = cloudPercentage.slice(24, 48);

    // Ensures day or night icon change based on hourly info
    const anotherHourlyDay = hourly.is_day;

    // this filter is only for today values, if time in the bottom is changed and i have not config it yet to change for the next day, the info here is gonna behave in a strange way
    const day = anotherHourlyDay.filter((dayOrNight, indexDay) => indexDay === increasedHours1 || indexDay === increasedHours2 || indexDay === increasedHours3 || indexDay === increasedHours4);


    // html tags for the icons
    const iconBottom = document.querySelector('#icon-bottom');

    const iconBottom2 = document.querySelector('#icon-bottom2');

    const iconBottom3 = document.querySelector('#icon-bottom3');

    const iconBottom4 = document.querySelector('#icon-bottom4');


    cloudCover.forEach((cover, index) => {

        switch(true){
            case increasedHours1 === index:

                // TimeNow ensures the icons go back to the normal hours rotation
                if(timeNow === 'AM' || timeNow === 'PM'){
                    switch(true){
                        case cover >= 0 && cover <= 30:

                        if(day[0]){
                            iconBottom.className = '';
                            iconBottom.classList.add('ri-sun-fill');
                        }else {
                            iconBottom.className = '';
                            iconBottom.classList.add('ri-moon-fill')
                        }
                        break;
    
                        case cover >= 30 && cover <= 90:
                        if(day[0]){
                            iconBottom.className = '';
                            iconBottom.classList.add('ri-sun-cloudy-fill');
                        }else {
                            iconBottom.className = '';
                            iconBottom.classList.add('ri-moon-cloudy-fill')
                        }
                        break;
                        
                        case cover >= 90 && cover <= 100:
                        if(day[0]){
                            iconBottom.className = '';
                            iconBottom.classList.add('ri-cloudy-2-fill');
                        }else {
                            iconBottom.className = '';
                            iconBottom.classList.add('ri-cloudy-2-fill')
                        }
                        break;
                    }
                }
                // update icon for next day hour info
                if(twelveClockTerm1 === 'AM' && timeNow === 'PM'){

                    const coverNextDay = cloudCoverNextDay.filter((cover2, index2) => index2 === increasedHours1)

                    switch(true){
                        case coverNextDay >= 0 && coverNextDay <= 30:
                            if(day[0]){
                                iconBottom.className = '';
                                iconBottom.classList.add('ri-sun-fill');
                            }else {
                                iconBottom.className = '';
                                iconBottom.classList.add('ri-moon-fill')
                            }
                            break;
                        case coverNextDay >= 30 && coverNextDay <= 90:
                            if(day[0]){
                                iconBottom.className = '';
                                iconBottom.classList.add('ri-sun-cloudy-fill');
                            }else {
                                iconBottom.className = '';
                                iconBottom.classList.add('ri-sun-cloudy-fill')
                            }
                            break;
                        case coverNextDay >= 90 && coverNextDay <= 100:
                            if(day[0]){
                                iconBottom.className = '';
                                iconBottom.classList.add('ri-cloudy-2-fill');
                            }else {
                                iconBottom.className = '';
                                iconBottom.classList.add('ri-cloudy-2-fill')
                            }
                            break;
                    }
                }
                break;
                // full case 2
            case increasedHours2 === index:

                if(timeNow === 'AM' || timeNow === 'PM'){
                    switch(true){
                        case cover >= 0 && cover <= 30:
                        if(day[1]){
                            iconBottom2.className = '';
                            iconBottom2.classList.add('ri-sun-fill');
                        }else {
                            iconBottom2.className = '';
                            iconBottom2.classList.add('ri-moon-fill')
                        }
                        break;
    
                        case cover >= 30 && cover <= 90:

                        if(day[1]){
                            iconBottom2.className = '';
                            iconBottom2.classList.add('ri-sun-cloudy-fill');
                        }else {
                            iconBottom2.className = '';
                            iconBottom2.classList.add('ri-moon-cloudy-fill')
                        }
                        break;
    
                        case cover >= 90 && cover <= 100:
                        if(day[1]){
                            iconBottom2.className = '';
                            iconBottom2.classList.add('ri-cloudy-2-fill');
                        }else {
                            iconBottom2.className = '';
                            iconBottom2.classList.add('ri-cloudy-2-fill')
                        }
                        break;
                    } 
                }
                if(twelveClockTerm2 === 'AM' && timeNow === 'PM'){

                    const coverNextDay = cloudCoverNextDay.filter((cover2, index2) => index2 === increasedHours1)
                    switch(true){
                        case coverNextDay >= 0 && coverNextDay <= 30:
                            if(day[1]){
                                iconBottom2.className = '';
                                iconBottom2.classList.add('ri-sun-fill');
                            }else {
                                iconBottom2.className = '';
                                iconBottom2.classList.add('ri-moon-fill')
                            }
                            break;

                        case coverNextDay >= 30 && coverNextDay <= 90:
                            if(day[1]){
                                iconBottom2.className = '';
                                iconBottom2.classList.add('ri-sun-cloudy-fill');
                            }else {
                                iconBottom2.className = '';
                                iconBottom2.classList.add('ri-sun-cloudy-fill')
                            }
                            break;

                        case coverNextDay >= 90 && coverNextDay <= 100:
                            if(day[1]){
                                iconBottom2.className = '';
                                iconBottom2.classList.add('ri-cloudy-2-fill');
                            }else {
                                iconBottom2.className = '';
                                iconBottom2.classList.add('ri-cloudy-2-fill')
                            }
                            break;
                    }
                }                   
                break;
                // full case 3
            case increasedHours3 === index:

                if(timeNow === 'AM' || timeNow === 'PM'){
                    switch(true){
                        case cover >= 0 && cover <= 30:
                        if(day[2]){
                            iconBottom3.className = '';
                            iconBottom3.classList.add('ri-sun-fill');
                        }else {
                            iconBottom3.className = '';
                            iconBottom3.classList.add('ri-moon-fill')
                        }
                        break;
    
                        case cover >= 30 && cover <= 90:
                        if(day[2]){
                            iconBottom3.className = '';
                            iconBottom3.classList.add('ri-sun-cloudy-fill');
                        }else {
                            iconBottom3.className = '';
                            iconBottom3.classList.add('ri-moon-cloudy-fill')
                        }
                        break;
    
                        case cover >= 90 && cover <= 100:
                        if(day[2]){
                            iconBottom3.className = '';
                            iconBottom3.classList.add('ri-cloudy-2-fill');
                        }else {
                            iconBottom3.className = '';
                            iconBottom3.classList.add('ri-cloudy-2-fill')
                        }
                        break;
                    } 
                }
                if(twelveClockTerm3 === 'AM' && timeNow === 'PM'){

                    const coverNextDay = cloudCoverNextDay.filter((cover2, index2) => index2 === increasedHours1)

                    switch(true){
                        case coverNextDay >= 0 && coverNextDay <= 30:
                            if(day[2]){
                                iconBottom3.className = '';
                                iconBottom3.classList.add('ri-sun-fill');
                            }else {
                                iconBottom3.className = '';
                                iconBottom3.classList.add('ri-moon-fill')
                            }
                            break;

                        case coverNextDay >= 30 && coverNextDay <= 90:
                            if(day[2]){
                                iconBottom3.className = '';
                                iconBottom3.classList.add('ri-sun-cloudy-fill');
                            }else {
                                iconBottom3.className = '';
                                iconBottom3.classList.add('ri-sun-cloudy-fill')
                            }
                            break;

                        case coverNextDay >= 90 && coverNextDay <= 100:
                            if(day[2]){
                                iconBottom3.className = '';
                                iconBottom3.classList.add('ri-cloudy-2-fill');
                            }else {
                                iconBottom3.className = '';
                                iconBottom3.classList.add('ri-cloudy-2-fill')
                            }
                            break;
                    }
                }
                break;

            case increasedHours4 === index:

                if(timeNow === 'AM' || timeNow === 'PM'){
                    switch(true){

                        case cover >= 0 && cover <= 30:
                        if(day[3]){
                            iconBottom4.className = '';
                            iconBottom4.classList.add('ri-sun-fill');
                        }else {
                            iconBottom4.className = '';
                            iconBottom4.classList.add('ri-moon-fill')
                        }
                        break;
    
                        case cover >= 30 && cover <= 90:
                        if(day[3]){
                            iconBottom4.className = '';
                            iconBottom4.classList.add('ri-sun-cloudy-fill');
                        }else {
                            iconBottom4.className = '';
                            iconBottom4.classList.add('ri-moon-cloudy-fill')
                        }
                        break;
    
                        case cover >= 90 && cover <= 100:
                        if(day[3]){
                            iconBottom4.className = '';
                            iconBottom4.classList.add('ri-cloudy-2-fill');
                        }else {
                            iconBottom4.className = '';
                            iconBottom4.classList.add('ri-cloudy-2-fill')
                        }
                        break;
                    }
                }
                if(twelveClockTerm3 === 'AM' && timeNow === 'PM'){

                    const coverNextDay = cloudCoverNextDay.filter((cover2, index2) => index2 === increasedHours1)

                    switch(true){
                        case coverNextDay >= 0 && coverNextDay <= 30:
                            if(day[3]){
                                iconBottom4.className = '';
                                iconBottom4.classList.add('ri-sun-fill');
                            }else {
                                iconBottom4.className = '';
                                iconBottom4.classList.add('ri-moon-fill')
                            }
                            break;

                        case coverNextDay >= 30 && coverNextDay <= 90:
                            if(day[3]){
                                iconBottom4.className = '';
                                iconBottom4.classList.add('ri-sun-cloudy-fill');
                            }else {
                                iconBottom4.className = '';
                                iconBottom4.classList.add('ri-sun-cloudy-fill')
                            }
                            break;

                        case coverNextDay >= 90 && coverNextDay <= 100:
                            if(day[3]){
                                iconBottom4.className = '';
                                iconBottom4.classList.add('ri-cloudy-2-fill');
                            }else {
                                iconBottom4.className = '';
                                iconBottom4.classList.add('ri-cloudy-2-fill')
                            }
                            break;
                    }
            } 
            break;
        }
    });




    // RAIN PROBABILITY
    const rainProb = rainProbability.slice(0, 24);

    // Next day rain info
    const rainProbNextDay = rainProbability.slice(24, 48);

    const nextDayProb = rainProbNextDay.filter((prob, indexProb) => indexProb === increasedHours1 || indexProb === increasedHours2 || indexProb === increasedHours3 || indexProb === increasedHours4)


    // html tag for rain prob info
    const probContainer = document.querySelector('.rain-prob')

    const probContainer2 = document.querySelector('.rain-prob2')

    const probContainer3 = document.querySelector('.rain-prob3')

    const probContainer4 = document.querySelector('.rain-prob4')

    // display raind probability
    rainProb.forEach((prob, index) => {

        switch(true){
            case increasedHours1 === index:
                probContainer.innerText = prob + '%';

                // change probability for the next day
                if(twelveClockTerm1 === 'AM' && timeNow === 'PM'){

                    nextDayProb.forEach((probNext, indexValue) => {
                        if (increasedHours1 === indexValue){
                            probContainer.innerText = probNext + '%';
                        }
                    });
                }
                break;

            case increasedHours2 === index:
                probContainer2.innerText = prob + '%';

                if(twelveClockTerm2 === 'AM' && timeNow === 'PM'){
                    probContainer.innerText = nextDayProb[1] + '%';
                }
                break;

            case increasedHours3 === index:
                probContainer3.innerText = prob + '%';

                if(twelveClockTerm3 === 'AM' && timeNow === 'PM'){
                    probContainer.innerText = nextDayProb[2] + '%';
                }
                break;

            case increasedHours4 === index:
                probContainer4.innerText = prob + '%';

                if(twelveClockTerm4 === 'AM' && timeNow === 'PM'){
                    probContainer.innerText = nextDayProb[3] + '%';
                }
                break;
        };

    });

    

    // TEMPERATURE UPDATE
    // Dynamic temperature values container
    const firstBottomTemp = document.querySelector('.tb1')
    const secondBottomTemp = document.querySelector('.tb2')
    const thirdBottomTemp = document.querySelector('.tb3')
    const fourthBottomTemp = document.querySelector('.tb4')

    // get api hourly temperature for 7 days
    const hourlyTemp = hourly.temperature_2m;

    // selecting 24 hours temp today
    const todayTempValues = hourlyTemp.slice(0, 24).map((temp => Math.floor(temp)));
    
    // selecting 24 hours temp next day
    const nextDayTempValues = hourlyTemp.slice(24, 48).map((temp => Math.floor(temp)));


    // assing the hour value to temperature index value to get a dynamic update for temperature each time bottom hours changes
    todayTempValues.forEach((temp, index) => {

        if (increasedHours1 === index){

            const temperature = temp;
            firstBottomTemp.innerText = temperature + '°';

            // make sure temp values for the next day are showed
            if(twelveClockTerm1 === 'AM' && timeNow === 'PM'){

                nextDayTempValues.forEach((tempNext, indexNext) => {
                    if (increasedHours1 === indexNext) {
                        firstBottomTemp.innerText = tempNext + 'º'
                    }
                })
            }
        }

        if (increasedHours2 === index){

            const temperature = temp;
            secondBottomTemp.innerText = temperature + '°';

            if(twelveClockTerm2 === 'AM' && timeNow === 'PM'){

                nextDayTempValues.forEach((tempNext, indexNext) => {
                    if (increasedHours2 === indexNext) {
                        secondBottomTemp.innerText = tempNext + 'º'
                    }
                })
            }
        }

        if (increasedHours3 === index){

            const temperature = temp;
            thirdBottomTemp.innerText = temperature + '°';

            if(twelveClockTerm3 === 'AM' && timeNow === 'PM'){

                nextDayTempValues.forEach((tempNext, indexNext) => {
                    if (increasedHours3 === indexNext) {
                        thirdBottomTemp.innerText = tempNext + 'º'
                    }
                })

            }
        }

        if (increasedHours4 === index) {

            const temperature = temp;
            fourthBottomTemp.innerText = temperature + '°'

            if(twelveClockTerm4 === 'AM' && timeNow === 'PM'){

                nextDayTempValues.forEach((tempNext, indexNext) => {
                    if (increasedHours4 === indexNext) {
                        fourthBottomTemp.innerText = tempNext + 'º'
                    }
                })

            }
        
        }
    })


    // Bar Temperature Increase Dynamicaly
    // according to the difference between the highest and lowest numbers 

    // Bars
    const firstBar = document.querySelector('.first-bar');
    const secondBar = document.querySelector('.second-bar');
    const thirdBar = document.querySelector('.third-bar');
    const fourthBar = document.querySelector('.fourth-bar');

    // filtering the temperature according with hour
    const filTempToday1 = todayTempValues.filter((tempValue, indexTemp) => indexTemp === increasedHours1);
    const filTempToday2 = todayTempValues.filter((tempValue, indexTemp) => indexTemp === increasedHours2);
    const filTempToday3 = todayTempValues.filter((tempValue, indexTemp) => indexTemp === increasedHours3);
    const filTempToday4 = todayTempValues.filter((tempValue, indexTemp) => indexTemp === increasedHours4);

    // filtering the temperature according with hour for the next day
    const filNextTemp1 = nextDayTempValues.filter((tempN, indexN) => indexN === increasedHours1);
    const filNextTemp2 = nextDayTempValues.filter((tempN, indexN) => indexN === increasedHours2);
    const filNextTemp3 = nextDayTempValues.filter((tempN, indexN) => indexN === increasedHours3);
    const filNextTemp4 = nextDayTempValues.filter((tempN, indexN) => indexN === increasedHours4);

    // using array to store temperature values
    const todayTempArray = [...filTempToday1, ...filTempToday2, ...filTempToday3, ...filTempToday4];

    const nextTempArray = [...filNextTemp1, ...filNextTemp2, ...filNextTemp3, ...filNextTemp4];



    // setting variables for temperature values for today
    let firstHeight = todayTempArray[0];
    let secondHeight = todayTempArray[1];
    let thirdHeight = todayTempArray[2];
    let fourthHeight = todayTempArray[3];


    // setting variables for temperature values for next day
    let firstTomorrowHeight = nextTempArray[0];
    let secondTomorrowHeight = nextTempArray[1];
    let thirdTomorrowHeight = nextTempArray[2];
    let fourthTomorrowHeight = nextTempArray[3];


    // setting an array to store temperature values
    let heightArray = [firstHeight, secondHeight, thirdHeight, fourthHeight].map(heights => {
        // using map to handle zero and negative temperatures for bar visualization
        if (heights === 0) {

            return 0
            
        } else if (heights < 0) {

            let positiveNumber = Math.abs(heights) + 20;
            return positiveNumber; // turning the numbers positive so i can use them as height values

        } else {
            // adding 20 to temperature values so it can be used as height for temp bars on the page
            return heights + 20
        }
    });

    // changing the heightArray values to the next day temperature when the clock on bottom is AM
    if (timeNow === 'PM' && twelveClockTerm1 === 'AM') {
        heightArray[0] = firstTomorrowHeight
    }
    if (timeNow === 'PM' && twelveClockTerm2 === 'AM'){
        heightArray[1] = secondTomorrowHeight
    };
    if (timeNow === 'PM' && twelveClockTerm3 === 'AM'){
        heightArray[2] = thirdTomorrowHeight;
    }
    if(timeNow === 'PM' && twelveClockTerm4 === 'AM'){
        heightArray[3] = fourthTomorrowHeight;
    }

    // Find the lowest height
    // Here, i use the spread syntax (...) to spread the elements of heightArray into individual arguments for the Math.min function, which returns the lowest value among them.
    const lowestHeight = Math.min(...heightArray);

    // Calculate the increase amount based on the difference between lowest height and each height
    const increaseAmounts = heightArray.map(height => {
        const diff = height - lowestHeight;

        if(diff === 1) {
            return 5

        } else if (diff === 2) {
            return 10

        } else if (diff === 3) {
            return 15

        } else if (diff === 4) {
            return 25

        } else if (diff >= 5) {
            return 35
        }else {
            return 0
        }

    });

    // Apply the increase to the highest numbers
    // i iterated over each element of heightArray. If the current height is higher than the lowest height, i added the corresponding increased amount (determined earlier) to that height.
    for(let i = 0; i < heightArray.length; i++){
        if(heightArray[i] > lowestHeight){
            heightArray[i] += increaseAmounts[i]
        }
    }

    // get dynamic numbers from heightArray
    function getValues() {
        return heightArray;
    }
    const valuesFromArray = getValues();


    // applying dynamic hights to the page apperance
    firstBar.style.height = valuesFromArray[0] + 'px';
    secondBar.style.height = valuesFromArray[1] + 'px';
    thirdBar.style.height = valuesFromArray[2] + 'px';
    fourthBar.style.height = valuesFromArray[3] + 'px';

    // So, overall, the last part of this code first identifies the lowest height in the array, then calculates the increase amounts based on the difference between each height and the lowest height, and finally applies those increases only to the heights that are higher than the lowest height.


}
wheaterInfoAssignment()

setInterval(wheaterInfoAssignment, 500)



function getLocalDate() {

    const dayName = new Date().toLocaleString('default', {weekday: 'short'})

    const dayNumber = new Date().toLocaleString('default', {day: 'numeric'})

    const monthName = new Date().toLocaleString('default', {month: 'long'});

    const localTime = new Date().toLocaleString('default', {
        hour: 'numeric',
        minute: 'numeric',
    })

    assignLocalDate(dayName, dayNumber, monthName, localTime)

    return dayName, dayNumber, monthName, localTime
}

function assignLocalDate(dName, dNumber, month, time) {

    const weekday = document.querySelector('.day-name');

    const numericDay = document.querySelector('.day-number');

    const whatMonth = document.querySelector('.month');

    const hour = document.querySelector('.hour');
    const justHour = time.split(' ')[0];

    const amPm = document.querySelector('.am-pm');
    const clockTwelve = time.split(' ')[1];

    weekday.innerText = dName + ',';
    numericDay.innerText = dNumber;
    whatMonth.innerText = month;
    hour.innerText = justHour;
    amPm.innerText = clockTwelve;
};

setInterval(getLocalDate, 500);

// -------------------------------------------------

