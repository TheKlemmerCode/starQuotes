//main.js
const update = document.querySelector('#update-button');

update.addEventListener('click', _ => {
    // Send PUT Request Here
    fetch('/quotes', {
        method: 'put',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(response => {
        window.location.reload(true);
    })
});

const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vadar'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vadar Quote To Delete'
        } else {
            window.location.reload();
        }
    })
});

