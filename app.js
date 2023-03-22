const dateField = document.getElementById('date');
const days = document.getElementById('col11');
const hours = document.getElementById('col12');
const mins = document.getElementById('col13');
const secs = document.getElementById('col14');
const toDateStr = "23 March 2023 10:10 PM"
var tDate = new Date(toDateStr);
const months = ["January",  "February",  "March",  "April",  "May",  "June",  "July",  "August",  "September",  "October",  "November", "December"];
  
dateField.innerText = toDateStr;

function start(){
    var now = new Date();
    var dayLeft = 0, hrsleft = 0, minleft = 0;
    var diff = (tDate - now )/1000;
    if(diff>0){
        dayLeft = Math.floor(diff/86400);
        diff-=dayLeft*86400;
        diff = Math.max(0, diff);
        
        hrsleft = Math.floor(diff/3600);
        diff-=hrsleft*3600;
        diff = Math.max(0, diff);

        minleft = Math.floor(diff/60); 
        diff-=minleft*60;
        diff = Math.max(0, Math.floor(diff));
    }
    

    days.innerText = dayLeft;
    hours.innerText = hrsleft;
    mins.innerText = minleft;
    secs.innerText =Math.max(diff, 0);

}

var beginInterval =  setInterval(() => {
                        start();
                    }, 1000);



function dateSet(){
    var inputs = document.getElementsByClassName('dateinput');
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    inputs[0].value = dt.toISOString().slice(0, 16); 
    inputs[0].style.display = 'block';
    inputs[1].style.display='block';
    inputs[2].style.display='block';
}

function okClicked(){
    tDate = new Date(document.getElementById('inputdate').value);
    console.log(tDate.getSeconds());
    const now = new Date();
    if( tDate < now){
        document.getElementById('date').style.fontSize = '80%'
        document.getElementById('date').innerText=dateTostr(tDate) + " Date is Already Past!"
    } else {
        document.getElementById('date').style.fontSize = '180%'
        clearInterval(beginInterval);
        beginInterval =  setInterval(() => {
            start();
        }, 1000);
        var inputs = document.getElementsByClassName('dateinput');
         
        inputs[0].style.display = 'none';
        inputs[1].style.display='none';
        inputs[2].style.display='none';
        document.getElementById('date').innerText= dateTostr(tDate); 
    }
}


function cancelled(){
    var inputs = document.getElementsByClassName('dateinput');
    
    inputs[0].style.display = 'none';
    inputs[1].style.display='none';
    inputs[2].style.display='none';
}


function dateTostr(str){
    return [addZero(str.getDate()), addZero(months[str.getMonth()]), addZero(str.getFullYear())].join(' ') + " "
        +  [addZero(str.getHours()%12),addZero(str.getMinutes()) ].join(':') 
        +  (str.getHours()>=12?"PM" : "AM");
}

function addZero( n){
    if( n < 10) {
        return "0"+ n;
    }
    else {
        return n;
    }
}