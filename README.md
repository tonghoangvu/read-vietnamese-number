# read-vietnamese-number

Thư viện chuyển đổi số thành chữ trong Tiếng Việt.
Có các tính năng như:

* Đọc được số âm, số thập phân
* Số lớn tùy ý (chỉ cần thêm đủ các đơn vị phù hợp)
* Có nhiều tùy chọn: đơn vị tính, dấu phân tách, cách đọc số,...

Hỗ trợ ngôn ngữ JavaScript và TypeScript.

## Installation

Thư viện đã được publish tại https://www.npmjs.com/package/read-vietnamese-number.

Cài đặt thư viện qua NPM.

```
npm install read-vietnamese-number
```

Hoặc sử dụng Yarn thay thế.

```
yarn add read-vietnamese-number
```

## How to use?

Cách sử dụng gồm 4 bước:

1. Import class và các function cần thiết
2. Tạo object cấu hình và điều chỉnh phù hợp
3. Gọi hàm phân tích chuỗi số
4. Gọi hàm đọc số đã phân tích

Ví dụ cách sử dụng thư viện trong JavaScript.

```js
// Bước 1
import {
    ReadingConfig,
    parseNumberData, readNumber
} from 'read-vietnamese-number'

// Bước 2
const config = new ReadingConfig()
config.unit = ['đồng']

// Bước 3
const number = parseNumberData(config, '12345.6789')

// Bước 4
if (number === null)
    console.log('Số không hợp lệ')
else
    console.log(readNumber(config, number))
```

Với TypeScript, vui lòng tham khảo ví dụ trong file `node_modules/read-vietnamese-number/demo.ts`.

## How to publish a new version?

Các bước publish phiên bản mới lên NPM:

1. Commit tất cả những thay đổi
2. Chạy `npm pre-deploy` để check coding style và unit test
3. Chạy `npm deploy-xxx` với `xxx` là mức độ tăng version (`patch`, `minor` hoặc `major`)
4. Push code lên GitHub

**Lưu ý:** Các script trên cũng có thể sử dụng Yarn thay thế.

Nếu thư viện hữu ích, cho tớ một star trên GitHub nhé ❤
