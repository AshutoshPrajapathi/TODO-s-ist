add = document.getElementById('add');
if((localStorage.getItem('itemsJson')  == "[]")){
    document.getElementById('itemData').style.display='none';
    document.getElementById('message').innerHTML = 'TODOs List is Empty.';
    //document.getElementById('message').style.display='block';
}

function getAndUpdate(){
    title = document.getElementById('title').value;
   // console.log(title)
    desc = document.getElementById('description').value;
    if(title == "") alert('Title is required');
    else if(desc == "") alert('Description is required'); 
    else{
        document.getElementById('message').style.display='none';
        document.getElementById('itemData').style.display='initial';
        //intialy itemsJson is null
        if(localStorage.getItem('itemsJson')  == null){
            //console.log('ifcase');
            items = [];
            items.push([title,desc]);
            localStorage.setItem('itemsJson',JSON.stringify(items));
        }else{//when itemsJson is not empty
            //console.log('else case')
            itemJsonArrayStr = localStorage.getItem('itemsJson') 
            items = JSON.parse(itemJsonArrayStr);
            items.push([title,desc]);
            localStorage.setItem('itemsJson',JSON.stringify(items));
        }
        update();
    }
}

function update(){
    if(localStorage.getItem('itemsJson')  == null){
        //console.log('ifcase');
        items = [];
        //items.push([title,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(items));
    }else{//when itemsJson is not empty
        //console.log('else case')
        itemJsonArrayStr = localStorage.getItem('itemsJson') 
        items = JSON.parse(itemJsonArrayStr);
    }
    //add th items into the table
    //addIntoTable = document.getElementById('addIntoTable');
    str = "";
    items.forEach((element,index) => {
        str += 
           ` <tr>
                <th scope="row">${index+1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary" onClick='deleted(${index})'>Delete</button></td>
            </tr>`
    });
    addIntoTable.innerHTML = str;
}
add.addEventListener('click',getAndUpdate);
update();

function deleted(itemIndex){
    itemJsonArrayStr = localStorage.getItem('itemsJson') 
    items = JSON.parse(itemJsonArrayStr);
    items.splice(itemIndex,1);//1 bcoz we want to delete only one element
    localStorage.setItem('itemsJson',JSON.stringify(items));
    if((localStorage.getItem('itemsJson')  == "[]")){
        document.getElementById('itemData').style.display='none';
        document.getElementById('message').innerHTML = 'Your TODOs List is Empty.';
        document.getElementById('message').style.display='block';
    }
    //update();
    
    update();
}
function clearList(){
    if(confirm('Are you sure ,This will delete all items in List')){
        localStorage.clear();
        if((localStorage.getItem('itemsJson')  == null)){
            document.getElementById('itemData').style.display='none';
            document.getElementById('message').innerHTML = 'TODOs List is Empty.';
            document.getElementById('message').style.display='block';
        }
        update();
    }
}


