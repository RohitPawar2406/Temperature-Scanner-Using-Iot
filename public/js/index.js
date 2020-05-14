var barcode = document.querySelector('#barcode')
var temp = document.querySelector('#temp')
var Name = document.querySelector('#name')
var details = document.querySelector('#details')
var table = document.querySelector('#table')
function myFunction() {

fetch('', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({"BarcodeID": barcode.value,
      "temperature": temp.value})
    }).then((content) => content.json()).then(function(content) {
        console.log(content[0])  
        BarcodeID.textContent = "BarcodeID: " + content.user.BarcodeID
        Name.textContent = "Name: " + content.user.name
        details.textContent = "Details:"
        var data="";
        for(i in content.user.Temperature)
        {
          var x  = content.user.Temperature[i]
          console.log('In for')
          data +="<tr><td>" + x.temp + "</td><td>" + x.date + "</td><td>" + x.time + "</td></tr>"
        }
    console.log('data:',data)
        var info = document.getElementById('info')
        if(data!=""||data!=undefined)
        {table.style.visibility = "visible"
        user.style.visibility = "visible"}
        info.innerHTML = data
        }).catch(function(error) {
            details.innerHTML = "Something went wrong!"
             console.log(error)
      });   
}