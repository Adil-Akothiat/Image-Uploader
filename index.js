const dropBox = document.querySelector('.drop_box');
const fileUpload = document.querySelector('input');
const imageView = document.querySelector('.file_view');
const upl = document.querySelector('.upl');
const uploadBox = document.querySelector('.upload_box');
const loader = document.querySelector('.loader');


dropBox.ondragover = function(e) {
    e.preventDefault();
}
dropBox.ondrop = function(e) {
    e.preventDefault();
    uploadImage(e.dataTransfer.files[0]);
}
fileUpload.oninput = function(e) {
    e.preventDefault();
    uploadImage(e.target.files[0]);
}



function intervallTimer(alert) {
    setInterval(()=> {
        alert.classList.add('hide');
    }, 1000)
}
function copyLink(url) {
    const linkDiv = document.createElement('div');
    const link = document.createElement('p');
    const copyLink = document.createElement('button');
    const alertCopy = document.createElement('p');
    alertCopy.className='alert';

    link.setAttribute('class', 'link');
    linkDiv.className='link_div';
    link.textContent = url;
    copyLink.textContent='copy';
    copyLink.className='copy';
    linkDiv.appendChild(link);
    linkDiv.appendChild(copyLink);

    imageView.appendChild(linkDiv);

    copyLink.onclick =async function() {
        linkDiv.appendChild(alertCopy);
        return await navigator.clipboard.writeText(url).then(()=> {
            alertCopy.textContent='url copied';
            alertCopy.classList.add('success');
            intervallTimer(alertCopy);
        }).catch(()=> {
            alertCopy.textContent='url fail to copy try again!';
            alertCopy.classList.add('fail');
            intervallTimer(alertCopy);
        });
    }
}
function uploadImage(input) {
    let url = URL.createObjectURL(input);
    let format = input.type.substr(input.type.indexOf('/')+1);
    const alert = document.createElement('h3');
    const image = document.createElement('img');
    const checkMark = document.createElement('img');
    checkMark.src='./images/success_mark.svg';
    checkMark.alt='check mark icon';

    if(format=='png' || format=='gif' || format=='jpg' || format=='jpeg') {
        uploadBox.classList.add('hide');
        loader.classList.add('show');
        upl.classList.add('hide');
        alert.textContent='upload successefully!';
        image.src=url;
        image.alt='img uploaded';
        imageView.appendChild(checkMark);
        imageView.appendChild(alert);
        imageView.appendChild(image);
        copyLink(url);
        setTimeout(()=> {
            uploadBox.classList.remove('hide');
            loader.classList.remove('show');
        },1000)
    }
}