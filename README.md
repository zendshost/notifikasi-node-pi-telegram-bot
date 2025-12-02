# 📡 Pi Node Network Watcher – Telegram Notifier

### **Open-Source Monitoring Tool for Pi Network Node Status**

**Dibuat oleh:** *zendshost*
**Kontak Developer:** [Telegram @zendshost](https://t.me/zendshost)

---

## 📘 Ringkasan

**Pi Node Network Watcher** adalah proyek open-source yang dirancang untuk memonitor status node Pi Network melalui *Horizon Endpoint*.
Script ini akan mengirimkan **notifikasi Telegram otomatis** ketika node Anda **berpindah dari Pi Testnet menuju Pi Mainnet**.

Tujuan utama proyek ini adalah memberikan **monitoring real-time**, **akurat**, dan **mudah digunakan** untuk operator Pi Node.

---

# ✨ Fitur Utama

* 🔍 **Monitoring real-time** `network_passphrase` dari node Pi
* 🚨 **Telegram Alert** otomatis ketika node beralih ke mainnet
* ⚡ **Node.js lightweight script**, cocok untuk Raspberry Pi maupun VPS
* 🛠 **Konfigurasi mudah**, cukup edit 3 variabel
* 🔄 **Support background service** (PM2 / nohup / systemd)
* 📡 Tidak memerlukan API tambahan—langsung polling endpoint node
* 🧩 Kode bersih, modular, dan mudah dikembangkan

---

# 📥 Instalasi

## 1️⃣ Clone Repository

```bash
git clone https://github.com/zendshost/notifikasi-node-pi-telegram-bot.git
cd notifikasi-node-pi-telegram-bot
```

## 2️⃣ Install Dependencies

```bash
npm install
```

---

# ⚙️ Konfigurasi

Edit file: **`notifier.js`**

Anda akan menemukan 3 variabel utama:

```javascript
const NODE_URL = "http://195.88.211.69:31401/";
const BOT_TOKEN = "ISI_TOKEN_BOT_ANDA";
const CHAT_ID = "ISI_CHAT_ID_ANDA";
```

### 🔑 BOT_TOKEN

Didapatkan dari Telegram:

1. Buka Telegram
2. Cari **@BotFather**
3. Jalankan `/newbot`
4. Simpan token yang diberikan

### 🆔 CHAT_ID

Dapatkan dengan membuka:

```
https://api.telegram.org/bot<token>/getUpdates
```

Kirim pesan ke bot Anda → lihat `chat.id` pada respon JSON.

---

# ▶️ Cara Menjalankan

## Menjalankan secara biasa:

```bash
node notifier.js
```

Setelah itu terminal akan menampilkan status node:

```
Monitoring Pi Node...
Status sekarang: Pi Testnet
```

Ketika node Anda berubah menuju mainnet:

```
🚀 Notifikasi terkirim!
```

Bot Telegram Anda akan menerima pesan:

> 🚀 Node PI Anda sudah pindah ke: **Pi Network**
> ✔️ Node Anda sekarang berjalan di Mainnet

---

# 🔄 Menjalankan 24/7 (Background Service)

## Opsi A – PM2 (Direkomendasikan)

```bash
npm install -g pm2
pm2 start notifier.js --name "pi-node-watcher"
pm2 save
pm2 startup
```

### Cek log:

```bash
pm2 logs pi-node-watcher
```

---

## Opsi B – nohup (Simple)

```bash
nohup node notifier.js &
```

---

## Opsi C – systemd (Untuk server production)

Buat service:

```
sudo nano /etc/systemd/system/pi-node-watcher.service
```

Isi:

```
[Unit]
Description=Pi Node Network Watcher - Telegram Bot
After=network.target

[Service]
ExecStart=/usr/bin/node /path/to/notifikasi-node-pi-telegram-bot/notifier.js
Restart=always
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Aktifkan:

```bash
sudo systemctl daemon-reload
sudo systemctl enable pi-node-watcher
sudo systemctl start pi-node-watcher
```

---

# 🧠 Cara Kerja Script (Teknis)

Script bekerja dalam 3 tahap:

---

## **1. Polling Endpoint Node**

Script melakukan HTTP GET ke:

```
/ (Horizon Root Endpoint)
```

Lalu membaca field:

```json
"network_passphrase": "Pi Testnet"
```

---

## **2. Membandingkan Status Lama vs Baru**

Variabel:

```javascript
let lastStatus = null;
```

Setiap interval (30 detik):

* Jika status pertama → disimpan
* Jika berubah dari `"Pi Testnet"` → status apapun **selain** testnet → trigger notifikasi

---

## **3. Mengirim Telegram Alert**

Dikirim via API:

```
https://api.telegram.org/bot<token>/sendMessage
```

Body:

```javascript
{
 "chat_id": CHAT_ID,
 "text": "🚀 Node PI Anda sudah pindah ke: Pi Network"
}
```

---

# 📂 Struktur Project

```
notifikasi-node-pi-telegram-bot/
│
├── notifier.js        # script utama monitoring Pi node
├── package.json       # dependency & metadata
└── README.md          # dokumentasi (file ini)
```

---

# 🧩 Pengembangan & Kontribusi

Kontribusi sangat diterima!

Anda dapat menambahkan fitur seperti:

* Endpoint uptime monitoring
* Notifikasi ledger stop
* Dashboard web (Express.js)
* Integrasi Discord webhook
* Docker container

Silakan buat **issue** atau **pull request** di GitHub.

---

# 🧑‍💻 Developer

**zendshost**
📞 Telegram: [https://t.me/zendshost](https://t.me/zendshost)

Jika ingin custom project, integrasi bot lain, atau otomatisasi server → langsung hubungi via Telegram.

---

# 📜 Lisensi

Proyek ini dirilis di bawah lisensi **MIT**.
Anda bebas menggunakannya untuk personal maupun commercial use.

---

# ⭐ Dukungan

Jika tool ini bermanfaat, jangan lupa beri ⭐ pada repository GitHub!
Kontribusi kecil Anda membantu project ini tetap hidup.
