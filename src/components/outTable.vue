<template>
    <button size="mini" round type="primary" @click="exportExcel">导出Excel</button>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  props: {
    id: {
      type: String,
      default: 'Table'
    },
    name: {
      type: String,
      default: 'Table'
    }

  },
  data () {
    return {}
  },
  components: {},
  methods: {
    // 导出Excel表格
    exportExcel () {
      var xlsxParam = { raw: true }
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#' + this.id),
        xlsxParam
      )
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          this.name + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>