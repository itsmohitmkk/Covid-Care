// to make sure that only one of the checkbox/radio is selected:
var q = ["age", "gender", "c-sympt", "m-sympt", "s-sympt", "other-prob"]
function checkedchkr(name, obj) {
    console.log(name, $(obj).attr('type'))
    if ($(obj).attr('type') == 'radio') {
        if ($("input[name=" + name + "]").filter(function () { return this.prop == 'checked'; })) {
            $("input[name=" + name + "][type='checkbox']").prop('checked', false);
        }
    } else {
        if ($("input[name=" + name + "]").filter(function () { return this.prop == 'checked'; })) {
            $("input[name=" + name + "][type='radio']").prop('checked', false);
        }
    }
}
$("input[name=" + q[0] + "]").on('change', function () { checkedchkr(q[0], $(this)); });
$("input[name=" + q[1] + "]").on('change', function () { checkedchkr(q[1], $(this)); });
$("input[name=" + q[2] + "]").on('change', function () { checkedchkr(q[2], $(this)); });
$("input[name=" + q[3] + "]").on('change', function () { checkedchkr(q[3], $(this)); });
$("input[name=" + q[4] + "]").on('change', function () { checkedchkr(q[4], $(this)); });


// symptoms for Covid-19:
var csympt = ["Fever", "Dry Cough", "Fatigue"];
var msympt = ["Loss of taste or smell", "Nasal Congestion", "Conjunctivitis", "Sore Throat", "Headache", "Muscle or joint pain", "Nausea/Vomiting", "Diarrhea", "Dizziness"];
var ssympt = ["Shortness of breath", "Loss of appetite", "Persistent pain in the chest", "High body temperature", "Strokes", "Nerve Damage"];
var otherprob = ["Asthama", "Diabeties", "Blood Pressure", "Heart Disease", "Kidney Disorder", "Lung Disease", "Hypertension"];

// symptoms for other common illnesses:
var commoncold = ["Dry Cough", "Sore Throat", "Nasal Congestion", "Loss of taste or smell", "Headache", "Conjunctivitis"]
var diarrhea = ["Diarrhea", "Nausea/Vomiting"]
var typhoid = ["Nausea/Vomiting", "Fever"]


var array = [];
var c19score = 0;
var commoncoldscore = 0;
var diarrheascore = 0;
var typhoidscore = 0;

// function to append array with the returned 'checked' values
// $('.next').on('click', 
function appndarr() {
    // var array = [];
    // console.log("yaha pahucha h")
    var bef = array.length
    $("input:checked").each(function () {
        if ($(this).val() != "") {
            array.push($(this).val());
        }
    });
    // $('p').text(array);
    // console.log(array)
    // array.forEach(element => {
    //     console.log(element)
    // });

    if (bef < array.length) {
        return true;
    } else {
        return false;
    }

};

// to make prediction, once all the fields are filled
function getprediction() {
    getStateStats();
    statsArray = returner();
setTimeout(function(){
    // console.log("script wala me: ", statsArray);
    // console.log("random check: "+ [1, 2, 3]);

    var appended = appndarr();
    if (!appended) {
        alert("The field cannot be left empty!");
        return;
    }


    array.forEach(function (elem) {
        if (csympt.includes(elem)) {
            c19score += 20;
        } else if (msympt.includes(elem)) {
            c19score += 10;
        } else if (ssympt.includes(elem)) {
            c19score += 35;
        } else if (otherprob.includes(elem)) {
            c19score += 10;
        } else if (elem == "less10" || elem == "above60") {
            c19score += 20;
        }
    })
    if (c19score >= 100) {
        c19score = 100;
    }

    array.forEach(function (elem) {
        if (commoncold.includes(elem)) {
            commoncoldscore += 25;
        }
    })
    array.forEach(function (elem) {
        if (diarrhea.includes(elem)) {
            diarrheascore += 25;
        }
    })
    array.forEach(function (elem) {
        if (typhoid.includes(elem)) {
            typhoidscore += 25;
        }
    })

    // console.log("c19score: " + c19score)
    // console.log("commoncold: " + commoncoldscore)
    // console.log("diarrhea: " + diarrheascore)
    var message = "";
    var otherillness = [];
    // for covid-19:
    if (c19score < 35) {
        message = "It is unlikely that you have Covid-19 virus!!!Stay Safe";
    } else if (c19score < 60) {
        message = "  You have low risk. Maintain social distancing,use sanitizerand drink luke warm water";
    } else if (c19score < 80) {
        message = "It is likely that you have Covid-19 virus! medium risk. You are recommended to be in self isolation";
    } else if (c19score <= 100) {
        message = "It is very likely that you have Covid-19 virus (high risk) or some serious health condition. Immediately get consultation from a physician."
    }
    if (array.includes("met-corona")) {
        message += "<br>Since you had come in contact of a Covid-19 positive person, it is recommended that you get a test.<br>"
    }

    if (commoncoldscore >= 50) {
        otherillness.push('Common Cold');
    }
    if (diarrheascore >= 50) {
        otherillness.push('Diarrhea');
    }
    if (typhoidscore >= 50) {
        otherillness.push('Typhoid');
    }
    var othill = "";
    if (otherillness.length != 0) {
        othill += "Other than that, you might have: <br>"
    }
    otherillness.forEach(function (elem) { othill += elem + '<br>'; });
    // alert(message);
    var messge = '<p class=message>' + message + '<br>' + othill + '</p>';
    document.querySelector('#q-body').innerHTML = '<div style="font-size: 0.70em; font-weight: normal;">' + messge + "<br>Statistics of the Covid-19 cases in your state:<br>Total Confirmed: " + statsArray[0] + "Active Cases: " + statsArray[1] + "Recoveries: " + statsArray[2] + "Deaths: " + statsArray[3] + "</div>";

    array.push(messge);
    localStorage.setItem("prevarray", JSON.stringify(array));
}, 1500);
}


var prevarray = JSON.parse(localStorage.getItem("prevarray"));
function prevsession(prevarray) {
    if(prevarray) {
        document.querySelector("#prevresultbutton").addEventListener("click", function () {
            document.querySelector("#prevresultbutton").style.display = "none";
        })
        console.log(prevarray)
        var prevage = "";
        var prevgender = prevarray[1];
        var prevsympt = "";
        var prevmetcorona = prevarray[prevarray.length-2]
        var prevmessage = prevarray[prevarray.length-1];

        if(prevarray[0] == "less10") {
            prevage = "less than 18";
        } else if(prevarray[0] == "18-35") {
            prevage = "between 18 and 35";
        } else if(prevarray[0] == "35-60") {
            prevage = "between 35 and 60";
        } else {
            prevage = "above 60";
        }
        for(var i=2; i<prevarray.length-2; i++) {
            prevsympt += prevarray[i]+"<br>";
        }

        // document.querySelector("#q-body").innerHTML = prevage;
        // document.querySelector("#q-body").innerHTML = prevgender;
        // document.querySelector("#q-body").innerHTML = prevsympt;
        // document.querySelector("#q-body").innerHTML = prevmessage;
        
        document.querySelector("#q-body").innerHTML = '<div style="font-size: 0.70em; font-weight: normal;">Age Group: ' + prevage + '<br>' + "Gender: " + prevgender + '<br><br>' + "Symptoms you selected: " + prevsympt + '<br>' + "Suggestion based on previous symptoms:<br>" + prevmessage + '<a href="#" class="button" onclick="window.location.reload()">Recalculate</a></div>';

        // console.log("prevarray function")
    } else if(!prevarray) {
        alert("No previous sessions found!")
    }
}
prevsession(prevarray);


// to load previous session results
// function loadprevreshtml (event) {
//     if(prevarray) {
//         $ajaxUtils.sendGetRequest(
//             "../snips/prevresults.html",
//             function (responseText) {
//                 document.querySelector("#q-body").innerHTML = responseText;
//             },
//             false);
//     } else {
//         alert("No previous sessions found!");
//         return;
//     }
//     // prevsession(prevarray);
// }


// to load different queries(snips) using AJAX
document.addEventListener("DOMContentLoaded", function (event) {
    $ajaxUtils.sendGetRequest(
        "../snips/0age.html",
        function (responseText) {
            document.querySelector("#q-body")
                .innerHTML = responseText;
        },
        false);
});

function one(event) {
    var appended = appndarr();
    if (appended) {
        $ajaxUtils.sendGetRequest(
            "../snips/1gender.html",
            function (responseText) {
                document.querySelector("#q-body")
                    .innerHTML = responseText;
            },
            false);
    } else {
        alert("The field cannot be left empty!");
    }
}

function two(event) {
    var appended = appndarr();
    if (appended) {
        $ajaxUtils.sendGetRequest("../snips/2csympt.html", function (responseText) {
            document.querySelector("#q-body").innerHTML = responseText;
        }, false);
    } else {
        alert("The field cannot be left empty!");
    }
}
function three(event) {
    appndarr()
    $ajaxUtils.sendGetRequest("../snips/3msympt.html", function (responseText) {
        document.querySelector("#q-body").innerHTML = responseText;
    }, false);
}
function four(event) {
    appndarr()
    $ajaxUtils.sendGetRequest("../snips/4ssympt.html", function (responseText) {
        document.querySelector("#q-body").innerHTML = responseText;
    }, false);
}
function five(event) {
    appndarr()
    $ajaxUtils.sendGetRequest("../snips/5otherprob.html", function (responseText) {
        document.querySelector("#q-body").innerHTML = responseText;
    }, false);
}
function six(event) {
    appndarr()
    $ajaxUtils.sendGetRequest("../snips/6metcorona.html", function (responseText) {
        document.querySelector("#q-body").innerHTML = responseText;
    }, false);
}