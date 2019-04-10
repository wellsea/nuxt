import Vue from 'vue'

Vue.mixin({
  methods: {
    // 必传 标题，描述。其他的 meta 标签通过 payload 注入，其中，每个 meta 的 hid 需要是唯一的。
    $seo(title, content, keywords, payload = []) {
      return {
        title,
        meta: [{
          hid: 'description',
          name: 'description',
          content
        },{
          hid: 'keywords',
          name: 'keywords',
          keywords
        }].concat(payload)
      }
    }
  }
})
