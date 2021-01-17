function testinglab(){

    fetch('testingcenters.txt')
        .then(response => response.text())
        .then(data => {
            
            var xyz = document.getElementById("inputtext").value;
            xyz=xyz.toLowerCase();
            var cityname = xyz.charAt(0).toUpperCase();
            cityname += xyz.slice(1);
            
    
            var start = data.indexOf(cityname);
            if(start==-1)
            {
                alert("Try another city");
                return;
            }
            var end = data.lastIndexOf(cityname); 
            console.log(start);
            console.log(end);
            console.log(data[end]);
            var n = start;
            n--;
            var str = "";
            var hospi = "";
            while (data[n] != '|') {
                hospi = data[n] + hospi;
                n--;
            }
           // hospi+=cityname;
           // start += (cityname.length + 1);
    
            var count = 0;
            while (start != end && count < 7) {
                if (data[start] == '|') {
                    hospi = hospi +"||"+"\n";
                    count++;
                    var ind = data.indexOf(cityname, start);
                    if ((ind - start) > 70 || ind == -1) {
                        break;
                    }
    
                } else {
                    hospi = hospi + data[start];
                }
                start++;
            }
           hospi= hospi.replaceAll("||","<br>")
            hospi += '<a href="#" onclick="reload()" class="next button" id="butt2" >Go Back</a>';
                document.querySelector("#box1").innerHTML = hospi;
              
             
            console.log(hospi);
            
    
        });
        
       
    }
    
    //refreshing the page
    function reload(){
        window.location.reload();
    }