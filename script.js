//select the dom element
var title=document.querySelector('#title');
var Author=document.querySelector('#author');
var Year=document.querySelector('#year');
var btn=document.querySelector("#addBook")
var tblBooklist=document.querySelector("#book-list")



//add event listener
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    var row=document.createElement('tr');
    row.innerHTML=`<td>${title.value}</td>
    <td>${Author.value}</td>
    <td>${Year.value}</td>
    <td><input type="submit" class="btn btn-danger delete"  value="x"></td>
    `;
    tblBooklist.appendChild(row);
    clearFields()

})

//delete event listener



//clear fields
function clearFields(){
    title.value="";
    Author.value="";
    Year.value="";
}


