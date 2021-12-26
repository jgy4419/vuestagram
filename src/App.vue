<template>
<div class="header">
    <ul class="header-button-left">
      <li @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="step = 3" v-if="step == 0">프로필</li>
      <li @click="step++" v-if=" step == 1">Next</li>
      <li @click="publish" v-if="step == 2">게시</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :instaData = "instaData" :step = "step" :image = "image" 
  @write = "content = $event"/>
  <button @click="more()">더보기</button>
  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
 </div>
</template>

<script>
import data from './assets/postdata'
import Container from './components/Container.vue'
import axios from 'axios'
// import Post from './components/Post.vue'
export default {
  name: 'App',
  components: {
    Container,
  },
  data(){
    return{
      instaData: data,
      count: 0,
      contentWatch: false,
      step: 0,
      image: '', // 게시할 이미지,
      content: '',  // 게시할 text
      clickedFilter: '',
    }
  },
  computed:{
    name(){
      return this.$store.state.name
    },
  },
  methods: {
    publish(){
      var myContent = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.image,
        likes: 0,
        date: "May 15",
        liked: false,
        content: this.content,
        filter: this.emitter.emit('boxClicked', (a) => {
          this.clickedFilter = a;
        })
      };
      this.instaData.unshift(myContent);
      this.step = 0;
    },
    more(){
      // https://codingapple1.github.io/vue/more1.json 두번째 게시물 서버.
      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`)
      .then((result)=>{
        this.count++;
        console.log(result.data)
        this.instaData.push(result.data)
      }) 
    },
    upload(e){
      let 파일 = e.target.files;
      console.log(파일);
      let url = URL.createObjectURL(파일[0]);
      console.log(url);
      this.step = 1;
      this.image = url;
    },
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}

</style>
