
var start = document.querySelector('#start')
var end = document.querySelector('#end')

// console.log(start.value)

function myFunction() {
    // console.log(start.value)
    table.style.visibility = "hidden"

    fetch('/maxtemp', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"startDate":start.value,
      "endDate": end.value})
    }).then((content) => content.json()).then(function(content) {
        console.log(content)   
        table.style.visibility = "visible"
        var data=""
        for(i in content)
        {
      console.log('In for')
      data +="<tr><td>" + content[i].Tempo + "</td><td>" + content[i].CurrentDate + "</td><td>" + content[i].Time + "</td></tr>"
    }
        var info = document.getElementById('info')
        info.innerHTML = data
        }).catch(function(error) {
        console.log(error)
      });   
    }