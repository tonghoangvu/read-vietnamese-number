/**
 * Class dùng tạo các object cấu hình để đọc số.
 * Khi tạo ra thì object cấu hình sẽ có các giá trị mặc định.
 * Có thể thay đổi các thuộc tính tùy theo nhu cầu.
 */
class ReadingConfig {
    public separator = ' ';
    public unit = ['đơn', 'vị'];
    public negativeSign = '-';
    public pointSign = '.';
    public digitsPerPart = 3;
    public filledDigit = '0';

    public digits = [
        'không', 'một', 'hai', 'ba', 'bốn',
        'năm', 'sáu', 'bảy', 'tám', 'chín'
    ];
    public units = [
        [], ['nghìn'], ['triệu'], ['tỉ'],
        ['nghìn', 'tỉ'], ['triệu', 'tỉ'], ['tỉ', 'tỉ']
    ];

    public negativeText = 'âm';
    public pointText = 'chấm';
    public oddText = 'lẻ';
    public tenText = 'mười';
    public hundredText = 'trăm';

    public oneToneText = 'mốt';
    public fourToneText = 'tư';
    public fiveToneText = 'lăm';
    public tenToneText = 'mươi';
}

export default ReadingConfig;
