<template>
  <div @click="product_details(product)" class="col cursor-pointer bg-white box">
    <div class="atp-product-card">
      <div class="ribbon">
        <span :style="ribbon_color">{{ product.ribbon }}</span>
      </div>

      <q-item class="q-pa-none">
        <q-responsive :ratio="1" class="col">
          <canvas ref="canvas"></canvas>
        </q-responsive>
      </q-item>

      <q-list class="q-px-sm">
        <q-item class="q-px-none q-py-sm">
          <q-item-section class="self-start">
            <q-item-label class="text-body2" lines="2" style="height: 35px">
              {{ product.product_name }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-px-none text-cyan-7" style="height: 50px">
          <q-item-section v-if="product.price_type == 'RFQ'" class="text-h6 self-start">
            <span> RFQ </span>
          </q-item-section>

          <q-item-section v-else-if="product.price_type == 'Price with Original Price'" class="col self-center">
            <div class="col-auto text-h6 text-black">
              {{ `$${product.original_price}` }}
            </div>

            <div class="col-auto text-body1 text-grey" v-if="product.moq">
              {{ product.moq }} {{ product.moq_unit_type }}
              (MOQ)
            </div>
          </q-item-section>

          <q-item-section v-else-if="product.price_type == 'Price with Discount Price'" class="col self-center">
            <div class="col">
              <div class="row justify-between q-gutter-x-md">
                <div class="col-auto text-h6 text-black">
                  {{ `$${product.discounted_price}` }}
                </div>
                <div class="col-auto self-center">
                  <del class="text-h6 text-red">
                    {{ `$${product.original_price}` }}
                  </del>
                </div>
              </div>
            </div>

            <div class="col">
              <div v-if="product.moq" class="col-auto text-body1 text-grey">
                {{ product.moq }} {{ product.moq_unit_type }}
                (MOQ)
              </div>
            </div>
          </q-item-section>

          <q-item-section v-else-if="product.price_type == 'Price with Price Range'" class="col self-center">
            <div class="col-auto text-h6 text-black">
              {{ `$${product.minimum_price}` }} -
              {{ `$${product.maximum_price}` }}
            </div>

            <div v-if="product.moq" class="col-auto text-body1 text-grey">
              {{ product.moq }} {{ product.moq_unit_type }}
              (MOQ)
            </div>
          </q-item-section>
        </q-item>

        <q-item class="row justify-between q-px-none">
          <q-item-section class="col-auto" v-if="product.country_manufacturing">
            <div class="row">
              <div class="col-auto">
                <q-img width="34px" height="20px"
                  :src="`https://flagcdn.com/w80/${product.country_manufacturing.Code}.png`">
                </q-img>
              </div>

              <div class="col q-px-xs text-body1">
                {{ product.country_manufacturing.Code.toUpperCase() }}
              </div>
            </div>
          </q-item-section>

          <q-space />

          <q-item-section class="col-auto">
            <q-img style="width: 40px; height: 18px" src="icons/attoGeneral/FDA.png">
            </q-img>
          </q-item-section>

          <q-item-section class="col-auto">
            <q-img style="width: 25px; height: 18px" src="icons/attoGeneral/ce.png">
            </q-img>
          </q-item-section>

          <q-item-section class="col-auto">
            <q-icon name="task_alt" size="sm" color="green" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["product"],

  methods: {
    ...mapActions("products", ["getProduct", "clearProductDetails"]),

    product_details(product) {
      console.log("product", product);
      let data = {
        seller_id: product.seller_id,
        attopolis_id: product.attopolis_id,
        product_details: product,
      };
      this.getProduct(data).then(() => {
        this.$router
          .push(`/product/${product.attopolis_id}`)
          .catch((err) => { });
      });
    },

    image_url() {
      return Object.values(this.product.images).map((key) => {
        return key.image_url;
      })[0];
    },

    func() {
      var image = new Image();
      var canvas = this.$refs.canvas;
      var context = canvas.getContext("2d");
      var data = {};

      image.onload = function () {
        canvas.width = this.width;
        canvas.height = this.height;

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        cropImage()
      };

      image.src = 'https://miro.medium.com/max/1000/1*erF8xhU2U0CVWhijInvlUQ.jpeg'
      image.crossOrigin = "anonymous";

      // crop image whitespace:
      function cropImage() {
        data = context.getImageData(0, 0, image.width, image.height).data;

        var top = scanY(true);
        var bottom = scanY(false);
        var left = scanX(true);
        var right = scanX(false);

        var new_width = right - left;
        var new_height = bottom - top;

        canvas.width = new_width;
        canvas.height = new_height;

        context.drawImage(image, left, top, new_width, new_height, 0, 0, new_width, new_height);
      }

      // get pixel RGB data:
      function getRGB(x, y) {
        return {
          red: data[((image.width * y) + x) * 4],
          green: data[((image.width * y) + x) * 4 + 1],
          blue: data[((image.width * y) + x) * 4 + 2]
        };
      }

      // check if pixel is white:
      function isEmpty(rgb) {
        return rgb.red == 255 && rgb.green == 255 && rgb.blue == 255;
      }

      // scan top and bottom edges of image:
      function scanY(top) {
        var offset = (top) ? 1 : -1;

        for (var y = ((top) ? 0 : image.height - 1); ((top) ? (y < image.height) : (y > -1)); y += offset) {
          for (var x = 0; x < image.width; x++) {
            if (!isEmpty(getRGB(x, y))) {
              return y;
            }
          }
        }

        return null;
      }

      // scan left and right edges of image:
      function scanX(left) {
        var offset = (left) ? 1 : -1;

        for (var x = ((left) ? 0 : image.width - 1); ((left) ? (x < image.width) : (x > -1)); x += offset) {
          for (var y = 0; y < image.height; y++) {
            if (!isEmpty(getRGB(x, y))) {
              return x;
            }
          }
        }

        return null;
      }
    }
  },

  computed: {
    ...mapState("auth", ["userDetails"]),

    ribbon_color() {
      if (this.product.ribbon == "New") {
        return "background: linear-gradient(#2EABED 0%, #2588BD 100%)";
      } else if (this.product.ribbon == "Sale") {
        return "background: linear-gradient(#ef5350 0%, #d32f2f 100%)";
      } else if (this.product.ribbon == "Spotlight") {
        return "background: linear-gradient(#ab47bc 0%, #7b1fa2 100%)";
      } else if (this.product.ribbon == "Top Selling") {
        return "background: linear-gradient(#ffa726 0%, #f57c00 100%)";
      }
    },
  },
  mounted() {
    this.func();
  }
};
</script>

<style lang="sass" scoped>
.box
  position: relative
  min-width: 160px
  // width: 220px
  // max-width: 300px
  // height: 380px
  background: white
  border-radius: 15px

.atp-product-card
  min-width: 160px
  // width: 232px
  overflow: hidden
  overflow-x: hidden
  overflow-y: hidden
  background: white
  border-radius: 15px

// @media (max-width: 440px)
//   .box
//     max-width: 44vw
//     height: 100%

// @media (max-width: 440px)
//   .atp-product-card
//     max-width: 44vw
//     height: 100%

.atp-product-card:hover
  box-shadow: 1px 1px 15px -7px
  background: white

.ribbon
  position: absolute
  right: -5px
  top: -5px
  z-index: 1
  overflow: hidden
  width: 75px
  height: 75px
  text-align: right

.ribbon span
  font-size: 10px
  font-weight: bold
  color: #FFF
  text-transform: uppercase
  text-align: center
  line-height: 20px
  transform: rotate(45deg)
  -webkit-transform: rotate(45deg)
  width: 100px
  display: block
  // background: #2EABED
  background: linear-gradient(#2EABED 0%, #2588BD 100%)
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1)
  position: absolute
  top: 19px
  right: -21px

.ribbon span::before
  content: ""
  position: absolute
  left: 0px
  top: 100%
  z-index: -1
  border-left: 3px solid #2588BD
  border-right: 3px solid transparent
  border-bottom: 3px solid transparent
  border-top: 3px solid #2588BD

.ribbon span::after
  content: ""
  position: absolute
  right: 0px
  top: 100%
  z-index: -1
  border-left: 3px solid transparent
  border-right: 3px solid #2588BD
  border-bottom: 3px solid transparent
  border-top: 3px solid #2588BD
</style>
