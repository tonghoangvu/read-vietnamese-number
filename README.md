# read-vietnamese-number

Thư viện đọc số thành chữ trong Tiếng Việt. Có thể đọc được:

* Số âm, số dương, số thập phân
* Số lớn lên tới hàng tỉ tỉ
* Độ dài không giới hạn, chỉ cần thêm danh sách đơn vị đủ là được
* Hỗ trợ nhiều tùy chọn như đơn vị tính, dấu phân tách,...

Hỗ trợ hai ngôn ngữ JavaScript và TypeScript.

Thư viện đã được publish thành NPM package tại https://www.npmjs.com/package/read-vietnamese-number.

## Installation

Cài đặt thư viện qua NPM.

```
npm install read-vietnamese-number
```

Cũng có thể được cài đặt thông qua Yarn.

```
yarn add read-vietnamese-number
```

## How to use?

Cách sử dụng đơn giản gồm 4 bước:

* Import các interface, class cần thiết `NumberData`, `ReadingConfig` và `Reader`.
* Tạo object cấu hình `ReadingConfig` và điều chỉnh các thuộc tính cho phù hợp.
* Phân tích chuỗi số thành đối tượng dạng `NumberData`.
* Đọc data đã phân tích ở dạng `NumberData` bằng hàm `Reader.readNumber()`.

Dưới đây là ví dụ về cách sử dụng thư viện.

```js
// Bước 1
import { NumberData, ReadingConfig, Reader } from 'read-vietnamese-number'

// Bước 2
const config = new ReadingConfig()
config.unit = ['đồng']  // Thiết lập tùy chọn

// Bước 3
const number = Reader.parseNumberData('12345.6789')

// Bước 4
console.log(Reader.readNumber(number))
```

Với TypeScript, vui lòng tham khảo ví dụ trong file `node_modules/read-vietnamese-number/demo.ts`.

## How to publish a new version to NPM?

Thực hiện theo các bước sau để update phiên bản mới lên NPM:

1. Commit lại code hiện tại
2. Chạy `npm pre-deploy` hoặc `yarn pre-deploy` để check coding style và pass các unit test
3. Chạy `npm deploy-xxx` hoặc `yarn deploy-xxx`, trong đó `xxx` là `patch`, `minor` hoặc `major`
    tương ứng từng mức độ upgrade
4. Push các commit lên GitHub

Nếu thấy thư viện hữu ích, đừng quên cho tôi một sao trên GitHub nhé ❤
