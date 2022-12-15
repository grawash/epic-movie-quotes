<template>
  <div class="flex flex-col">
    <div
      class="flex items-center gap-6 pb-6 mb-6 border-b border-[#EFEFEF4D] text-xl"
    >
      <div class="flex items-center">
        <span class="mr-3">{{ comments.length }}</span>
        <quote-comment-icon />
      </div>
      <div class="flex items-center">
        <span class="mr-3">{{ likes.length }}</span>
        <love-icon @click="toggleLike" class="cursor-pointer" />
      </div>
    </div>
    <div class="max-h-[400px] overflow-auto">
      <div v-for="comment in comments" class="mb-6 text-xl flex flex-col">
        <div class="flex items-center">
          <profile-picture
            :source="comment.user.thumbnail"
            class="w-14 font-medium shrink-0 mr-6"
          />
          <p>{{ comment.user.name }}</p>
        </div>
        <div class="flex items-center">
          <div class="w-14 shrink-0 mr-6"></div>
          <p class="pb-6 w-full border-b border-[#EFEFEF4D] border-opacity-40">
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center">
    <profile-picture :source="user.thumbnail" />
    <create-comment-input
      @updateComments="fetchComments"
      :quoteId="quoteId"
      :quoteUser="quoteUser"
    />
  </div>
</template>
<script setup>
import ProfilePicture from "@/components/ProfilePicture.vue";
import CreateCommentInput from "@/components/inputs/CreateCommentInput.vue";
import axios from "@/config/axios/index.js";
import { defineProps, watch } from "vue";
import { ref } from "vue";
import QuoteCommentIcon from "@/components/icons/QuoteCommentIcon.vue";
import LoveIcon from "@/components/icons/LoveIcon.vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  quoteId: Number,
  quoteUser: Number,
});
const user = useUserStore();
const quoteId = ref(props.quoteId);
const comments = ref([]);
const likes = ref([]);
const likeStatus = ref(false);
watch(
  () => user.newNotifications,
  (value) => {
    if (value === true) {
      axios
        .get(`comments`, { params: { quote_id: quoteId.value } })
        .then(({ data }) => {
          comments.value = data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }
);
function fetchComments() {
  axios
    .get(`comments`, { params: { quote_id: quoteId.value } })
    .then(({ data }) => {
      comments.value = data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
fetchComments();
axios
  .post(`likes/chekQuoteLikeStatus`, {
    quote_id: quoteId.value,
    sender_id: user.userId,
  })
  .then(({ data }) => {
    if (data.length === 0) {
      likeStatus.value = true;
    } else {
      likeStatus.value = false;
    }
  })
  .catch((error) => {
    console.log(error.response.data);
  });
function fetchLikes() {
  axios
    .get(`likes`, { params: { quote_id: quoteId.value } })
    .then(({ data }) => {
      likes.value = data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
fetchLikes();
function toggleLike() {
  if (likeStatus.value === true) {
    likeStatus.value = false;
    axios
      .post(`likes`, {
        quote_id: quoteId.value,
        user_id: user.userId,
      })
      .then(({ data }) => {
        likes.value = data;
        fetchLikes();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    axios
      .post(`notifications`, {
        quote_id: quoteId.value,
        sender_id: user.userId,
        reciever_id: props.quoteUser,
        action: "like",
        read_status: 1,
      })
      .then(({ data }) => {
        likes.value = data;
        fetchLikes();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  } else {
    likeStatus.value = true;
    axios
      .delete(`likes`, {
        params: {
          quote_id: quoteId.value,
          sender_id: user.userId,
        },
      })
      .then(({ data }) => {
        likes.value = data;
        fetchLikes();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
</script>
