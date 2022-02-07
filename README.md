# read-vietnamese-number

Thư viện chuyển đổi số thành chữ trong Tiếng Việt.
Có các tính năng như:

- Đọc được số âm, số thập phân
- Số lớn tùy ý (chỉ cần thêm đủ các đơn vị phù hợp)
- Có nhiều tùy chọn: đơn vị tính, dấu phân tách, cách đọc số,...

Hỗ trợ ngôn ngữ JavaScript và TypeScript.

## 1. Installation

Thư viện đã được publish tại https://www.npmjs.com/package/read-vietnamese-number.

Cài đặt thư viện qua NPM.

```
npm install read-vietnamese-number
```

Hoặc sử dụng Yarn thay thế.

```
yarn add read-vietnamese-number
```

## 2. How to use?

Cách sử dụng gồm 4 bước:

1. Import class và các function cần thiết
2. Tạo object cấu hình và điều chỉnh phù hợp
3. Gọi hàm phân tích chuỗi số
4. Gọi hàm đọc số đã phân tích

Ví dụ cách sử dụng thư viện trong JavaScript.

```js
// Bước 1
import {
	InvalidNumberError,
	UnitNotEnoughError,
	ReadingConfig,
	parseNumberData,
	readNumber
} from 'read-vietnamese-number'

// Bước 2
const config = new ReadingConfig()
config.unit = ['đồng']

try {
	// Bước 3
	const number = parseNumberData(config, '12345.6789')

	// Bước 4
	console.log(readNumber(config, number))
} catch (e) {
	if (e instanceof InvalidNumberError) console.log('Số không hợp lệ')
	else if (e instanceof UnitNotEnoughError) console.log('Không đủ đơn vị đọc số')
}
```

Với TypeScript, vui lòng tham khảo ví dụ trong file `demo.ts`.

### 2.1. Error handling

Function `parseNumberData()` có thể tạo ra 2 loại Error:

- InvalidNumberError: khi số không hợp lệ
- UnitNotEnoughError: khi không đủ đơn vị đọc số (số có phần nguyên quá dài trong khi số lượng đơn vị trong cấu hình không đủ)

Do đó cần sử dụng `try catch` và xử lý thích hợp như trong ví dụ.

### 2.2. CommonJS

Nếu bạn sử dụng CommonJS (require/export), cách sử dụng thư viện sẽ hơi khác một chút.

```js
const rvn = require('read-vietnamese-number')

// Sau đó, các function, class,... của thư viện được gọi qua biến rvn
const config = new rvn.ReadingConfig()
const number = rvn.parseNumberData(config, '12345.6789')
console.log(rvn.readNumber(config, number))

// Viết như trên để cho đơn giản, nhưng vẫn cần kiểm tra lỗi đầy đủ
```

## 3. How to publish a new version?

Các bước publish phiên bản mới lên NPM:

1. Commit tất cả những thay đổi
2. Chạy `npm pre-deploy` để check coding style và unit test
3. Chạy `npm deploy-xxx` với `xxx` là mức độ tăng version (`patch`, `minor` hoặc `major`)
4. Push code lên GitHub

**Lưu ý:** Các script trên cũng có thể sử dụng Yarn thay thế.

Nếu thư viện hữu ích, cho tớ một star trên GitHub nhé ❤
