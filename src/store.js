import axios from 'axios';
import { createStore }  from 'vuex'

const store = createStore({
    state () {
        return{
            // 여기에 데이터 저장
            name: 'kim',
            age: 20,
            like: 0,
            종아요눌렀니: false,
            more: {},
        }
    },
    mutations: {
        setMore(state, data){
            state.more = data
        },
        // 함수의 파라미터는 state내의 오브젝트를 의미한다.
        nameChange(state){
            state.name = 'park'
        },
        addAge(state){
            state.age++;
        },
        like(state){
            if(state.좋아요눌렀니 == false){
                state.like--;
                state.좋아요눌렀니 = true;
            }else{
                state.like++;
                state.좋아요눌렀니 = false;
            }
        },
    },
    actions: {
        getData(context){
            axios.get('https://codingapple1.github.io/vue/more0.json')
            .then((a) => {
                console.log(a.data);
                context.commit('setMore', a.data);
            })
        }
    },
})

export default store;