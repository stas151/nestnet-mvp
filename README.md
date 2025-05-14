# 🧠 NestNet MVP

**NestNet** — это Web3-платформа нового поколения, построенная как "матрёшка" из:
- DAG-графов
- NFT-контейнеров
- Substrate-ноды (PoNFT)

---

## 📦 Архитектура

```text
┌────────────────────┐
│     Frontend       │ ◄──── React + Tailwind + DAG Graph UI
└────────────────────┘
           │ REST / WebSocket
┌────────────────────┐
│     FastAPI API     │ ◄──── /auth, /dag, /containers, /ipfs, /substrate
└────────────────────┘
           │            │
           ▼            ▼
┌────────────────────┐ ┌────────────────────┐
│    PostgreSQL DB    │ │    IPFS Node        │
└────────────────────┘ └────────────────────┘
           │
           ▼
┌────────────────────┐
│    DAG Node (PoA)   │ ◄──── управление локальной DAG-структурой
└────────────────────┘
           │
           ▼
┌────────────────────┐
│ Substrate Node (PoNFT) │ ◄──── pallet-nft-containers
└────────────────────┘
```

---

## 🚀 Запуск локально

```bash
# 1. Клонируй проект
https://github.com/stas151/nestnet-mvp.git
cd nestnet-mvp

# 2. Подготовка
cp .env.example .env
chmod +x start.sh

# 3. Запуск
./start.sh
```

---

## 📌 Компоненты

| Компонент       | Стек                        |
|-----------------|-----------------------------|
| Frontend        | React, TailwindCSS          |
| API             | FastAPI, SQLAlchemy         |
| Хранилище       | PostgreSQL, IPFS            |
| DAG Engine      | PoA + SQLite (in-memory)    |
| Blockchain      | Substrate + pallet-nft      |

---

## ✨ Автор
@stas151 — GitHub.com/stas151


Фронт: http://localhost:3000
API: http://localhost:8000/docs
