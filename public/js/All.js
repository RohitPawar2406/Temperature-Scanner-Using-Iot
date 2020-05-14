
    fetch('/findAll', { method: 'GET'}).then((content) => content.json()).then(function(content) {
        console.log(content)   
        var data=""
        for(i in content)
        {
      console.log('In for')
      data +="<tr><td>" + content[i].BarcodeID + "</td><td>" + content[i].name + "</td><td></td><td></td><td></td></tr>"
      for(j in content[i].Temperature)
    {
        var x = content[i].Temperature
        data+= "<tr><td></td><td></td><td>" + x[j].date + "</td><td>"+ x[j].time + "</td><td>" + x[j].temp +  "</td></tr>"
    }
    }
        var info = document.getElementById('info')
        info.innerHTML = data
        }).catch(function(error) {
        console.log(error)
      });   