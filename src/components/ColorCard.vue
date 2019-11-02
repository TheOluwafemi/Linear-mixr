<template>
  <div class="colorcard">
    <h1>{{ msg }}</h1>
    <p>
      Please fill in your colors to generate a gradient.<br>
    </p>    
  <div class="ui card">
    <div class="content">
      <form action="">
        <p class="direction-label" for="direction">Selection the gradient direction</p>
        <div>
          <ul>
            <li @click="bottomAngleSelected"><i class="arrow alternate circle down outline icon" v-bind:class="{ direction: bottomSelected}"></i></li>
            <li @click="bottomRightAngleSelected"><i class="arrow alternate circle left outline icon bottom-right padded" v-bind:class="{ direction: bottomRightSelected}"></i></li>
            <li @click="bottomLeftAngleSelected"><i class="arrow alternate circle left outline icon bottom-left" v-bind:class="{ direction: bottomLeftSelected}"></i></li>
            <li @click="topAngleSelected"><i class="arrow alternate circle up outline icon" v-bind:class="{ direction: topSelected}"></i></li>
            <li @click="topRightAngleSelected"><i class="arrow alternate circle left outline icon top-right padded" v-bind:class="{ direction: topRightSelected}"></i></li>
            <li @click="topLeftAngleSelected"><i class="arrow alternate circle left outline icon top-left" v-bind:class="{ direction: topLeftSelected}"></i></li>
            <li @click="rightAngleSelected"><i class="arrow alternate circle right outline icon" v-bind:class="{ direction: rightSelected}"></i></li>
            <li @click="leftAngleSelected"><i class="arrow alternate circle left outline icon" v-bind:class="{ direction: leftSelected}"></i></li>
          </ul>
        </div>

        <div class="ui centered grid color-input">
          <div class="ui form">
            <div class="fields" >
              <div class="four-wide field" v-for="color in colors" :key="color.id" >
                <input 
                  type="text" v-model="color.hex" maxlength="7"
                  autocomplete="off" autocorrect="off" autocapitalize="on" 
                  spellcheck="false"
                  :style="{background: color.hex, color: getInputTextColor}"
                >
              </div>            
            </div>

            <div class="big ui buttons btn-group">
              <button class="ui button" @click.prevent="addNewColor" v-if="colors.length <= 2"> + </button>
              <!-- <div class="or"></div> -->
              <button class="ui button" @click.prevent="removeLastColor" v-if="colors.length > 2">-</button>
            </div>
            <div class="big ui animated button" @click="generateRandomGradient" tabindex="0">
              <div class="visible content">Random</div>
              <div class="hidden content">
                <i class="paint brush icon"></i>
              </div>

            </div>  
            <hr>
            <div class="extra content">
              <p>CSS Style</p>              
              <div class="toast" style="display: none;">
                <p>Copied</p>
              </div>
              <!-- <p v-if="copySucceeded === false">Press CTRL+C to copy.</p> -->
              <code id="copyText">
                {{getCurrentMix}}
              </code> 
              <span class="copy">
                <i class="copy clipboard outline icon" data-clipboard-target="#copyText"></i>
              </span>
              
            </div>            
          </div>
        </div>
      </form>
    </div>

  </div>
  </div>
</template>

<script>
import { bus } from '../main';

export default {
  name: 'ColorCard',
  data: () => {
    return {
      colors: [
        { id: 0, hex: '#2b0a31' },
        { id: 1, hex: '#1c165c' }
      ],

      id: 2,
      copySucceeded: false,
      defaultDirection: 'bottom',

      angle: "45deg",
      topSelected: true,
      topRightSelected: false,
      topLeftSelected: false,

      bottomSelected: false,
      bottomRightSelected: false,
      bottomLeftSelected: false,

      rightSelected: false,
      leftSelected: false,

      currentMix: '',

      threeWayGradient: false,
    }
  },
  props: {
    msg: String
  },
  methods: {
    generateRandomGradient() {
      for (let i = 0; i < this.colors.length; i++) {
        this.colors[i].hex = this.randomColor();
        this.gradient;
      }
    },

    storeColors() {
      localStorage.setItem('color1', this.colors[0].hex);
      localStorage.setItem('color2', this.colors[1].hex);
    },

    randomColor() {
      return (
        '#' + 
        Math.random().toString(16).slice(2, 8)
      );
    },

    addNewColor() {
      if (this.colors.length <= 2) {
        let colorsLength = this.colors.length -1;
        this.colors.push({ id: colorsLength + 1, hex: this.randomColor()});
        this.gradient;
      }
    },

    removeLastColor() {
      if (this.colors.length > 2) {
        this.colors.pop();
        this.gradient;
      }
    },

    bottomAngleSelected() {
      this.topSelected = this.topRightSelected = this.topLeftSelected = this.bottomRightSelected = this.bottomLeftSelected = this.rightSelected = this.leftSelected = false;
  
      this.bottomSelected = true;
      this.angle = "to bottom";
      this.gradient;
    },

    bottomLeftAngleSelected() {
      this.topSelected = this.topRightSelected = this.topLeftSelected = this.bottomRightSelected = this.bottomSelected = this.rightSelected = this.leftSelected = false;
  
      this.bottomLeftSelected = true;
      this.angle = "to bottom left";
      this.gradient;
    },

    bottomRightAngleSelected() {
      this.topSelected = this.topRightSelected = this.topLeftSelected = this.bottomLeftSelected = this.bottomSelected = this.rightSelected = this.leftSelected = false;
  
      this.bottomRightSelected = true;
      this.angle = "to bottom right";
      this.gradient;
    },

    topAngleSelected() {
      this.topSelected = this.topRightSelected = this.topLeftSelected = this.bottomRightSelected = this.bottomLeftSelected = this.rightSelected = this.leftSelected = this.bottomSelected = false;
  
      this.topSelected = true;
      this.angle = "to top";
      this.gradient;
    },

    topRightAngleSelected() {
      this.topRightSelected = this.topSelected = this.topLeftSelected = this.bottomRightSelected = this.bottomLeftSelected = this.rightSelected = this.leftSelected = this.bottomSelected = false;
  
      this.topRightSelected = true;
      this.angle = "to top right";
      this.gradient;
    },

    topLeftAngleSelected() {
      this.topLeftSelected = this.topSelected = this.topRightSelected = this.bottomRightSelected = this.bottomLeftSelected = this.rightSelected = this.leftSelected = this.bottomSelected = false;
  
      this.topLeftSelected = true;
      this.angle = "to top left";
      this.gradient;
    },
    
    leftAngleSelected() {
      this.leftSelected = this.topSelected = this.topRightSelected = this.bottomRightSelected = this.bottomLeftSelected = this.rightSelected = this.topLeftSelected = this.bottomSelected = false;
  
      this.leftSelected = true;
      this.angle = "to left";
      this.gradient;
    },

    rightAngleSelected() {
      this.rightSelected = this.topSelected = this.topRightSelected = this.bottomRightSelected = this.bottomLeftSelected = this.leftSelected = this.topLeftSelected = this.bottomSelected = false;
  
      this.rightSelected = true;
      this.angle = "to right";
      this.gradient;
    },
  },
  mounted() {
    let storedColor1 = localStorage.getItem('color1');
    let storedColor2 = localStorage.getItem('color2');
    if (storedColor1 && storedColor2) {
      this.colors[0].hex = storedColor1;
      this.colors[1].hex = storedColor2;
    }
    this.gradient;
  },
  beforeDestroy() {
    this.storeColors();
  },
  computed: {
    getCurrentMix() {
      if (this.topSelected) {
        if(this.colors.length > 2 ) {
          return `background-image: linear-gradient(to top, ${this.colors[0].hex}, ${this.colors[1].hex}, ${this.colors[2].hex} )`;
        } else {
          return `background-image: linear-gradient(to top, ${this.colors[0].hex}, ${this.colors[1].hex})`;
        }
      } else if(this.bottomSelected) {
        if(this.colors.length > 2 ) {
          return `background-image: linear-gradient(to bottom, ${this.colors[0].hex}, ${this.colors[1].hex}, ${this.colors[2].hex} )`;
        } else {
          return `background-image: linear-gradient(to bottom, ${this.colors[0].hex}, ${this.colors[1].hex})`;
        }
      } else if(this.rightSelected) {
        if(this.colors.length > 2 ) {
          return `background-image: linear-gradient(to right, ${this.colors[0].hex}, ${this.colors[1].hex}, ${this.colors[2].hex} )`;
        } else {
          return `background-image: linear-gradient(to right, ${this.colors[0].hex}, ${this.colors[1].hex})`;
        }
      } else if(this.leftSelected) {
        if(this.colors.length > 2 ) {
          return `background-image: linear-gradient(to left, ${this.colors[0].hex}, ${this.colors[1].hex}, ${this.colors[2].hex} )`;
        } else {
          return `background-image: linear-gradient(to left, ${this.colors[0].hex}, ${this.colors[1].hex})`;
        }
      } else {
        return `background-image: linear-gradient(to top, ${this.colors[0].hex}, ${this.colors[1].hex})`;
      }
    },

    getInputTextColor() {
      let colorOne = this.colors[0].hex;
      let colorTwo = this.colors[1].hex
      if (colorOne.includes('f') || colorTwo.includes("f")) {
        return "#000"
      } else {
        return "#fff"
      }
    },

    gradient() {
      this.storeColors();
      let mixedColors = `linear-gradient(${this.angle}`;
      this.colors.forEach(e => {
        mixedColors += "," + e.hex;
      });
      mixedColors +=')';
      bus.$emit("gradientChanged", mixedColors);
      return mixedColors;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.directionSelected {
  color: #2C3E50;
}

h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 70%;
  margin-right: 15%;
  margin-left: 15%;
  color: whitesmoke;
  background: #f5f5f52e;

  form {
    ul {
      padding: 0px !important;

      li {
        list-style-type: none;
        display: inline-block;
        margin-right: 6px;
        margin-top: 8px;

        .arrow {
          font-size: 22pt;
        }

        .top-right {
          transform: rotate(135deg);
        }
        .top-left {
          transform: rotate(45deg);
        }
        .bottom-right {
          transform: rotate(225deg);
        }
        .bottom-left {
          transform: rotate(315deg);
        }

      }
    }

    .color-input {
      margin: 10px 10px;
      padding: 10px;

      hr {
        margin: 2em 0;
      }

      .btn-group {
        margin-right: 12px;
        margin-top: 12px;
        margin-bottom: 12px;
        font-size: 14pt;

        button {
          font-size: 13pt;
          font-weight: bold;
        }
      }

      .animated {
        // margin-top: 12px;
      }

      .fields {
      
        .field {
          margin-top: 15px;
          font-family: 'Poppins', sans-serif;
          font-size: 14pt;
          font-weight: bold;
        }

        .mix {
          padding: 0 !important;
          margin-left: 10px;
        }

        textarea {
          margin-top: 10px;
          -moz-border-bottom-colors: none;
          -moz-border-left-colors: none;
          -moz-border-right-colors: none;
          -moz-border-top-colors: none;
          background: none repeat scroll 0 0 #2c3e50;
          border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
          border-image: none;
          border-radius: 6px 6px 6px 6px;
          border-style: none solid solid none;
          border-width: medium 1px 1px medium;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 1em;
          line-height: 1.4em;
          padding: 5px 8px;
          transition: background-color 0.2s ease 0s;
        }

        code {
          font-family: Poppins;
          width: 100%;
          margin: 0 auto;
          display: block;
          line-height: 1.4;
          letter-spacing: 0.2px;
          border-left: 3px solid #42b983;
          background-color: rgba(189,189,189,0.1);
          padding: 15px 8px 15px 17px;
          border-radius: 5px;
        }

        .copy {
          font-size: 13pt;
        }
      }

    }
  }

  input[type="text"] {
    text-transform: uppercase;
  }

  .direction {
    color: green;
  }

  .padded {
    padding: 4px;
  }
}

</style>
