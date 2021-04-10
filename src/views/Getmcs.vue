<template>
  <v-container>
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card class="dialog">
        <div class="d-flex justify-center progress" v-if="dialoading">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
        <span v-if="!dialoading">
          <v-card-title class="headline">{{ servername }}</v-card-title>
          <v-card-subtitle>
            <br />
            SHA1: {{ serversha1 }}
            <br />
            文件大小: {{ serversize }} MB
            <br />
            下载地址: {{ serverurl }}
            <br />
          </v-card-subtitle>
        </span>
        <div class="d-flex justify-center">
          <v-btn
            elevation="2"
            color="primary"
            :loading="dialoading"
            :disabled="dialoading"
            :href="serverurl"
            >下载</v-btn
          >
          <span class="space"></span>
          <v-btn elevation="2" color="error" @click="dialog = false"
            >关闭</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <v-alert type="info" outlined prominent>
      <div class="title">关于</div>
      <div>
        在这里你可以下载到官方的 Minecraft
        服务端，点击查看下面的放大镜可以获取下载地址。<br />
        在搜索框内输入 release 可过滤非正式版本，也可搜索指定版本，比如:
        1.16.5。
      </div>
    </v-alert>

    <v-row>
      <v-col cols="12">
        <v-card elevation="4">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="搜索"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="ver"
            :search="search"
            :loading="loading"
            loading-text="获取数据中，请稍候(时间取决于您的网络)"
            no-results-text="未找到匹配版本"
            disable-sort
            locale="zh-CN"
          >
            <template v-slot:[`item.releaseTime`]="{ item }">
              {{ getTime(item.releaseTime) }}
            </template>
            <template v-slot:[`item.url`]="{ item }">
              <v-icon small @click="showDialog(item.url)"> mdi-magnify </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainView",

  data: () => ({
    loading: true,
    dialoading: false,
    displaysnap: false,
    dialog: false,
    serversha1: null,
    serversize: 0,
    serverurl: null,
    servername: null,
    ver: [],
    search: "",
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "类型", value: "type" },
      { text: "发布时间", value: "releaseTime" },
      { text: "查看", value: "url" },
    ],
  }),
  methods: {
    getTime: (utcTime) => utcTime.replace("T", " ").replace("+00:00", ""),
    showDialog(url) {
      this.dialog = true;
      this.dialoading = true;
      fetch(url, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((json) => {
          this.serversha1 = json.downloads.server.sha1;
          this.serversize = (json.downloads.server.size / 1048576).toFixed(2);
          this.serverurl = json.downloads.server.url.replace(
            "launcher.mojang.com",
            "download.mcbbs.net"
          );
          this.dialoading = false;
        });
    },
    getdata: function () {
      fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json", {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((json) => {
          for (let i in json.versions) {
            this.ver.push(json.versions[i]);
          }
          this.loading = false;
        });
    },
  },
  created() {
    this.getdata();
  },
};
</script>

<style scoped>
div.progress {
  padding: 2rem;
}
div.dialog {
  padding: 1rem;
}
span.space {
  display: inline-block;
  width: 1rem;
}
</style>
