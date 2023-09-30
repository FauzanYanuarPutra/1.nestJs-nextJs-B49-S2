# Nama Proyek Anda

Deskripsi singkat tentang proyek Anda.

## Tentang Proyek

Tulis deskripsi lebih detail tentang proyek Anda di sini.

### Teknologi yang Digunakan

- [Nest.js](https://nestjs.com/) (Framework backend)
- [TypeORM](https://typeorm.io/) (ORM untuk database)
- [Next.js](https://nextjs.org/) (Framework frontend)
- [Cloudinary](https://cloudinary.com/) (Layanan penyimpanan dan pengelolaan gambar)
- [Tailwind CSS](https://tailwindcss.com/) (Framework CSS)
- PostgreSQL (Database)

## API Endpoints

### Paslon CRUD

#### Mendapatkan Semua Paslon

**Request:**

- Metode: GET
- Endpoint: `http://localhost:7000/paslons`

**Response:**

```json
[
    {
        "id": 1,
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003467/bpg0nzltjefik82qxdgg.png",
        "name": "name 1",
        "visi": "visi 1",
        "parties": [
            {
                "id": 1,
                "name": "partai 1"
            }
        ]
    },
    {
        "id": 2,
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696049999/hd68krdlnczvhwbdnpgm.png",
        "name": "name 2",
        "visi": "visi 2",
        "parties": [
            {
                "id": 2,
                "name": "partai 2"
            }
        ]
    },
    {
        "id": 3,
        "image": "http://res.cloudinary.com/da9j9y9oo/image/upload/v1696003685/srzzg41ru6mq5wj0imk0.png",
        "name": "name 3",
        "visi": "visi 3",
        "parties": []
    }
]

```

### Voters CRUD

...

### Parties CRUD

...

## Cara Menjalankan Proyek

Berikan instruksi tentang cara menjalankan proyek Anda di sini. Misalnya, instal dependensi, konfigurasi database, dan langkah-langkah lain yang diperlukan.

### Menjalankan Server Next.js (FrontEnd)

```bash
# Navigasikan ke direktori frontend
cd frontend-next

# Install dependensi dengan npm atau yarn
npm install
# atau
yarn

# Jalankan server dalam mode pengembangan
npm run dev
# atau
yarn dev

```

### Menjalankan Server Nest.js (Backend)

```bash
# Navigasikan ke direktori backend
cd backend-nest

# Install dependensi dengan npm atau yarn
npm install
# atau
yarn

# Jalankan server dalam mode pengembangan
npm run start:dev
# atau
yarn start:dev

```