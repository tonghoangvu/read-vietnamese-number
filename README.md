# read-vietnamese-number

Thư viện đọc số thành chữ trong Tiếng Việt. Có thể đọc được:

* Số âm, số dương, số thập phân
* Số lớn lên tới hàng tỉ tỉ
* Độ dài không giới hạn, chỉ cần thêm danh sách đơn vị đủ là được
* Hỗ trợ nhiều tùy chọn như đơn vị tính, dấu phân tách,...

Ngôn ngữ hỗ trợ JavaScript và TypeScript.

Thư viện đã được public dưới dạng NPM package tại https://www.npmjs.com/package/read-vietnamese-number.

## Installation

Cài đặt thư viện qua NPM.

```console
npm install read-vietnamese-number
```

Cũng có thể được cài đặt thông qua Yarn.

```console
yarn add read-vietnamese-number
```

## How to use?

Cách sử dụng đơn giản gồm 4 bước:

* Import các interface, class cần thiết `NumberData`, `ReadingConfig` và `Reader`.
* Tạo object cấu hình `ReadingConfig`. Có thể điều chỉnh các thuộc tính cho phù hợp.
* Phân tích chuỗi số thành đối tượng dạng `NumberData`.
* Đọc data đã phân tích ở dạng `NumberData` bằng hàm `Reader.readNumber()`.

Code ví dụ đọc số.

```js
// Bước 1
import { NumberData, ReadingConfig, Reader } from 'read-vietnamese-number';

// Bước 2
const config = new ReadingConfig();
config.unit = ['đồng'];  // Thiết lập tùy chọn

// Bước 3
const number = Reader.parseNumberData('12345.6789');

// Bước 4
console.log(Reader.readNumber(number));
```

Đối với TypeScript, vui lòng tham khảo ví dụ trong file `node_modules/read-vietnamese-number/test.ts`.

## How to publish a new version to NPM?

Thực hiện theo các bước sau để update phiên bản mới lên NPM:

1. Chạy `npm lint` hoặc `yarn lint` và sửa các code sai coding style
2. Chạy `npm test` hoặc `yarn test` để đảm bảo pass hết các test case
3. Commit code và đẩy lên GitHub
4. Chạy `npm build` hoặc `yarn build` để build thành JavaScript
5. Tăng version cho NPM package bằng `npm version xxx` (`xxx` một trong ba giá trị `patch`, `minor`, `major`)
6. Chạy `npm publish` để đẩy lên NPM repository

Nếu thấy thư viện hữu ích, đừng quên cho tôi một sao trên GitHub nhé ❤.
