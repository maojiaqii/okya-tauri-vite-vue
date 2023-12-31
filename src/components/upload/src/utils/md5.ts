import SparkMD5 from 'spark-md5'

/**
 * 分段计算MD5
 * @param file {File}
 * @param options {Object} - onProgress | onSuccess | onError
 */
export function generateMD5(file, chunkSize, options = {}) {
  const fileReader = new FileReader()
  const time = new Date().getTime()
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  fileReader.readAsArrayBuffer(blobSlice.call(file.file, 0, chunkSize))
  const loadNext = () => {
    const start = currentChunk * chunkSize
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
  }
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
      // md5计算完毕
      if (options.onSuccess && typeof options.onSuccess == 'function')
        options.onSuccess(md5, `<b>MD5计算完毕</br><strong><font color="blue">${file.name}</font></strong></br>大小：<u>${file.size}</u> Bytes</br>用时：<font color="green">${new Date().getTime() - time}ms</font><b>`)
    }
  }
  fileReader.onerror = function () {
    if (options.onError && typeof options.onError == 'function')
      options.onError()
  }
}
