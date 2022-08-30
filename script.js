   
class DomObj {
  constructor (jsonUrl, templateUrl) {
    this.products = [];
    this.jsonUrl = jsonUrl;
    this.productTemplateUrl = templateUrl;
    this.productTemplate = '';
  }

  getproducts() {
    $.getJSON(this.jsonUrl, (response) => {
      response.sales.forEach((sale, i) => {
        this.products.push( new ProductObj(sale, i) );
      })
    }).done(() => {
      $.get(this.productTemplateUrl, (template) => {
        this.productTemplate = template;
      }).done(() => {
        this.updateproducthtml();
        this.updatedom();
        this.removeProductListener();
      })
    })
  }
    
  updateproducthtml() {
    this.products.forEach((product) => {
      product.updatehtml(this.productTemplate);
    })
  }
  
  updatedom() {
    let thishtml='';
    this.products.forEach((product) => {
      thishtml += product.htmlview;
    })
    $("#content").html(thishtml);
  }
  
  removeProductListener() {
    $("#content").on("click", ".buttonx", (e) => {
      e.preventDefault();
      let $target = $(e.target);
      $target.closest('.product-container').hide(300);
    })
  }
}

class ProductObj {
  constructor (product, i) {
    this.photo        = product.photos.medium_half;
    this.title        = product.name;
    this.tagline      = product.tagline;
    this.url          = product.url;
    this.htmlview     = "";
    this.index        = i;
    this.description  = product.description;
    this.custom_class = "col"+ ((i % 3) +1);
  }

  updatehtml (template){
    this.htmlview = template.replace('{image}', this.photo).replace('{title}', this.title).replace('{tagline}', this.tagline).replace('{url}', this.url).replace('{custom_class}', this.custom_class).replace('{description}', this.description);
  }
}

let page = new DomObj('data.json', 'product-template3.html');
page.getproducts();

