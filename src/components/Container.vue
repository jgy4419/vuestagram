<template>
  <div>
    <div v-if="step == 0">
      <Post  v-for="a, i in instaData.length" :key="i" :instaData="instaData[i]"/>
    </div>
    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div :class="`${clickedFilter} upload-image`"
      :style="`background-image: url(${image})`"></div>
      <div class="filters">
        <FilterBox :filter = "filter" :image = "image"
        v-for="filter in filters" :key="filter"></FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div :class="`${clickedFilter} upload-image`" :style="`background-image: url(${image})`"></div>
      <div class="write">
        <textarea class="write-box" @input="$emit('write', $event.target.value)">write!</textarea>
      </div>
    </div>
    <!-- 팔로워 페이지 -->
    <div v-if="step == 3">
      <MyPage/>
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
import MyPage from './MyPage.vue'
export default {
    name: "Container",
    data(){
      return{
        filters: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        clickedFilter: '',
      }
    },
    components: {
        Post,
        FilterBox,
        MyPage,
    },
    methods: {
      
    },
    mounted(){
      this.emitter.on('boxClick', (a)=>{
        this.clickedFilter = a
      })
    },
    props: {
        instaData: Array,
        step: Number,
        image: String,
    },
}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}

</style>