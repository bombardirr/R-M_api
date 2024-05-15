interface OriginLocation {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: OriginLocation;
    location: OriginLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

interface ApiResponse {
    info: Info;
    results: Character[];
}

interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

interface EpisodeResponse {
    results: Episode[];
}

export const useRM = () => {
    const chars = ref<ApiResponse | null>(null)
    const eps = ref<EpisodeResponse | null>(null)
    const page = ref('1')
    const name = ref('')
    const status = ref('')


    const fetchChars = async () => {
        const queryParams = new URLSearchParams({
            page: page.value.toString(),
            name: name.value,
            status: status.value
        })
        chars.value = await $fetch<ApiResponse>(`https://rickandmortyapi.com/api/character?${queryParams}`)
    }

    const fetchEpisodes = async () => {
        eps.value = await $fetch<EpisodeResponse>('https://rickandmortyapi.com/api/episode')
    }

    const getEpisodeByIdLocal = (id: number): Episode | undefined => {
        return eps.value?.results.find(episode => episode.id === id)
    }

    onMounted(async () => {
        await fetchChars()
        await fetchEpisodes()
    })
    return {
        chars,
        page,
        name,
        status,

        fetchChars,
        getEpisodeByIdLocal
    }
}