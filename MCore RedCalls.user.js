// ==UserScript==
// @name         MCore RedCalls
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  ...
// @author       LooneyZ
// @match        http://digital-capital.mcore.solutions/main*
// @updateURL    https://raw.githubusercontent.com/LooneyZ/MCore-RedCalls/master/MCore%20RedCalls.user.js
// @downloadURL  https://raw.githubusercontent.com/LooneyZ/MCore-RedCalls/master/MCore%20RedCalls.user.js
// @grant        none
// ==/UserScript==

(function() {
    //'use strict';

    // Your code here...

    function moveRec(e){
        if (e.keyCode===81) {
            var titleli = document.getElementsByClassName('ui-tabs-selected')[0].getElementsByTagName('a')[0].title;
            if(titleli !== "Активные звонки" && titleli !== "Active Calls" && titleli !== "Llamadas activas") return;

            var a = document.getElementsByClassName("activeCall-deltaPrice-not-valid");

            if(!document.getElementById('loo_minus_calls')){
                var d = document.createElement('a');
                d.id = "loo_minus_calls";
                d.innerHTML = 'Минусовых звонков: ' + a.length;
                document.getElementsByClassName('dataExporter')[0].appendChild(d);
                d = document.createElement('br');
                document.getElementsByClassName('dataExporter')[0].appendChild(d);
                d = document.createElement('div');
                d.id = 'loo_div_buts';
                d.style.top = "135px";
                d.style.position = "-webkit-sticky";
                d.style.position = "sticky";
                d.style.zIndex = "1";
				d.style.color = 'red';
                document.getElementsByClassName('dataExporter')[0].appendChild(d);
            }
            else {
                document.getElementById('loo_minus_calls').innerHTML = 'Минусовых звонков: ' + a.length;
                document.getElementById('loo_div_buts').innerHTML = '';
            }

            if(a.length != 0){
                var durability = 8;
                var tharray = document.getElementById('contentForm:activeCalls_head').getElementsByTagName('th');
                for(var w = 0; w < tharray.length; ++w){
                    if(tharray[w].textContent === "Длительность" || tharray[w].textContent === "Dur." || tharray[w].textContent === "Duración"){
                        durability = w;
                        break;
                    }
                }

                for(var i = 0; i < a.length;++i){
                    var rnum = a[i].getElementsByTagName('td')[0].textContent;
                    var dur = a[i].getElementsByTagName('td')[durability].textContent;
                    console.log("Row Number:\t", rnum);
                    console.log("Duration:\t", dur);

                    var callBtn = document.createElement('a');
                    callBtn.id = "loo_call_but_" + i;

                    callBtn.innerHTML = 'Row: ' + rnum +'  Dur: ' + dur;
                    callBtn.onclick = function() {
                        var rownumber = parseInt((this.id).replace(/\D+/g,""));
                        document.getElementsByClassName('activeCall-deltaPrice-not-valid')[rownumber].scrollIntoView(false);
                    };
                    document.getElementById('loo_div_buts').appendChild(callBtn);
                }
            }
            else console.log("No red rows");
            console.log("----------------------------");
        }
    }
    addEventListener("keydown", moveRec);
})();