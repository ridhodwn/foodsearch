<script>
export default {
  props: {
    food: Object
  },
  methods: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }
  }
}
</script>

<template>
  <!-- Food Card -->
  <div class="col p-2">
    <div class="card h-100 col-12">
      <img :src="food.recipe.image" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title mb-2">{{ (food.recipe.label = toTitleCase(food.recipe.label)) }}</h5>
        <hr />
        <div>
          <h5 class="badge text-bg-warning">
            <b>{{ food.recipe.cuisineType[0].toUpperCase() }}</b>
          </h5>
        </div>
        <div>
          <h5 class="badge text-bg-info">
            <b>{{ food.recipe.mealType[0].toUpperCase() }}</b>
          </h5>
        </div>
        <div>
          <h5 class="badge text-bg-light">
            <b>{{ food.recipe.dishType[0].toUpperCase() }}</b>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
