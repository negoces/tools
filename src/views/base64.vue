<template>
  <v-container>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <v-row class="text-center justify-center">
      <v-col cols="12">
        <v-alert color="info" outlined>
          <div class="title">Base64加解密工具</div>
        </v-alert>
        <v-textarea
          outlined
          auto-grow
          clearable
          clear-icon="mdi-close-circle"
          label="输入"
          v-model="input"
        >
        </v-textarea>
        <v-btn class="ma-2" outlined color="indigo" @click="encode()">
          加密
        </v-btn>
        <v-btn class="ma-2" outlined color="indigo" @click="decode()">
          解密
        </v-btn>
        <div class="v-text-field__details">
          <div class="v-messages theme--light">
            <div class="v-messages__wrapper"></div>
          </div>
        </div>
        <div class="v-text-field__details">
          <div class="v-messages theme--light">
            <div class="v-messages__wrapper"></div>
          </div>
        </div>
        <v-textarea
          outlined
          auto-grow
          clearable
          clear-icon="mdi-close-circle"
          label="输出"
          v-model="output"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Base64 } from "js-base64";
export default {
  name: "MainView",
  data: () => ({
    input: "",
    output: "",
    snackbar: false,
    text: "出错了，请检查输入文本",
  }),
  methods: {
    encode() {
      try {
        this.output = Base64.encode(this.input);
      } catch (err) {
        this.snackbar = true;
      }
    },
    decode() {
      try {
        this.output = Base64.decode(this.input);
      } catch (err) {
        this.snackbar = true;
      }
    },
  },
  mounted() {},
};
</script>
