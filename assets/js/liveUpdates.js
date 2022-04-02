

var xhrRequest = new XMLHttpRequest() ; 
xhrRequest.open("get","https://data.covid19india.org/data.json",true); 
xhrRequest.send() ; 

var table = document.getElementById("table-for-live-updates") ; 
var inputField = document.getElementById("filter-for-Covid-cases")
var statewise ; 
var states = [] ; 
var deaths = [] ; 
var recovered = [] ; 
var comfirmed = [] ; 
var active= [] ;

xhrRequest.onload = function(){
    var responseJSON = JSON.parse(xhrRequest.response) ; 
    console.log(responseJSON) ; 
    statewise = responseJSON.statewise ; 
    document.getElementById("Confirmed").innerHTML = statewise[0].confirmed ; 
    document.getElementById("Active").innerHTML = statewise[0].active ; 
    document.getElementById("Recovered").innerHTML = statewise[0].recovered ; 
    document.getElementById("Deceased").innerHTML = statewise[0].deaths ; 

    for(let i = 1 ; i < statewise.length ; i += 1){
        states.push(statewise[i].state) ; 
        deaths.push(statewise[i].deaths) ; 
        recovered.push(statewise[i].recovered) ; 
        comfirmed.push(statewise[i].confirmed) ; 
        active.push(statewise[i].active) ; 
    }
    var myChart1 = document.getElementById("myChart1").getContext("2d") ; 
    var chart = new Chart(myChart1 , {
        type : "line"  , 
        data: {
            labels : states , 
            datasets : [
                {
                    label : "Comfirmed Cases" , 
                    data : comfirmed , 
                    backgroundColor : "#f1c40f " , 
                    minBarLength : 100 
                } , 
                {
                    label : "Deaths" , 
                    data : deaths , 
                    backgroundColor : "red" , 
                    minBarLength : 100 
                } , 
                {
                    label: "Recovered" , 
                    data : recovered , 
                    backgroundColor : "#a1ff0a" , 
                    minBarLength : 100 
                } , 
                {
                    label : "Active Caess" , 
                    data : active , 
                    backgroundColor: "#0096c7" , 
                    minBarLength : 100 
                }
            ]
        }
    })
    var myChart2 = document.getElementById("myChart2").getContext("2d") ; 
    var chart = new Chart(myChart2 , {
        type : "bar"  , 
        data: {
            labels : states , 
            datasets : [
                {
                    label : "Comfirmed Cases" , 
                    data : comfirmed , 
                    backgroundColor : "#f1c40f " , 
                    minBarLength : 100 
                } , 
                {
                    label : "Deaths" , 
                    data : deaths , 
                    backgroundColor : "red" , 
                    minBarLength : 100 
                } , 
                {
                    label: "Recovered" , 
                    data : recovered , 
                    backgroundColor : "#a1ff0a" , 
                    minBarLength : 100 
                } , 
                {
                    label : "Active Caess" , 
                    data : active , 
                    backgroundColor: "#0096c7" , 
                    minBarLength : 100 
                }
            ]
        }
    })
    for(let i = 1 ; i < statewise.length ; i += 1){
        console.log("entered") ; 
        table.innerHTML += `
        <tr>
            <td>${statewise[i].state}</td>
            <td>${statewise[i].confirmed}</td>
            <td>${statewise[i].active}</td>
            <td>${statewise[i].recovered}</td>
            <td>${statewise[i].deaths}</td>
        </tr>
    ` 
    } 
}
document.getElementById("search-btn").addEventListener("click" , function(event){
    event.stopPropagation() ; 
    var flag = false ; 
    for(let i = 1 ; i < statewise.length ; i += 1){
        if(statewise[i].state == inputField.value){
            flag = true ; 
            table.innerHTML = `
            <tr>
                <th>State</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deceased</th>
            </tr>
            <tr>
                <td>${statewise[i].state}</td>
                <td>${statewise[i].confirmed}</td>
                <td>${statewise[i].active}</td>
                <td>${statewise[i].recovered}</td>
                <td>${statewise[i].deaths}</td>
            </tr>
            `
        }
    }
    if(!flag){
        table.innerHTML = `
            <tr>
                <th>State</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deceased</th>
            </tr>
            <tr>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
            </tr>
            `
    }
}) ; 

document.getElementById("cancel-btn").addEventListener("click" , function(event){
    event.stopPropagation() ; 
    table.innerHTML = `
            <tr>
                <th>State</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deceased</th>
            </tr>
            `
    for(let i = 1 ; i < statewise.length ; i += 1){
        console.log("entered") ; 
        table.innerHTML += `
            <tr>
                <td>${statewise[i].state}</td>
                <td>${statewise[i].confirmed}</td>
                <td>${statewise[i].active}</td>
                <td>${statewise[i].recovered}</td>
                <td>${statewise[i].deaths}</td>
            </tr>` 
    } 
})