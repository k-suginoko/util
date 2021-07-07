import { Object } from 'types'

/**
 * string -> object
 * @param  value [description]
 * @return       [description]
 */
export const queryParse = (value: string, options: { sep: string, eq: string, isDecode: boolean } = { sep: '&', eq: '=', isDecode: true }) => {
  const decode = options.isDecode ? decodeURIComponent : (a: string | number) => a

  const converter = (value: string) => {
    return value.match(/^[0-9]+$/) ? Number(value) : decode(value)
  }


  if (value) {
    const index = value.indexOf('?')

    return value
      .slice(index + 1)
      .replace('?', '')
      .split(options.sep)
      .reduce((obj: Object, v: string) => {

        const pair = v.split(options.eq)

        if (pair[0].match(/\[[0-9]\]/)) {
          const key = pair[0].replace(/\[[0-9]\]/g, "");
          if (!obj[key]) {
            obj[key] = [];
          }

          obj[key].push(converter(pair[1]))
        } else {

          obj[pair[0]] = converter(pair[1])
        }

        return obj
      }, {})
  }

  return {}
}

/**
 * object -> string
 * @param  obj [description]
 * @return     [description]
 */
export const queryStringify = (obj: Object = {}, options: { sep: string, eq: string, isEncode: boolean } = { sep: '&', eq: '=', isEncode: true }) => {
  const encode = options.isEncode ? encodeURIComponent : (a: string | number) => a
  const parameter = Object.keys(obj)
    .reduce((arr: any, key: string) => {
      if (obj[key] instanceof Array) {
        let i = 0
        for (let v of obj[key]) {
          arr.push(`${ key }[${ i }]${ options.eq }${ encode(v) }`)
          i++
        }
        return arr
      }

      if (obj[key]) {
        return arr.concat([key + options.eq + encode(obj[key])])
      }

      // return arr
      if (typeof obj[key] === 'number') {
        return arr.concat([key + options.eq + encode(obj[key])])
      }
      return arr
    }, [])

  if (parameter.length) {
    return `?${ parameter.join(options.sep) }`
  }

  return ''
}


/**
 * string -> string
 * @param  string
 * @return arr
 */
 export const urlSplit = (url: string) => {
   return url.split('/')
 }

// /**
//  * オーバーフローするテキストを省略文字で置換
//  */
// export const convOverflowText = (str, max = 4, ellipsis = '...') => {
//   if (!str) return ''
//   if (str.length <= max) return str
//   if (max <= 1) return ellipsis
//   return str.slice(0, max - 1) + ellipsis
// }
//
//
/**
 * 文字列のバイト数取得
 */
export const getByteLength = (str: string) => {
  const len = str ? str.length : 0
  let lenByte = 0
  for (let i = 0; i < len; i++) {
    let c = str.charCodeAt(i)
    // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
    // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
    if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
      lenByte += 1
    } else {
      lenByte += 2
    }
  }
  return lenByte
}

/**
 * 文字列のバイト数配列取得
 */
export const getByteLengthArray = (str: string) => {
  if (!str) return []

  const len = str.length
  let arr = []
  for (let i = 0; i < len; i++) {
    let c = str.slice(i, i + 1)
    arr.push(getByteLength(c))
  }
  return arr
}
//
// /**
//  * オーバーフローするテキストを省略文字で置換(バイト指定版)
//  */
// export const convOverflowTextByte = (str, byteHead = 4, byteTail = 0, ellipsis = '...') => {
//   if (!str) return ''
//
//   if (getByteLength(str) <= byteHead + byteTail) return str
//
//   const len = str.length
//   const bytes = getByteLengthArray(str)
//
//   let arr = []
//   let tmpByte = 0
//   let strHead = ''
//   for (let i = 0; i < len; i++) {
//     if (tmpByte + bytes[i] > byteHead) break
//     tmpByte += bytes[i]
//     strHead += str.slice(i, i + 1)
//   }
//   tmpByte = 0
//   let strTail = ''
//   for (let i = len - 1; 0 <= i; i--) {
//     if (tmpByte + bytes[i] > byteTail) break
//     tmpByte += bytes[i]
//     strTail += str.slice(i, i + 1)
//   }
//
//   return strHead + ellipsis + strTail.split('').reverse().join('')
// }
//
// /**
//  * スクロールのリセット
//  */
// class WindowScrollManager {
//   constructor() {
//     this.y = 0
//
//     this.prev = {
//       y: 0
//     }
//   }
//
//   save() {
//     this.prev.y = window.scrollY
//   }
//
//   reset() {
//     window.scrollTo(0, 0)
//   }
//
//   load() {
//     if (!this.prev.y) return
//     window.scrollTo(0, this.prev.y)
//   }
//
//   delete() {
//     this.prev.y = 0
//   }
// }
//
// export const wsm = new WindowScrollManager()
//
/**
 * 最大ページ数取得
 */
export const getMaxPage = (total: number, count: number) => {
  return total % count
    ? Math.floor(total / count) + 1
    : total / count < 1
    ? 1
    : Math.floor(total / count)
}
