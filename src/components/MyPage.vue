<template>
    <div style="padding: 10px">
        <div style="padding : 10px">
            <h4>팔로워</h4>
            <input @input="findId($event.target.value)" placeholder="search follower" />
            <div v-for="follower in follower" :key="follower" class="post-header">
                <div class="profile" :style="{backgroundImage: `url(${follower.image})`}"></div>
                <span class="profile-name">{{follower.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, reactive, ref} from 'vue'
import axios from 'axios';
export default {
    name: 'mypage',
    // Composition API를 사용해서 개발하려면 setup() 안에다 코드짜기 (시작점.)
    // create라는 라이프사이클 훅과 매우 비슷 컴포넌트를 만들기 전에 이거부터 실행해주세요 러는 뜻.
    setup(props){
        // 여기에 methods, computed, watch, data조작, hook걸기 등 거의 모든 개발을 여기서 가능.
        // 1. 데이터를 생성하는 방법.
        // 1-1 아래와 같이 변수 생성.
        let follower = ref([]); // ref를 사용하는 이유는 ref로 감싸줘야 실시간으로 데이터가 변경하는 것을 반영이 가능하다.

        let test = reactive({name: 'kim'})

        let changeText = ref(''); // 검색창에 text누르면 값 저장됨.
        let searchResulte = ref([]);
        let followerOriginal = ref([]);
        test;
        ref(props)
        // setUp에서 mounted 사용하려면 onMounted로 해야됨.
        onMounted(() => {
            axios.get('./follower.json').then((a) => {
                // 데이터를 조작하고 싶으면 .value를 넣어줘야 된다.
                follower.value = a.data
                followerOriginal.value = [...a.data]
            })
        })
        function findId(text){
            let newFollower = followerOriginal.value.filter((a)=>{
                return a.name.indexOf(text) != -1;
            });
            follower.value = [...newFollower];
        }
        // 1-2 return으로 변수 넣고,  1-3 필요한 부분에 {{follower}} 만들기.
        return {follower, findId, changeText, searchResulte}
    },
    data(){
        return{

        }
    },
}
</script>

<style>

</style>