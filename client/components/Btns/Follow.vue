<template lang="html">
  <div class="FollowBtnContainer" v-if="!isLoginedUser">
    <ErrorMessageBar :text="errorMessage" v-if="errorMessage"/>
    <button class="FollowBtn" v-if="!isFollowing" @click="followClickEventHandler">Follow</button>
    <button class="BackFollowBtn" v-if="isFollowing" @mouseenter="backFollowMouseEnterEventHandler" @mouseleave="backFollowMouseLeaveEventHandler" @click="backFollowClickEventHandler">{{followingBtnTxt}}</button>
  </div>
</template>

<script>
import ErrorMessageBar from '@/components/Bar/ErrorMessageBar'
import UserAction from '@/API/User/Action'

export default {
  name: 'FollowBtn',
  props: ['userId', 'following'],
  components: {
    ErrorMessageBar
  },
  data () {
    return {
      isFollowing: this.following,
      followingBtnTxt: 'Following',
      errorMessage: ''
    }
  },
  computed: {
    isLoginedUser: function () {
      return this.userId === this.$store.getters.userAccount
    }
  },
  watch: {
    following: function () {
      this.isFollowing = this.following
    }
  },
  methods: {
    async followClickEventHandler (e) {
      if (!this.$store.getters.isLogin) {
        this.$router.push('/login')
      } else if (this.isLoginedUser) {
        return
      }

      let res = await UserAction.follow(this.userId)

      if (!res.result) {
        this.errorMessage = res.errMsg
        return
      }

      this.isFollowing = true
      this.followingBtnTxt = 'Following'
    },
    async backFollowClickEventHandler (e) {
      if (!this.$store.getters.isLogin) {
        this.$router.push('/login')
      } else if (this.isLoginedUser) {
        return
      }

      let res = await UserAction.deleteFollow(this.userId)

      if (!res.result) {
        this.errorMessage = res.errMsg
        return
      }

      this.isFollowing = false
      this.followingBtnTxt = 'Follow'
    },
    backFollowMouseEnterEventHandler (e) {
      this.isFollowing && (this.followingBtnTxt = Unfollow)
    },
    backFollowMouseLeaveEventHandler (e) {
      this.isFollowing &&  (this.followingBtnTxt = 'Following')
    
  }
}
}
</script>

<style lang="css">
.FollowBtnContainer {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.FollowBtnContainer.small button{
  font-size: 12px;
  min-width: 90px;
  padding: 5px 8px;
}

.FollowBtn {
  padding: 6px 16px;
  border: 1px solid #0084B4;
  color: #0084B4;
  display: inline-block;
  font-size: 14px;
  border-radius: 100px;
  min-width: 105px;
  outline: none;
  cursor: pointer;
}

.BackFollowBtn {
  padding: 6px 16px;
  background-color: #329CC3;
  border: 0;
  color: white;
  display: inline-block;
  font-size: 14px;
  border-radius: 100px;
  min-width: 105px;
  outline: none;
  cursor: pointer;
}

.BackFollowBtn:focus,
.FollowBtn:focus {
  outline: none;
}

.BackFollowBtn:hover {
  background-color: #e0245e;
}

.FollowBtn:hover {
    background-color: #E5F2F7;
}
</style>
