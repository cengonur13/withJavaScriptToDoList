// Local Storage'dan verileri al
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Görev listesini güncelleme fonksiyonu
function updateTaskList() {
    const taskList = document.getElementById('list');
    taskList.classList = "list-group";
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        listItem.classList = "list-group-item";
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });
        let counter = 0;
        listItem.addEventListener('click', () => {
            counter++;
            if( (counter % 2) === 1 ){
                listItem.style.textDecoration = 'underline'; // Metni altı çizili yap
                listItem.style.fontSize = '1.3em'; // Metni büyüt
                
            }
            else{
                listItem.style.textDecoration = 'none'; // Metni altı çizgisiz yap
                listItem.style.fontSize = '1.0em'; // Metni normal boyuta getir
                
            }
        });

        const deleteButton = document.createElement('button');
        /*
        deleteButton.classList = "btn-close";
        deleteButton.style = "aria-label: Close";
        deleteButton.setAttribute("style", "color: rgb(10, 164, 40); position: absolute; top: 50%; right: 30px; transform: translateY(-50%);");
        deleteButton.setAttribute("class", "check");
        deleteButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        deleteButton.setAttribute("width", "25");
        deleteButton.setAttribute("height", "30");
        deleteButton.setAttribute("viewBox", "0 0 30 30.000001");
        */
        deleteButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        deleteButton.setAttribute("class", "delete");
        deleteButton.setAttribute("width", "16");
        deleteButton.setAttribute("height", "16");
        deleteButton.setAttribute("fill", "currentColor");
        deleteButton.setAttribute("viewBox", "0 0 16 16");
        deleteButton.setAttribute("color", "black");
        deleteButton.setAttribute("style", "position: absolute; top: 50%; right: 5px; transform: translateY(-50%);");
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            updateTaskList();
            saveToLocalStorage();
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

// Ekle butonu işlevi
function ekleFunc() {
    const taskInput = document.getElementById('task');
    const newTask = taskInput.value.trim();

    if (newTask !== '' && !tasks.includes(newTask)) {
        tasks.push(newTask);
        updateTaskList();
        saveToLocalStorage();
        taskInput.value = '';
    } else if (tasks.includes(newTask)) {
        alert('Bu madde zaten listenin içinde var!');
    } else {
        alert('Boş madde ekleyemezsiniz!');
    }
}

function goreveTikla(){
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        listItem.className = 'list-group-item';
        

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.className = 'btn btn-danger btn-sm ml-2';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            updateTaskList();
            saveToLocalStorage();
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}


// Local Storage'a verileri kaydetme işlevi
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sayfa yüklendiğinde verileri yükle
window.onload = function () {
    updateTaskList();
};

document.getElementById('liveToastBtn').addEventListener('click', ekleFunc);
