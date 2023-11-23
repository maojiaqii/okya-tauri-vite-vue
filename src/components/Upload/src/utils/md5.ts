import SparkMD5 from 'spark-md5'

/**
 * 分段计算MD5
 * @param file {File}
 * @param options {Object} - onProgress | onSuccess | onError
 */
export function generateMD5(file, options = {}) {
  const fileReader = new FileReader()
  const time = new Date().getTime()
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 10 * 1024 * 1000
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5()
  const loadNext = () => {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
  }
  loadNext()
  fileReader.onload = (e) => {
    spark.append(e.target.result)
    if (currentChunk < chunks) {
      currentChunk++
      loadNext()
      if (options.onProgress && typeof options.onProgress == 'function')
        options.onProgress(currentChunk, chunks)
    }
    else {
      const md5 = spark.end()
      console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time}ms`)
      // md5计算完毕
      if (options.onSuccess && typeof options.onSuccess == 'function')
        options.onSuccess(md5, `<b>MD5计算完毕</br><strong><font color="blue">${file.name}</font></strong></br>大小：<u>${file.size}</u> Bytes</br>用时：<font color="green">${new Date().getTime() - time}ms</font><b>`)
    }
  }
  fileReader.onerror = function () {
    console.log('MD5计算失败')
    if (options.onError && typeof options.onError == 'function')
      options.onError()
  }
}
