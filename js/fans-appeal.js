document.getElementById("send-comment").addEventListener("click",addComment),window.addEventListener("online",(function(e){const a=readAppealsFromLocalStorage();sendAppealsToServer(a),showAllAppeals(a),localStorage.removeItem("appeals")}));const allAppeals=readAppealsFromLocalStorage();function addComment(){let e=document.getElementById("fan-appeal-input").value,a=currentAuthor();const l=new Date;if(""===document.getElementById("fan-appeal-input").value.replace(/ /g,""))return alert("This one is empty.."),clean(),!1;isOnline()?(showAppeal(a,l,e),alert("Successfully sent to server")):(allAppeals.push({name:a,time:l,text:e}),saveAppealsToLocalStorage(allAppeals),alert("Saved to local storage")),clean()}function showAppeal(e,a,l){let t=document.createElement("div");t.className="row",t.style.cssText="border: #8f8f8f solid 1px;";let n=document.createElement("div");n.className="fan-appeal fan-appeal-author card col-sm-4 col-md-4 col-lg-2 col-xl-2";let o=document.createElement("div");o.className="fan-appeal card col-sm-8 col-md-8 col-lg-10 col-xl-10",n.innerHTML="<p>"+e+"</p><p>"+a.getHours()+":"+(a.getMinutes()<10?"0":"")+a.getMinutes()+"</p><p>"+a.getDate()+"."+(a.getMonth()+1)+"."+a.getFullYear()+"</p>",o.innerHTML="<p>"+l+"</p>",t.appendChild(n),t.appendChild(o),document.getElementById("comments").appendChild(t)}function clean(){document.getElementById("fan-appeal-input").placeholder="Write an appeal c:",document.getElementById("fan-appeal-input").value=""}function currentAuthor(){let e=prompt("Please enter your name","Ari's fan");return""===e.replace(/ /g,"")?"No name":e}function showAllAppeals(e){e.forEach((function(e){showAppeal(e.name,new Date(e.time),e.text)}))}function sendAppealsToServer(e){e.length&&alert("Successfully sent to server!")}function saveAppealsToLocalStorage(e){localStorage.setItem("appeals",JSON.stringify(e))}function readAppealsFromLocalStorage(){return null!=JSON.parse(localStorage.getItem("appeals"))?JSON.parse(localStorage.getItem("appeals")):[]}function isOnline(){return window.navigator.onLine}isOnline()&&(sendAppealsToServer(allAppeals),showAllAppeals(allAppeals),localStorage.removeItem("appeals"));