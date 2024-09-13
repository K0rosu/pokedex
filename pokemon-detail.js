let currentPokemonId = null;

document.addEventListener("DOMContentLoaded", () => {
    const MAX_POKEMONS = 649;
    const pokemonID = new URLSearchParams(window.location.search).get("id");
    const id = parseInt(pokemonID, 10);

    if (id < 1 || id > MAX_POKEMONS) {
        return (window.location.href = "./index.html");
    }

    currentPokemonId = id;
    loadPokemon(id);
});

async function loadPokemon(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json())
        ]);

        const abilitiesWrapper= document.querySelector(".pokemon-detail-wrap .pokemon-detail.move");
        abilitiesWrapper.innerHTML = "";

        if (currentPokemonId === id) {
            displayPokemonDetails(pokemon);
            const flavorText = getEnglishFlavorText(pokemonSpecies);
            document.querySelector(".body3-fonts.pokemon-description").textContent = flavorText;

            const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) => 
                document.querySelector(sel)
            );
            
            // Remover listeners antigos
            leftArrow.removeEventListener("click", navigatePokemon);
            rightArrow.removeEventListener("click", navigatePokemon);

            // Adicionar debounce aos novos listeners
            const debouncedNavigatePokemon = debounce(navigatePokemon, 300); // 300 ms delay

            if (id > 1) {
                leftArrow.addEventListener("click", () => {
                    debouncedNavigatePokemon(id - 1);
                });
            }

            if (id < 649) {
                rightArrow.addEventListener("click", () => {
                    debouncedNavigatePokemon(id + 1);
                });
            }

            // Atualizar a URL sem recarregar a página
            window.history.pushState({}, "", `./detail.html?id=${id}`);
        }

        return true;
    } catch (error) {
        console.error("An error occurred while fetching Pokemon data:", error);
        return false;
    }
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}


async function navigatePokemon(id) {
    currentPokemonId = id;
    await loadPokemon(id);
}

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
};

function setTypeBackgroundColor(pokemon) {
    const types = pokemon.types;
    let color;

    // Verificar se o Pokémon tem dois tipos
    if (types.length === 2) {
        const color1 = typeColors[types[0].type.name];
        const color2 = typeColors[types[1].type.name];

        if (!color1 || !color2) {
            console.warn(`Colors not defined for types: ${types[0].type.name} and ${types[1].type.name}`);
            return;
        }

        // Criar gradiente com as duas cores
        color = `linear-gradient(45deg, ${color1}, ${color2})`;
    } else {
        // Se o Pokémon tiver apenas um tipo, use a cor correspondente
        color = typeColors[types[0].type.name];

        if (!color) {
            console.warn(`Color not defined for type: ${types[0].type.name}`);
            return;
        }
    }

    const detailMainElement = document.querySelector(".detail-main");
    setElementStyles([detailMainElement], "background", color);
    setElementStyles([detailMainElement], "borderColor", color);

    setElementStyles(
        document.querySelectorAll(".power-wrapper > p"),
        "background",
        color
    );

    

    setElementStyles(
        document.querySelectorAll(".stats-wrap .progress-bar"),
        "color",
        color
    );
}

function setElementStyles(elements, cssProperty, value){
    elements.forEach((element) => {
        element.style[cssProperty] = value;
    });
}

function rgbaFromHex(hexColor) {
    return [
        parseInt(hexColor.slice(1,3), 16),
        parseInt(hexColor.slice(3,5), 16),
        parseInt(hexColor.slice(5,7), 16),
    ].join(", ");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function createAndAppendElement(parent, tag, options = {}) {
    const element = document.createElement(tag);
    Object.keys(options).forEach((key) => {
        element[key] = options[key];
    });
    parent.appendChild(element);
    return element;
}

function displayPokemonDetails(pokemon) {
    const {name, id, types, weight, height, abilities, stats} = pokemon;
    const capitalizePokemonName = capitalizeFirstLetter(name);

    document.querySelector("title").textContent = capitalizePokemonName;

    const detailMainElement = document.querySelector(".detail-main");
    detailMainElement.classList.add(name.toLowerCase());

    document.querySelector(".name-wrap .name").textContent = capitalizePokemonName;

    document.querySelector(".pokemon-id-wrap .body2-fonts").textContent = `#${String(id).padStart(3, "0")}`;

    const imageElement = document.querySelector(".detail-img-wrapper img");
    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    imageElement.alt = name;

    const typeWrapper = document.querySelector(".power-wrapper");
    typeWrapper.innerHTML = "";
        types.forEach(({ type }) => {
            createAndAppendElement(typeWrapper, "p", {
                className: `body3-fonts type ${type.name}`,
                textContent: type.name,
            });
        });

        document.querySelector(".pokemon-detail-wrap .pokemon-detail p.body3-fonts.weight").textContent = `${weight / 10}kg`;
        document.querySelector(".pokemon-detail-wrap .pokemon-detail p.body3-fonts.height").textContent = `${height / 10}m`;

        const abilitiesWrapper = document.querySelector(".pokemon-detail-wrap .pokemon-detail.move");
        abilities.forEach(({ ability }) => {
            createAndAppendElement(abilitiesWrapper, "p", {
                className: "body3-fonts",
                textContent: ability.name,
            });
        });
        
    const statsWrapper = document.querySelector(".stats-wrapper");
    statsWrapper.innerHTML = "";

const statNameMapping = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
};

    stats.forEach(({stat, base_stat}) => {
        const statDiv = document.createElement("div");
        statDiv.className = "stats-wrap";
        statsWrapper.appendChild(statDiv);

        createAndAppendElement(statDiv, "p", {
            className: "body3-fonts stats",
            textContent: statNameMapping[stat.name],
        });

        createAndAppendElement(statDiv, "p", {
            className: "body3-fonts",
            textContent: String(base_stat).padStart(3, "0"),
        });

        createAndAppendElement(statDiv, "progress", {
            className: "progress-bar",
            value: base_stat,
            max: 255,
        });
    });

    setTypeBackgroundColor(pokemon);
}

function getEnglishFlavorText(pokemonSpecies) {
    for (let entry of pokemonSpecies.flavor_text_entries)
    {
        if (entry.language.name === "en") {
            let flavor = entry.flavor_text.replace(/\f/g, "");
            return flavor;
        }
    }
    return "";
}
