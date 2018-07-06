<style>
.home {
  height: 100%;
  position: relative;
}
.home .cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.home .cover button {
  width: 45%;
  height: 6vh;
}
.home .wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.home .wrap > div:first-child {
  margin-top: 10vh;
}
.home .wrap > div:nth-child(2) table {
  width: 100%;
  table-layout: fixed;
}
.home .wrap > div:nth-child(2) table tr {
  width: 100%;
}
.home .wrap > div:nth-child(2) td {
  width: calc(100% / 12);
  padding-bottom: calc(100% / 12);
  background: #d3905b;
  border: 1px solid black;
}
.home .wrap > div:nth-child(2) td.white {
  background: url(../resource/images/white.jpg) no-repeat center / 100% 100%;
}
.home .wrap > div:nth-child(2) td.black {
  background: url(../resource/images/black.jpg) no-repeat center / 100% 100%;
}
.home .wrap > div:nth-child(3) {
  margin-bottom: 10vh;
}
</style>
<template>
    <div class="home">
        <div class="wrap">
            <div>
                <span>{{opponentInfo.userName}}</span>
                <span>金豆：{{opponentInfo.user_integral}}</span>
                <span>局时：{{opponentInfo.gameLeftTime}}</span>
                <span>步时{{opponentInfo.stepLeftTime}}</span>
                <span>{{opponentInfo.type == 'white'?'白棋':'黑棋'}}</span>

            </div>
            <div>
                <table>
                    <tr  v-for="j in 12" :key="j">
                        <td  @click.once="tdClick((j-1)*12+i-1,$event)" :data-id="(j-1)*12+i-1" v-for="i in 12" :key="i" v-update="layout[(j-1)*12+i-1]">
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <span>{{userInfo.userName}}</span>
                <span>金豆：{{userInfo.user_integral}}</span>
                <span>局时：{{userInfo.gameLeftTime}}</span>
                <span>步时{{userInfo.stepLeftTime}}</span>
                <span>{{userInfo.type == 'white'?'白棋':'黑棋'}}</span>

            </div>
        </div>
		<div v-show="!isSearch" class="cover"> 
			<button @click="getCoin">寻 找 对 手</button>
		</div>
    </div>
</template>
<script>
export default {
  mounted() {
    this.getCoin();
  },
  computed: {},
  directives: {
    update: {
      // 指令的定义
      bind: function(el, binding, vnode) {},
      componentUpdated: function(el, binding, vnode, oldVnode) {
        if (binding.value) {
          el.classList.add(binding.value);
        }
      }
    }
  },
  data() {
    return {
      layout: [],
      isSearch: false,
      userInfo: {
        userName: "",
        user_integral: 0,
        gameLeftTime: 0,
        stepLeftTime: 0,
        type: "white"
      },
      opponentInfo: {
        userName: "",
        user_integral: 0,
        gameLeftTime: 0,
        stepLeftTime: 0,
        type: "black"
      }
    };
  },
  methods: {
    // 获取用户信息
    async getCoin() {
	  let result = await this.axiosService.getCoin({});
      if (result.data.length) {
		  let data = result.data[0];
		  this.userInfo.userName = data.user_name;
		  this.userInfo.user_integral = data.user_integral;

      }
	},
	// 搜索对手
	async searchOpponent () {
		 let result = await this.axiosService.getCoin({});
		if (result.data.length) {
			let data = result.data[0];
			this.userInfo.userName = data.user_name;
			this.userInfo.user_integral = data.user_integral;

		}
	},
    tdClick(index, e) {
      if (e.target.classList.contains(this.userInfo.type)) {
        return;
      }
      this.$set(this.layout, index, this.userInfo.type);
    }
  }
};
</script>


