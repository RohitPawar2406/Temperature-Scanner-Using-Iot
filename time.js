
/*var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
console.log(dateTime)
console.log(typeof(dateTime))
console.log(typeof(date))*/

//const fruits = ['banana', 'pear', 'apple']
//const allfruits = fruits.concat(['mango', 'melon', 'avocado'])   
//console.log(allfruits)

/*const obj1={name:'asd',age:'5'}
const obj2={name:"da",age:'5'}
const obj3={name :'sd',age:"4"}

var array=[]
var i=0
while (i<3) {
    array.push(obj1)
    i++
}
console.log(array[0])*/
var obj='2020-05-01'
var obj2='2020-06-10'
var object={first:obj,second :obj2}

var datetime = require('node-datetime')
var dt = datetime.create(object.first)

var dates = dt.getDatesInRange(datetime.create(object.second))

const  rangeOfdates=[]
const user1=dates.map((variable)=>{
    var objecttoString=JSON.stringify(variable._now)
    const newDateString=objecttoString.slice(1,11)

    //Below is ranges of dates in form of string.
    rangeOfdates.push(newDateString)
    }) 

console.log("Total Dates in range is form of Array "+rangeOfdates)    


             




