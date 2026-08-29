# Huong dan trien khai len Hostinger

## Dieu kien tien quyet

- Tai khoan Hostinger (goi Single hoac Premium)
- Da cai dat Node.js 20+ va npm tren may tinh local
- Repository da clone va dependency da cai dat (`npm install`)

## Buoc 1: Build san pham

```bash
npm run build
```

Lenh nay se:
1. Kiem tra type TypeScript (`tsc --noEmit`)
2. Build ra thu muc `dist/` voi `index.html`, `assets/`, `favicon.svg`, `og-image.svg`, `og-image.png`

Kiem tra khong co loi truoc khi tiep tuc.

## Buoc 2: Dang nhap hPanel

1. Truy cap https://hpanel.hostinger.com
2. Dang nhap bang tai khoan Hostinger cua ban

## Buoc 3: Mo File Manager

1. Trong hPanel, chon **File Manager** tu menu chinh
2. Dieu huong den thu muc `public_html`

## Buoc 4: Xoa mac dinh an toan

1. **Truoc khi xoa:** Sao luu noi dung hien tai cua `public_html` neu co (download hoac rename)
2. Xoa tat ca file va thu muc trong `public_html` (file mac dinh cua Hostinger: `default.html`, `index.html` mac dinh, v.v.)
3. Dam bao `public_html` trong truoc khi upload

> **Luu y:** Chi xoa noi dung ben trong `public_html`, khong xoa thu muc `public_html` itself.

## Buoc 5: Upload noi dung dist

**Quan trong:** Upload **noi dung** cua thu muc `dist/`, khong phai thu muc `dist/` itself.

Cach thuc:
1. Mo thu muc `dist/` tren may tinh local
2. Chon tat ca file va thu muc ben trong (`index.html`, `assets/`, `favicon.svg`, `og-image.svg`, `og-image.png`)
3. Upload tat ca vao `public_html`

Ket qua:
```
public_html/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
  favicon.svg
  og-image.svg
  og-image.png
```

> **Sai lam thuong gap:** Upload ca thu muc `dist/` vao `public_html` se tao `public_html/dist/index.html` thay vi `public_html/index.html`. Site se khong hoat dong.

## Buoc 6: Kiem tra SSL, DNS, va cache

### SSL
1. Trong hPanel, di den **SSL** hoac **Security**
2. Dam bao SSL certificate da duoc cai dat (Hostinger cung cap SSL mien phi)
3. Kiem tra site truy cap duoc qua `https://`

### DNS (neu dung domain rieng)
1. Trong hPanel, di den **DNS Zone Editor**
2. Cap nhat A record chi den IP cua Hostinger (lay tu hPanel)
3. Cho DNS propagate (co the mat 24-48h)

### Cache
1. Xoa cache trinh duyet khi kiem tra
2. Neu dung Cloudflare hoac CDN, purge cache
3. Kiem tra site tai `https://yourdomain.com`

## Goi va gia ca Hostinger

**Nguon:** https://www.hostinger.com/vn/web-hosting (truy cap 2026-08-28)

| Goi | Gia khuyen mai | Tra truoc 48 thang | Gia han |
|---|---|---|---|
| Single | 19,900 VND/thang | 955,200 VND | 80,900 VND/thang |
| Premium | 41,900 VND/thang | 2,011,200 VND | 125,900 VND/thang |

> **Luu y:** Gia khuyen mai/prepaid, can xac nhan tai checkout. Quyen loi ten mien co the thay doi.

### Goi y lua chon

- **Single:** Phu hop cho mot trang tinh don nhu du an nay. Gia thap nhat, du tai nguyen cho static site.
- **Premium:** Can xem neu can ten mien rieng, email hosting, hoac nhieu site. Gia cao hon nhung bao gom them tinh nang.

## Rollback / Backup

1. **Truoc khi upload:** Luon giu ban sao `dist/` tren may tinh
2. **Backup hPanel:** Su dung tinh nang Backup trong hPanel de tao snapshot
3. **Rollback:** Neu co van de, upload lai noi dung `dist/` tu ban sao local

## Checklist trien khai (6 buoc)

- [ ] `npm run build` thanh cong, khong co loi
- [ ] Thu muc `dist/` chua `index.html`, `assets/`, `favicon.svg`, `og-image.svg`, `og-image.png`
- [ ] Dang nhap hPanel, mo File Manager, vao `public_html`
- [ ] Xoa file mac dinh, upload noi dung `dist/` (khong phai thu muc `dist/`)
- [ ] SSL hoat dong, site truy cap duoc qua `https://`
- [ ] Kiem tra trang: 11 section hien thi, calculator hoat dong, khong co loi console
