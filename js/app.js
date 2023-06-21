const loadData = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url)
    const data = await response.json()
    displayData(data.data);
}

const displayData = (data) =>{
    if(data.length === 0){
        document.getElementById('noFound').classList.remove('d-none');
        document.getElementById('spinner').classList.add('d-none')
    }
    else{
        document.getElementById('noFound').classList.add('d-none');
    }
    
    // console.log(data);
    const phones = document.getElementById('phones');
    phones.innerText = '';
    data.forEach(element => {
        const phone = document.createElement('div')
        phone.classList.add('col','p-4', 'text-center')
        phone.innerHTML = `
        <div class="card-img-top">
            <img src="${element.image}" alt="image">
        </div>
        <div class="card-body">
          <h5 class="card-title py-4">${element.phone_name}</h5>
            <p class="card-text px-4">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${element.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-description">
            Details
          </button>
            </div>
        `
        /*
        <button onclick="loadPhoneDetails('${element.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-description">
            Details
          </button> */
        phones.appendChild(phone)
        // spinner
        document.getElementById('spinner').classList.add('d-none')
    })
}

document.getElementById('search-phone').addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        const searchText = document.getElementById('search-phone').value ;
        loadData(searchText);
        // spinner
        document.getElementById('spinner').classList.remove('d-none')
    }
})         


const loadPhoneDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const response = await fetch(url)
    const data = await response.json()
    displayPhoneDetails(data.data)
    // console.log(data);
}

const displayPhoneDetails = (data) =>{
    const modalTitle = document.getElementById('phone-descriptionLabel')
    modalTitle.innerText = data.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${data.image}" alt="">
    <h5>Main Features</h5>
    <p>Storage : <br> ${data.mainFeatures.storage}</p>
    <p>Display : <br>${data.mainFeatures.displaySize}</p>
    <p>Memory : <br> ${data.mainFeatures.memory}</p>
    <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
    `
}



loadData('apple')