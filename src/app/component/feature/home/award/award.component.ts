import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface AwardItem {
  description: string;
  money: string;
  award: string;
  profit: string;
}

@Component({
  selector: 'app-award',
  imports: [NavComponent, CommonModule],
  templateUrl: './award.component.html',
  styleUrl: './award.component.scss'

})
export class AwardComponent {
  currentTab: 'money' | 'award' | 'profit' = 'money';

  awardList: AwardItem[] = [
    {
      description: 'Nhận 01 Voucher giảm giá khi mua xe Vinfast trị giá 50.000.000VND, 01 thẻ VIP VINGROUP giảm giá 5% khi mua các BĐS của Vinhomes, cùng nhiều sản phẩm, dịch vụ khác.',
      money: '1 Tỷ',
      award: '82 Triệu',
      profit: '1%'
    },
    {
      description: 'Nhận 01 Voucher giảm giá khi mua xe Vinfast trị giá 80.000.000VND, 01 thẻ VIP VINGROUP giảm giá 8% khi mua các BĐS của Vinhomes, cùng nhiều sản phẩm, dịch vụ khác. Và miễn phí qua đêm 07 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl.',
      money: '3 Tỷ',
      award: '246 Triệu',
      profit: '1.2%'
    },
    {
      description: 'Nhận 01 thẻ VIP VINGROUP giảm giá 12% khi mua các BĐS của Vinhomes, cùng nhiều sản phẩm, dịch vụ khác. Và miễn phí qua đêm 10 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl. Hiện tại dự án Vinhomes Ocean Park 3 Hưng Yên đang có sự kiện dành cho khách hàng mới tham gia Quỹ huy động vốn đầu tư dự án Tập đoàn Vingroup. Khi khách hàng tham gia đặt lịch gói 7 tỷ ngoài thưởng đặt lịch quý khách còn nhận 01 xe điện Vinfast VF3 trị giá 315.000.000VND, cơ hội bốc thăm 3 căn Hoa Hậu tại Ocean Park 3 Hưng Yên, 01 Cây vàng SJC 9999.',
      money: '7 Tỷ',
      award: '595 Triệu',
      profit: '1.5%'
    },
    {
      description: 'Nhận 01 thẻ VIP VINGROUP giảm giá 15% khi mua các BĐS của Vinhomes, cùng nhiều sản phẩm, dịch vụ khác. Và miễn phí qua đêm 13 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl, 01 cặp vé du lịch Dubai 07 ngày bao trọn gói. Khi khách hàng tham gia đặt lịch gói 16 tỷ ngoài thưởng đặt lịch quý khách còn nhận 01 xe điện Vinfast VF7 trị giá 999.000.000VND, cơ hội bốc thăm 3 căn Hoa Hậu tại Ocean Park 3 Hưng Yên, 02 Cây vàng SJC 9999.',
      money: '16 Tỷ',
      award: '1 Tỷ 408 Triệu',
      profit: '1.8%'
    },
    {
      description: 'Nhận 01 thẻ VIP VINGROUP giảm giá 20% khi mua các BĐS của Vinhomes, cùng nhiều sản phẩm, dịch vụ khác. Và miễn phí qua đêm 18 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl, 01 xe điện Vinfast VF8 trị giá 1.375.000.000VND, và một tour du lịch các nước Đông Nam Á. Một viên kim cương tự nhiên trị giá 25.000USD.',
      money: '25 Tỷ',
      award: '2 Tỷ 250 Triệu',
      profit: '2%'
    },
    {
      description: 'Nhận 01 thẻ VIP VINGROUP giảm giá 25% khi mua các BĐS của Vinhomes, cùng nhiều sản phẩm, dịch vụ khác, 01 thẻ Vinmec Health khám chữa bệnh miễn phí trị giá 500.000.000VND. Và miễn phí qua đêm 20 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl, xe điện Vinfast VF9 trị giá 2.312.000.000VND, và một tour du lịch các nước Châu Á.',
      money: '40 Tỷ',
      award: '3 Tỷ 680 Triệu',
      profit: '2.2%'
    },
    {
      description: 'Tặng 01 căn chung cư cao cấp 2 phòng ngủ tại Royal City Hà Nội, 01 thẻ VIP VINGROUP giảm giá 30%, 01 thẻ Vinmec Health khám chữa bệnh miễn phí trị giá 800.000.000VND. Và miễn phí qua đêm 25 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl, 01 suất học bổng trường học nổi tiếng Harvard University (Hoa Kỳ) miễn toàn bộ phí 2 năm, và một tour du lịch các nước Châu Âu.',
      money: '60 Tỷ',
      award: '5 Tỷ 800 Triệu',
      profit: '2.5%'
    },
    {
      description: 'Tặng 01 căn chung cư cao cấp 3 phòng ngủ tại Central park Hồ Chí Minh, 01 thẻ Vinmec Health khám chữa bệnh miễn phí trị giá 1.000.000.000VND. Và miễn phí qua đêm 30 ngày/năm tại tất cả các khu nghỉ dưỡng của Vinpearl, và "Trở thành cổ đông của Tập đoàn với 0.05% lợi nhuận hàng tháng "Vĩnh viễn".',
      money: '90 Tỷ',
      award: '8 Tỷ 820 Triệu',
      profit: '2.8%'
    },
    {
      description: 'Trở thành cổ đông của Tập đoàn với 1% lợi nhuận hàng tháng "Vĩnh viễn".',
      money: '150 Tỷ',
      award: '8 Tỷ 820 Triệu',
      profit: '3%'
    }
  ];

  constructor(private router: Router) {}

  switchTab(tab: 'money' | 'award' | 'profit') {
    this.currentTab = tab;
  }
  
  goBack() {
    this.router.navigate(['/vinclub']);
  } 
}
