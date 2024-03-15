app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: 
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
  
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
  <p>Price: {{ price }}</p>
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
  
          <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          </div>
          
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
          
          <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          @click="removeFromCart">
          Remove Item
        </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
      return {
          product: 'Shirts',
          brand: 'Walmart',
          selectedVariant: 0,
          details: ['20% cotton', '30% wool', '50% polyester'],
          variants: [
            { id: 2234, color: 'red', image: './assets/images/red_shirt.png', quantity: 50, price: 29.95, shipping: '$' + 3},
            { id: 2235, color: 'blue', image: './assets/images/blue_shirt.png', quantity: 20 , price: 17.95, shipping: 'Free'},
            { id: 2236, color: 'gold', image: './assets/images/gold_shirt.png', quantity: 10, price: 18.99, shipping: '$' + 5},
            { id: 2237, color: 'white', image: './assets/images/white_shirt.png', quantity: 0, price: 49.98, shipping: '$' + 10}
          ],
          reviews: []
      }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
          this.reviews.push(review)
        },
        removeFromCart() {
          this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        price(){
          return '$' + this.variants[this.selectedVariant].price
        },
        shipping() {
          if (this.premium) {
            return 'Free'
          }
          return this.variants[this.selectedVariant].shipping
        }
    }
  })