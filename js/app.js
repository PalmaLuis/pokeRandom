document.addEventListener('DOMContentLoaded',() =>{
    const random =  getRandomInt(1 , 887) 
    fetchData(random)
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async (id) =>{
    try{
        const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${id}` )
        const data= await res.json()
        const pokemon={
            img:data.sprites.other["official-artwork"].front_default,
            nombre:data.name,
            hp:data.stats[0].base_stat,
            exp: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[2].base_stat,
            defensa: data.stats[3].base_stat,
            esp_defensa: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
        }
        console.log(data)
        pintarCard(pokemon)

    }catch(error){
        console.log(error)
    }
}
const pintarCard = (pokemon) =>{
    console.log(pokemon)
    const flex= document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML =`${pokemon.nombre}<span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.exp+'Exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent =pokemon.ataque;
    clone.querySelectorAll('.card-footer-social h3')[1].textContent =pokemon.defensa;
    clone.querySelectorAll('.card-footer-social h3')[2].textContent =pokemon.especial;
    clone.querySelectorAll('.card-especials-social h3')[0].textContent =pokemon.esp_defensa;
    clone.querySelectorAll('.card-especials-social h3')[1].textContent =pokemon.speed;

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}