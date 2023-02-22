# read-vietnamese-number

Thư viện đọc số thành chữ trong Tiếng Việt, với các tính năng:

- Hỗ trợ số âm, số thập phân
- Đọc được số lớn tùy ý (với cấu hình đơn vị phù hợp)
- Có nhiều tùy chọn: đơn vị tính, dấu phân tách,...

Hỗ trợ TypeScript, tương thích với JavaScript từ ES6 trở lên.

## Installation

Cài đặt thư viện với NPM hoặc Yarn (hoặc các package manager khác).

```bash
# NPM
npm install read-vietnamese-number

# Yarn
yarn add read-vietnamese-number
```

## Usage

Cách sử dụng gồm 3 bước:

- Tạo cấu hình đọc số và điều chỉnh phù hợp
- Đọc chuỗi số với cấu hình đã tạo
- Xử lý lỗi phát sinh

### Code example

```js
import {
	InvalidFormatError,
	InvalidNumberError,
	UnitNotEnoughError,
	ReadingConfig,
	doReadNumber,
} from 'read-vietnamese-number'

// Config reading options
const config = new ReadingConfig()
config.unit = ['đồng']

try {
	// Start reading
	const number = '-12345.6789'
	const result = doReadNumber(config, number)
	console.log(result)
} catch (err) {
	// Handle errors
	if (err instanceof InvalidFormatError) {
		console.error('Định dạng input không hợp lệ')
	} else if (err instanceof InvalidNumberError) {
		console.error('Số không hợp lệ')
	} else if (err instanceof UnitNotEnoughError) {
		console.error('Không đủ đơn vị đọc số')
	}
}
```

### Error handling

Thư viện ném ra 3 loại `RvnError` sau nếu có lỗi trong quá trình đọc số:

- `InvalidFormatError` khi input không hợp lệ
- `InvalidNumberError` khi số chứa kí tự không hợp lệ
- `UnitNotEnoughError` khi không đủ đơn vị đọc số

Hàm `validateNumber()` chấp nhận input là `string` (nên dùng), `bigint` hoặc non-null `object`, và ném `InvalidFormatError` với các trường hợp khác.
Hành vi này liên quan đến các vấn đề định dạng số của JavaScript (tràn số, mất độ chính xác,...).

Với `UnitNotEnoughError`, nguyên nhân do cấu hình đọc số không có đủ số lượng đơn vị phù hợp.
Nên giới hạn độ lớn số nhập vào cho phù hợp với các đơn vị hiện có (mặc định hỗ trợ đến `tỉ tỉ`).
Ngoài ra có thể xử lý bằng cách thêm các đơn vị lớn hơn vào cấu hình (không khuyến khích).

### CommonJS support

Với các module CommonJS (sử dụng `require()` và `exports`), toàn bộ thư viện được truy cập thông qua một object duy nhất.

```js
// Access everything using `rvn` object
const rvn = require('read-vietnamese-number')

// For simplicity, this code doesn't handle errors
const config = new rvn.ReadingConfig()
const number = '-12345.6789'
const result = rvn.doReadNumber(config, number)
console.log(result)
```

## Contributing

Muốn đóng góp cho project?
Đừng ngại mở một Issue mới khi bạn có thắc mắc, đề xuất hoặc muốn báo cáo vấn đề.

Pull request phù hợp sẽ được xem xét và hợp nhất:

- Có mô tả rõ ràng
- Đúng chuẩn code style (chạy `npm run deploy:check`)
- Source code biên dịch được (chạy `npm run deploy:build`)

<a href="https://www.buymeacoffee.com/tonghoangvu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Cho tớ một sao ⭐ hoặc click vào nút trên 😍 nếu project hữu ích với bạn nhé.
