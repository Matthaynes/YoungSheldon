
app.component('product-details', {
    props: {
      details: {
        type: Array,
        required: false
      }
    },
    template:
    /*html*/
    `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
        
  })