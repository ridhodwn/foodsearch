<script>
import FoodCard from './components/FoodCard.vue'
export default {
  components: {
    FoodCard
  },
  data() {
    return {
      query: '',
      foodsObject: {}
    }
  },
  methods: {
    async fetchFoods() {
      try {
        this.foodsObject = {}
        const { data } = await axios({
          method: 'get',
          url: 'http://localhost:3000/search',
          params: {
            query: this.query
          }
        })
        this.foodsObject = data
      } catch (error) {
        console.log(error)
        swal({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error'
        })
      }
    },
    clearSearch() {
      ;(this.query = ''), (this.foodsObject = {})
    }
  }
}
</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="d-flex mt-4 mx-3 mb-3 justify-content-center">
        <!-- Search -->
        <div class="col-2 mx-4 pt-2">
          <form @submit.prevent="fetchFoods" class="border rounded-3 p-3">
            <div class="mb-2">
              <label for="name-search" class="mb-2"><b>SEARCH FOOD</b></label>
              <input
                v-model="query"
                class="form-control me-2"
                type="search"
                placeholder="eg. Chicken"
                id="name-search"
              />
            </div>
            <div class="mt-3">
              <button class="btn btn-dark w-100 mb-2" type="submit">Search</button>
              <button @click="clearSearch" class="btn btn-outline-dark w-100 mb-2" type="button">
                Clear Search
              </button>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <div id="edamam-badge" data-color="white" class="center"></div>
            </div>
          </form>
        </div>

        <!-- Foods Display -->
        <div v-if="foodsObject.count" class="row row-cols-1 row-cols-md-4 g-2 d-flex col-9">
          <FoodCard v-for="(food, i) in foodsObject.hits" :key="i" :food="food" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
