const button = document.querySelector('button');
const container = document.querySelector('.container');

const addNote = (text = '') => {
    const main = document.createElement('div');
    main.classList.add('main');
    main.innerHTML = `<div class="tool">
        <i class="save fa-sharp fa-solid fa-floppy-disk"></i>
        <i class="remove fa-sharp fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`;
    container.appendChild(main);

    main.querySelector('.remove').addEventListener('click', () => {
        main.remove();
        saveNote();
    });

    main.querySelector('.save').addEventListener('click', () => {
        saveNote()
    });

    main.querySelector('textarea').addEventListener('focusout',()=>{
        saveNote();
    });

}

const saveNote = () => {
    const notes = document.querySelectorAll('.main textarea');
    let data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if(notes.length ==  0){
        localStorage.removeItem('notes');
        location.replace('index.html');
    }
    else{
        localStorage.setItem('notes', JSON.stringify(data));
    }
}

(
    function () {
        let lsnotes = JSON.parse(localStorage.getItem('notes'));
        if (lsnotes == null) {
            addNote();
        }
        else {
            lsnotes.forEach((lnote) => {
                addNote(lnote);
            });
        }
    }
)()

button.addEventListener('click', () => {
    addNote();
});