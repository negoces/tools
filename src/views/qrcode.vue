<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-col cols="12">
        <v-alert color="info" outlined>
          <div class="title">二维码生成工具</div>
          <div>1.输入内容<br />2.获得二维码</div>
        </v-alert>
        <v-textarea
          outlined
          auto-grow
          clearable
          clear-icon="mdi-close-circle"
          label="内容"
          value="https://tools.negoces.top/"
          v-model="text"
          @input="genQRCode(text)"
        ></v-textarea>
        <div ref="qrCodeDiv" style="display: inline-block"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QRCodeJS from "qrcodejs2";
export default {
  name: "MainView",
  data: () => ({
    text: "https://tools.negoces.top/",
  }),
  methods: {
    genQRCode: function (raw) {
      this.$refs.qrCodeDiv.innerHTML = "";
      new QRCodeJS(this.$refs.qrCodeDiv, {
        text: raw,
        width: 380,
        height: 380,
        colorDark: "#707070",
        colorLight: "#ffffff",
        correctLevel: QRCodeJS.CorrectLevel.M,
      });
    },
  },
  mounted() {
    this.genQRCode("https://tools.negoces.top/");
  },
};
</script>
