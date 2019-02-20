<template> 
  <div class="body">
    <ul>
      <li v-for="(item, index) in sourceData" :key="index">
        <span class="index">{{index + 1 }}</span>
        <template v-if="item.shared == 0 && item.selfEq == 0">
          <span class="name no-share">设备取消共享，无权查看</span>
          <span class="typeName" >--</span>
        </template>
        <template v-else>
          <span class="name">{{item.stationName}}</span>
          <span class="typeName" :class="{isred: item.level === '5'}">{{item[ptype]}}</span>
        </template>
      </li>
      <!-- <p>已经到底部</p> -->
    </ul>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      touchstartY: "",
      touchendY: "",
      page: 0,
      isshowLoading: false,
      maxHeight:0,
      isshowNodata: false,
      toBottomed:false,
      transitionHeight:0
    }
  },
  props: {
    sourceData: Array,
    length: Number,
    ptype: String,
    showLoading: Boolean,
    show: Boolean,
    totalPage: Number,
  },
  model: {
    event: 'change'
  },
  mounted() {
    this.isshowLoading = this.showLoading
  },
  methods: {
    pullDown(selector,page,scope,methods){
      let element=document.querySelector(selector);
      let returnpage=page;
      let p=document.createElement('span');
      element.style.position='relative';
      p.innerText='';
      p.style.position='absolute';
      p.style.bottom='0px';
      p.style.width='100%';
      p.style.fontSize='12px';
      p.style.lineHeight='30px';
      p.style.textAlign='center';
      if(element.clientHeight==element.scrollHeight){
        scope.page=1;
        element.appendChild(p);
        scope.$emit('change', scope.page)
      }
      element.onscroll=function(e){
        e.preventDefault();
        if(element.scrollTop+element.clientHeight==element.scrollHeight){
          scope.page=returnpage++;
          p.innerText='加载更多'+returnpage;
          p.style.top=element.scrollHeight-30+'px';
          element.appendChild(p);
          scope.$emit('change', scope.page)
          // for(i in methods){
          //   scope[methods[i]()];
          // }
        }
      }
    },
    touchstart(e) {
      this.touchstartY = e.touches[0].clientY;
      let path=e.path || (e.composedPath && e.composedPath());
      for(let i=0; i<path.length; i++){
        if(path[i].className=='body'){
          if(path[i].scrollTop+path[i].clientHeight==path[i].scrollHeight){
            this.toBottomed=true;
          }else{
            this.toBottomed=false;
          }
          return;
        }
      }
    },
    touchmove(e) {
      if(this.toBottomed){
        let path=e.path || (e.composedPath && e.composedPath());
        for(let i=0; i<path.length; i++){
          if(path[i].className=='body'){
            for(let j=0; j<path[i].children.length; j++){
              if(path[i].children[j].className=='alert'){
                let refreshText=path[i].children[j];
                refreshText.innerText="加载中...";
                this.transitionHeight=this.touchstartY - e.touches[0].clientY;
                if (this.transitionHeight >= 50) {
                  refreshText.innerHTML = '<i></i>释放更新';
                }
              }
            }
          }
        }
      }
    },
    touchend(e) {
      let self = this;
      let path=e.path || (e.composedPath && e.composedPath());
      self.touchendY = e.changedTouches[0].clientY;
      for(let i=0; i<path.length; i++){
        if(path[i].className=='body'){
          for(let j=0; j<path[i].children.length; j++){
            if(path[i].children[j].className=='alert'){
              let refreshText=path[i].children[j];
              if (self.touchstartY - self.touchendY >= 50 && self.toBottomed) {
                self.page++;
                if (self.page >= self.totalPage) {
                  refreshText.innerText="已到底部";
                  return;
                }
                self.$emit('change', self.page);
              }else{
                refreshText.innerText="上拉加载更多";
              }
              self.toBottomed=false;
            }
          }
        }
      }
      // this.touchendY = e.changedTouches[0].clientY;
      // if (this.touchstartY - this.touchendY >= 30 && this.toBottomed) {
      //   //this.showLoading = true;
      //   this.page++;
      //   if (this.page >= this.totalPage) {
      //     this.isshowNodata = true
      //     return; 
      //   }
      //   this.isshowLoading = true
      //   setTimeout(() => {
      //     this.isshowLoading = false
      //     this.$emit('change', this.page)
      //   }, 1000);
      // }else{
      //   this.toBottomed=false;
      // }
      
     
      // this.showLoading = true;
      // this.requestMyCollection();
      // if (this.showLoading) {
      //   // setTimeout(function() {
      //   //   self.showLoading = !self.showLoading;
      //   // }, 2000);
      // }
    },
  }
}
</script>

