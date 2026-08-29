# THUẬN LỘC PHÁT

Phan tich dau tu san xuat case bao ve cong nghiep bang in 3D FDM.

## Mo ta du an

Trang web mot trang (single-page) danh cho nha dau tu va doi tac, trinh bay:

- Von khoi dau: 18-20 trieu VND
- Unit economics: chi phi filament, gia may, bien dong loi nhuan/san pham
- Kich ban cong suat: tu bao thu den tich cung voi thoi gian hoan von
- Tinh toan ROI tuong tac: dieu chinh cong suat, xem hoan von theo thang
- Chi phi xay dung website va chi phi hosting Hostinger
- Ke hoach 90 ngay tu mua may den doanh thu dau tien

## Giả thuyết kinh doanh (headline)

| Thong so | Gia tri |
|---|---|
| Von khoi dau | 18,000,000 VND (may in 12M + filament 3M + buffer 3M) |
| Filament cost | 300,000 VND/kg, hao hut 10%, hieu dung 333.33 VND/g |
| Gia may mac dinh | 4,000 VND/gio |
| Hoan von (co ban, 35%) | 4.69 thang |
| Hoàn vốn (bảo thủ, 20%) | 24.7 thang |
| Hoan von (tich cung, 55%) | 1.88 thang |

## Tech Stack

- **Vite 6.x** + **TypeScript 5.x** (vanilla, khong co framework runtime)
- **Vitest** cho test tinh toan tai chinh
- Bieu do SVG inline (khong co thu vien bieu do ngoai)
- System fonts: Bahnschrift, Segoe UI, Cascadia Code (khong co CDN ngoai)
- Khong co backend, khong co co so du lieu

## Cac lenh phat trien

```bash
# Cai dat dependency
npm install

# Phat trien (dev server)
npm run dev

# Chay test
npm test

# Kiem tra type
npx tsc --noEmit

# Build san pham
npm run build

# Xem truoc build
npm run preview
```

## Cau truc du an

```
src/
  main.ts              # Diem vao, lap cac section
  data/business-model.ts  # Du lieu kinh doanh, hang so
  lib/finance.ts       # Ham tinh toan tai chinh thuan
  lib/format.ts        # Ham dinh dang VND, phan tram, thang
  sections/            # 11 bo render section
  components/          # ROI calculator, utilization chart
  styles/              # tokens.css, base.css, blueprint.css, print.css
public/
  favicon.svg          # Favicon SVG
  og-image.svg         # OpenGraph image (SVG nguon)
  og-image.png         # OpenGraph image (PNG 1200x630)
tests/
  finance.test.ts      # Test ham tai chinh
  format.test.ts       # Test ham dinh dang
  roi-calculator.test.ts # Test calculator logic
dist/                  # Build output (khong commit)
```

## In va PDF

Trang co print CSS rieng (`src/styles/print.css`). De xuat PDF:

1. Mo trang trong trinh duyet
2. Ctrl+P (Print)
3. Chon "Save as PDF"
4. Cac phan tuong tac (calculator input) se an, ket qua hien thi tinh

## Trien khai

Xem [docs/HOSTINGER_DEPLOYMENT.md](docs/HOSTINGER_DEPLOYMENT.md) de biet chi tiet trien khai len Hostinger.

## Ghi chu ve ma nguon

- Repository nay la **private**. Du lieu tai chinh va gia ca Hostinger la du lieu cu the cho du an nay.
- Gia Hostinger la gia khuyen mai/prepaid tai thoi diem truy cap (2026-08-28). Can xac nhan lai tai checkout.
- Khong co canonical URL hay JSON-LD vi chua co domain san xuat va chi tiet phap ly cu the. Se bo sung khi co domain thuc.

## Han che kiem thu trinh duyet

Viec kiem thu tu dong trinh duyet (Playwright) da thuc hien:
- **Thanh cong:** Playwright accessibility snapshot kiem tra cau truc DOM va ARIA.
- **Gap van de:** Chup man hinh (screenshot) va xuat PDF tu dong bi dung hai lan. Khong co cau hinh Playwright nao duoc coi la on dinh cho CI.
- Do do, kiem thu trinh duyet hien tai duoc thuc hien thu cong hoac qua `vite preview`. Workflow CI chi bao gom typecheck, unit test va build.
