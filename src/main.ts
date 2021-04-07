const searchInput: HTMLInputElement = <HTMLInputElement> document.getElementById("search");
const searchForm: HTMLFormElement = <HTMLFormElement> document.getElementById("form");
const cards: HTMLElement = <HTMLElement> document.getElementById("cards");
const spinner: HTMLElement = <HTMLElement> document.getElementById("spinner");


const getTitles = async (name: string) =>{
    if(name.length > 0){
        spinner.classList.remove('d-none');
        const data = await fetchApi({
            method: 'GET',
            uri: `auto-complete?q=${name}`
        });
        const result = data.map(movie => generateCard({
            img: movie['i']['imageUrl'],
            title: movie['l'],
            desc: `${movie['s']}}`,
            id: movie['id']
        })).join(" ");
        cards.innerHTML = result;
        spinner.classList.add('d-none');;
    }
};

const setModal = async (id: string) => {
    console.log(id)
    if(id != null){
        const data = await fetchApi({
            method: 'GET',
            uri: `title/get-details?tconst=${id}`
        });
        console.log(data);
    }
};

const fetchApi = async ({method, uri}) =>{
    const myHeaders = new Headers({
        'x-rapidapi-key': "ae43f5de74msh68e2c3a12f607ffp147000jsnbb00119a31e8",
        'x-rapidapi-host': "imdb8.p.rapidapi.com",
        'useQueryString': 'true'
    });
    const response = await fetch(`https://imdb8.p.rapidapi.com/${uri}`, {
        method: method,
        headers: myHeaders
    });
    const {d}: {d: Array<Object>} = await response.json()

    return d;
}

const generateCard = ({img, title, desc, id}) =>{
    return `
        <div class="col">
            <div class="card h-100">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${desc}</p>
            </div>
            </div>
        </div>`
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    getTitles(searchInput.value);
});