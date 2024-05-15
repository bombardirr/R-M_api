<template>
  <div class="wrapper">
    <div class="controls">
      <div class="filters">
        <input v-model="name" type="text" placeholder="Name...">
        <select v-model="status">
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">unknown</option>
        </select>
        <button @click="applyFilters">Apply</button>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page <= 1">Previous</button>
        <button @click="nextPage" :disabled="hasNextPage">Next</button>
      </div>
    </div>
    <div class="cards">
      <div class="cards--item" v-for="i in characters" :key="i.id">
        <div class="image">
          <img :src=i.image :alt=i.name>
        </div>
        <div class="details">
          <div class="details--title">{{ i.name }}</div>
          <div class="details--status">
            <i v-if="i.status === 'Alive'" class="pi pi-circle-fill icon text-[#76C958]"/>
            <i v-if="i.status === 'Dead'" class="pi pi-circle-fill icon text-[#C54938]"/>
            <i v-if="i.status === 'unknown'" class="pi pi-circle-fill icon text-[#9E9E9E]"/>
            <div>{{ i.status }}</div>
            <div>-</div>
            <div>{{ i.species }}</div>
          </div>
          <div class="details--location">
            <div class="location-title">Last known location:</div>
            <div>{{ i.location.name }}</div>
          </div>
          <div class="details--init">
            <div class="init-title">First seen in:</div>
            <div> {{
                getEpisodeByIdLocal(+i.episode[0].split("/").pop())?.name ? getEpisodeByIdLocal(+i.episode[0].split("/").pop())?.name : "Cool Adventure"
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRM} from "~/composables/useRM";
import type {Character} from '~/composables/useRM'

const {chars, page, name, status, fetchChars, getEpisodeByIdLocal} = useRM()

const characters = ref<Character[]>([])
const hasNextPage = computed(() => chars.value && chars.value.info.next === null);

watchEffect(() => {
  if (chars.value) {
    characters.value = chars.value.results
  }
})

const applyFilters = async () => {
  page.value = String(1)
  await fetchChars()
}

const prevPage = async () => {
  if (page.value > 1) {
    page.value--
    await fetchChars()
  }
}

const nextPage = async () => {
  page.value++
  await fetchChars()
}
</script>

<style lang="scss">
.wrapper {
  @apply container;
  @apply mx-auto;

  .controls {
    @apply flex justify-evenly items-center;
    @apply py-5;

    .filters {
      @apply flex justify-evenly items-center gap-2;
    }

    .pagination {
      @apply w-40;
      @apply flex justify-evenly items-center;
    }
  }

  .cards {
    @apply grid grid-cols-2 gap-2;

    &--item {
      @apply flex justify-start items-center gap-2;
      @apply bg-[#3C3E43];
      @apply text-white;
      @apply rounded-xl;

      .image {

        img {
          @apply rounded-tl-xl rounded-bl-xl;
        }
      }

      .details {
        @apply flex flex-col justify-evenly gap-2;
        @apply w-full;
        @apply text-lg;

        &--title {
          @apply text-3xl font-bold;
        }

        &--status {
          @apply flex justify-start items-center gap-2;
          @apply text-base;

          .icon {
            @apply text-[.6rem];
          }
        }

        &--location {

          .location-title {
            @apply text-gray-400 text-sm;
          }
        }

        &--init {

          .init-title {
            @apply text-gray-400 text-sm;

          }
        }
      }
    }
  }
}

</style>