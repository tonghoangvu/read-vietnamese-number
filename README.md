# read-vietnamese-number

Thư viện đọc số thành chữ trong Tiếng Việt, với các tính năng:

- Hỗ trợ số âm, số thập phân, số lớn tùy ý (với cấu hình phù hợp)
- Có nhiều tùy chọn: đơn vị tính, dấu phân tách,...
- Hoạt động tốt trong trình duyệt và Node.js

Hỗ trợ TypeScript, tương thích với JavaScript từ ES6 trở lên.
Hoạt động với các module system như ESM và CommonJS.

Live demo tại https://rvn.tonghoangvu.dev.

## Installation

Cài đặt thư viện với NPM, Yarn hoặc các package manager khác.

```bash
# NPM
npm install read-vietnamese-number

# Yarn
yarn add read-vietnamese-number
```

Hoặc sử dụng trực tiếp trong browser thông qua CDN (hoặc tự host).
Chú ý nên kèm theo version cố định trong CDN URL, ví dụ như https://unpkg.com/read-vietnamese-number@2.0.0.

```html
<!-- Load the library -->
<script type="module" src="https://unpkg.com/read-vietnamese-number"></script>

<!-- And use it -->
<script type="module">
	import {} from 'https://unpkg.com/read-vietnamese-number'

	// ...
</script>
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
	NotEnoughUnitError,
	ReadingConfig,
	doReadNumber,
} from 'read-vietnamese-number' // or CDN URL

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
	} else if (err instanceof NotEnoughUnitError) {
		console.error('Không đủ đơn vị đọc số')
	}
}
```

### Error handling

Thư viện ném ra 3 loại `RvnError` sau nếu có lỗi trong quá trình đọc số:

- `InvalidFormatError` khi input không hợp lệ
- `InvalidNumberError` khi số chứa ký tự không hợp lệ
- `NotEnoughUnitError` khi không đủ đơn vị đọc số

Hàm `doReadNumber()` chấp nhận input là `string` và `bigint`, ném `InvalidFormatError` với các trường hợp khác.
Hành vi này liên quan đến các vấn đề định dạng số của JavaScript (tràn số, mất độ chính xác,...).

Với `NotEnoughUnitError`, nguyên nhân do cấu hình đọc số không có đủ số lượng đơn vị phù hợp.
Nên giới hạn độ lớn số nhập vào cho phù hợp với các đơn vị hiện có (mặc định hỗ trợ đến `tỉ tỉ`).
Ngoài ra có thể xử lý bằng cách thêm các đơn vị lớn hơn vào cấu hình (không khuyến khích).

## Compatibility

JavaScript có 2 module system phổ biến:

- ESM: tiêu chuẩn của JavaScript, hoạt động trong các trình duyệt và Node.js v12 trở lên
- CommonJS: mặc định của Node.js, không hoạt động trong trình duyệt

Hai module system trên có syntax nhập/xuất module khác nhau:

- ESM: sử dụng `import` và `export`
- CommonJS: sử dụng `require()`, `exports` và `module.exports`

Project đang hoạt động với module system nào thì cần sử dụng syntax tương ứng.
Ví dụ với CommonJS không thể dùng `import` mà phải dùng `require()`, và ngược lại.

### Hybrid package

Thư viện `read-vietnamese-number` là một hybrid package, hoạt động được với cả ESM và CommonJS.

```js
// ESM
import { doReadNumber, ReadingConfig } from 'read-vietnamese-number'

console.log(doReadNumber(new ReadingConfig(), '100'))
```

```js
// CommonJS
const rvn = require('read-vietnamese-number')

console.log(rvn.doReadNumber(new rvn.ReadingConfig(), '100'))
```

**Lưu ý:**
Nên dùng một syntax thống nhất để import thư viện, tránh dùng cả hai vì sẽ gây ra [dual package hazard](https://nodejs.org/api/packages.html#dual-package-hazard).

### Which import syntax should I use?

#### Browsers

Cần dùng `import` để nhập thư viện trực tiếp trong trình duyệt (môi trường ESM).

```html
<!-- Load the library -->
<script type="module" src="https://unpkg.com/read-vietnamese-number"></script>

<!-- And use it -->
<script type="module">
	import {} from 'https://unpkg.com/read-vietnamese-number'

	// ...
</script>
```

#### JavaScript bundlers

Các JavaScript bundler như Vite hay Webpack sử dụng `import` để nhập các module theo mặc định.
Nên dùng `import` trong trường hợp này, tránh lỗi không tương thích và cấu hình phức tạp.

```js
import {} from 'read-vietnamese-number'
```

**Chú ý:**
Các bundler xử lý `import` không tương đương với ESM tiêu chuẩn.
Các bundler cho phép `import` nhập được TypeScript và cả những asset khác như JSON hay CSS (tham khảo hỗ trợ trên homepage của bundler).

#### Node.js

Các project chạy trên môi trường Node.js sử dụng được cả ESM và CommonJS.

```js
// ESM (Node.js v12+)
import {} from 'read-vietnamese-number'
```

```js
// CommonJS
const rvn = require('read-vietnamese-number')
```

Nên dùng `import` hoặc `require()` tùy vào framework hiện tại, tránh lỗi không tương thích và cấu hình phức tạp.
Ví dụ Express.js sử dụng `require()` theo mặc định, do đó project cũng nên dùng `require()` tương ứng.

#### Node.js with TypeScript

Nên sử dụng `import` để nhập thư viện trong các project TypeScript.
TypeScript biên dịch các lệnh gọi `import` thành `require()` hoặc giữ nguyên tùy vào cấu hình `tsconfig.json`.

```ts
import {} from 'read-vietnamese-number'
```

Project vẫn hoạt động khi sử dụng `require()`, tuy nhiên IntelliSense (gợi ý code) trong VS Code có thể không hoạt động ổn định.

**Chú ý:** TypeScript xử lý `import` không tương đương với ESM tiêu chuẩn.

## Contributing

Muốn đóng góp cho project?
Đừng ngại mở một Issue mới khi bạn có thắc mắc, đề xuất hoặc muốn báo cáo vấn đề.

Pull request phù hợp sẽ được xem xét và hợp nhất:

- Có mô tả rõ ràng
- Đúng chuẩn code style (chạy `npm run deploy:check`)
- Source code biên dịch được (chạy `npm run deploy:build`)

<a href="https://www.buymeacoffee.com/tonghoangvu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Cho tớ một sao ⭐ hoặc click vào nút trên 😍 nếu project hữu ích với bạn nhé.
