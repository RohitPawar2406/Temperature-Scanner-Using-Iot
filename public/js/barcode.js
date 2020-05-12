
var barcode = document.querySelector('#barcode')
var BarcodeID = document.querySelector('#BarcodeID')
var Name = document.querySelector('#name')
var details = document.querySelector('#details')
var table = document.querySelector('#table')

function myFunction() {
  table.style.visibility = "hidden"
  user.style.visibility = "hidden"
  console.log(barcode.value)
    fetch('/barcode', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"BarcodeID": barcode.value})
    }).then((content) => content.json()).then(function(content) {
        console.log(content[0])  
        if(content[0]!=undefined)
        {table.style.visibility = "visible"
        user.style.visibility = "visible"}
        BarcodeID.textContent = "BarcodeID: " + content[0].BarcodeID
        Name.textContent = "Name: " + content[0].name
        details.textContent = "Details:"
        var data="";
        for(i in content[0].Temperature)
        {
          var x  = content[0].Temperature[i]
          console.log('In for')
          data +="<tr><td>" + x.temp + "</td><td>" + x.date + "</td><td>" + x.time + "</td></tr>"
      }
    console.log('data:',data)
        var info = document.getElementById('info')
        info.innerHTML = data
        }).catch(function(error) {
          details.textContent = "Invalid Barcode!"
        console.log(error)
      });   
    }