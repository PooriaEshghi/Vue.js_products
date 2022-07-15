Vue.component('product-details',{
  props: {
    details: {
      type: Array,
      required:true
    }
  },
  template:`
  <ul>
  <li v-for="detail in details">{{detail}}</li>
  </ul>
  `
})

Vue.component('product',{
  props:{
    premium:{
      type: Boolean,
      required: true
    }
  },

 template:
 
 `<div class="product">
 <div class="product-image">
   <img v-show="inStock" v-bind:src="image" alt="Socks" />
 </div>
 <div class="product-info">
   
   <div>

     <h1 v-show="inStock">{{title}}</h1>
     <p v-if="inventory>10">In stock</p>
     <p v-else-if="inventory <=10 && inventory > 0">almost sold out</p>
     <p v-else="inventory<10">Out of stock</p>
     <p>{{shiping}}</p>
     <product-details :details="details"></product-details>
     
     <p>{{sale}}</p>
   </div>

   
   <div v-for="(variant, index) in variants" 
   :key="variant.variantId" 
   class="color-box"
   :style="{backgroundColor:variant.variantColor}"
   @mouseover="updateProduct(index)">
   </div>
   
   <div v-for="size in sizes" :key="sizes.sizeId">
     <p>{{size.sizeSocks}}</p>
   </div>
   <button  @click="addToCart"
   :disabled="!inStock"
   :class="{disabledButton: !inStock}">Add To Cart</button>
   <button @click="removeFromCart"
   :disabled="!inStock"
   :class="{disabledButton: !inStock}">Remove Item</button>

   <div>
   <h2>Reviews</h2>
   <p v-if="!reviews.length">There are no reviews yet.</p>
   <ul>
     <li v-for="review in reviews">
     <p>{{ review.name }}</p>
     <p>Rating: {{ review.rating }}</p>
     <p>{{ review.review }}</p>
     </li>
   </ul>
  </div>

   
    <product-rewiew @review-submitted="addReview"></product-rewiew>
 </div>
</div>`,
data(){
  return   { 
    product:"Socks",
    brand: "Vue Masterful",
    selectedVariant:0,
    inventory:100,
    onSale:false,
    details:["80% cotton","20% polyester","Gender-neutral"],
    reviews:[],
 
  onSale: true,
  sizes:[
    {
      sizeId:2231,
      sizeSocks:"small"
    },
    {
      sizeId:2232,
      sizeSocks:"medium"
    },
    {
      sizeId:2233,
      sizeSocks:"large"
    }
  ],
  variants:[
  {
    variantId:2234,
    variantColor:"green",
    variantImage:"./image/vmSocks-green-onWhite.jpg",
    variantQuantity: 10
    
  },
  {
    variantId:2235,
    variantColor:"blue",
    variantImage:"./image/vmSocks-blue-onWhite.jpg",
    variantQuantity: 10
  }
  ],
 }
},
methods:{
  addToCart(){
    this.$emit("add-to-cart",this.variants[this.selectedVariant].variantId)
  },
  removeFromCart(){
    this.$emit("remove-from-cart",this.variants[this.selectedVariant].variantId)
  },
  updateProduct(index){
    this.selectedVariant = index;
    console.log(index);
  },
  addReview(productReview){
    this.reviews.push(productReview)
  }
  
},
computed:{
  
  title(){
    return this.brand + ' ' + this.product
  },
  image(){
    return this.variants[this.selectedVariant].variantImage
  },
  inStock(){
    return this.variants[this.selectedVariant].variantQuantity
  },
sale(){
  if(this.onSale){
    return this.brand + ' ' + this.product + 'are on sale!'
  }
    return this.brand + ' ' + this.product + ' are not on sale'
},
shiping(){
  if(this.premium){
    return 'shipin is free'
  }else{
    return 'shiping is 2.99'
    
  }
}

}

})
Vue.component('product-rewiew',{
  template:`
  
  <form  class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
  <ul>
  <li v-for="error in errors">{{error}}</li>
  
  </p>
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>`,

data(){
    return {
      name:null,
      review: null,
      rating: null,
      errors: []
    }
  },
  method: {
    onSubmit() {
      if(this.name && this.review && this.rating){

        let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      }
      else{
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errore.push("Review required.")
        if(!this.rating) this.errore.push("Rating required.")
      }
      }
  }
})

 var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart:[],
  },
  methods:{
    updateCart(id){
      this.cart.push(id)
    },
    removeCart(id){
     
      this.cart.splice(this.cart.length-1)
    },
  },
  
  
 })