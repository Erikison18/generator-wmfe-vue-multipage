<template>
  <div class="right">
    <i class="collect-icon" 
            id="collect"
            @click="handleCollect(equipmentId)"
            :class="{'not-collect-icon': !iscollected, 'collected-icon': iscollected}"
            /> 
     
       
        
  </div>
</template>

<script>
export default {
  data() {
    return {
      iscollected: false,
    }
  },
  model: {
    event: 'change'
  },
  props: {
    isCollect: Boolean,
    equipmentId: String,
    type: Number,
    collectState: Number,
  },
  mounted() {
    this.iscollected = this.isCollect
  },
  methods: {
    /**
     * 点击收藏
     */
    handleCollect() {
      this.iscollected = !this.iscollected
      
      this.$emit('change', {state: this.iscollected, id: this.equipmentId})
      if(this.collectState != 2000) {
        this.iscollected = this.isCollect
      }
      // 如果是收藏的设备，全部是收藏状态
      if(this.type == 0) {
        this.iscollected = true
      }
    }
  },
  watch: {
    isCollect: function() {
      this.iscollected = this.isCollect
    },
  }
}
</script>

